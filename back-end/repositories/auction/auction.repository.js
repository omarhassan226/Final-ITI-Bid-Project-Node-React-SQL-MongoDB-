const Auction = require('../../models/auction/auction.model');
const ProductStatus = require('../../models/productStatus/productStatus.model');
const jwt = require("jsonwebtoken");
const User = require('../../models/user/user.model');

const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require('../../config/firebase/firebase.config');
const fs = require('fs');
const stream = require('stream');
class AuctionRepository {
    constructor(io) {
        this.io = io
    }

    async addAuction(data,files, token) {
        const { expirationDays , initialValue , title , categoryId, quantity, location , productStatus} = data;
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const expirationDate = new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000);
        const folderName = title + new Date().toISOString().split('T')[0];
        const getStatus = await ProductStatus.findOne({ status: productStatus });
        const statusId = getStatus._id;
        (data);
        const auction = new Auction({ 
            expirationDate, 
            userId,
            title,
            initialValue,
            folderName,
            categoryId,
            quantity,
            location,
            status:statusId
        });
      
           // Upload images using buffer directly
           const uploadPromises = files.map(async (file) => {
            const storageRef = ref(storage, `images/${folderName}/${Date.now()}-${file.originalname}`);
            const metadata = { contentType: file.mimetype };

            // Upload the file buffer directly to Firebase Storage
            const snapshot = await uploadBytes(storageRef, file.buffer, metadata);

            // Get the download URL and push it to the images array
            const imageUrl = await getDownloadURL(snapshot.ref);
            auction.imagesUrl.images.push(imageUrl);
           })
           await Promise.all(uploadPromises);
        await auction.save();
        return auction;
    }


    async getAuctions() {
        const auctions = await Auction.find().populate('userId', 'username').populate('categoryId').exec();
        if (!auctions) throw new Error('no auctions found');
        return auctions;
    }

    async deleteAuction(data, token) {
        const { auctionId } = data;
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const registeredUserId = decodedToken.userId;
        const auction = await Auction.findById(auctionId);
        if (!auction) throw new Error("Auction not found");
        if (auction.userId.toString() !== registeredUserId.toString()) throw new Error("You are not the owner of this auction");
        await auction.remove();
        return auction;
    }

    async getAuctionById(data, token) {
        const id = data.id;
        const auction = await Auction.findById(id).populate('productId bidsId categoryId').exec();
        (auction);
        if (!auction) throw new Error("Auction not found");
        return auction;
    }

    async  getHighestBid(data, token) {
        const id = data.id;
        const auction = await Auction.findById(id).populate('bidsId categoryId').exec();
    
        if (!auction) throw new Error("Auction not found");
        if (!auction.bidsId || auction.bidsId.length === 0) throw new Error("No bids found for this auction");
    
        // Populate bidderId for each bid in the bidsId array
        for (let i = 0; i < auction.bidsId.length; i++) {
            await auction.bidsId[i].populate('biderId').execPopulate();
        }
    
        // Find the highest bid
        const highestBid = auction.bidsId.reduce((max, current) => {
            return current.amount > max.amount ? current : max;
        }, auction.bidsId[0]);
    
        return highestBid;
    }

    async auctionWinner(data, token) {
        const auctionId = data.auctionId;
        const auction = await Auction.findById(auctionId).populate('bidsId categoryId').exec();
        (auction);
        if (!auction) return "Auction not found";
        if (!auction.bidsId || auction.bidsId.length === 0) return "No bids found for this auction";
    
        const highestBid = auction.bidsId.reduce((max, bid) => {
            return bid.amount > max.amount ? { amount: bid.amount, biderIds: [bid.biderId] } :
                   bid.amount === max.amount ? { amount: max.amount, biderIds: [...max.biderIds, bid.biderId] } :
                   max;
        }, { amount: 0, biderIds: [] });
    
        // Notify the auction winner
        const auctionWinner = await User.findById(highestBid.biderIds[0].toString());
        if (auctionWinner) {
            await auctionWinner.addNotification(`You win the auction with the following amount: ${highestBid.amount}`);
        }
    
        const bidders = auction.bidsId.map(bid => bid.biderId.toString());
        const uniqueBidders = [...new Set(bidders)]; 
    
        for (const biderId of uniqueBidders) {
            const bidder = await User.findById(biderId);
            if (bidder) {
                await bidder.addNotification(`The auction has ended and someone won with the amount: ${highestBid.amount}`);
            }
        }
        await auction.remove();
    
        this.io.emit('notification', `The auction has ended and someone won with the amount: ${highestBid.amount}`);
        this.io.emit('auctionWinner', highestBid);
    
        return { highestBid, auctionWinner };
    }
    
    
    



}

module.exports = AuctionRepository;
