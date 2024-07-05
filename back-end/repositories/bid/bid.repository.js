const jwt = require("jsonwebtoken");
const Auction = require("../../models/auction/auction.model");
const Bid = require("../../models/bid/bid.model");
const User = require("../../models/user/user.model");
class BidRepository {
  constructor(io) {
    this.io = io;
  }

  async getAllBids() {
    return Auction.find();
  }

  async addBid(data, token) {
    const { amount, auctionId } = data;
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const auction = await Auction.findById(auctionId).populate("bidsId").exec();

    if (!auction) {
      return { msg: "no auction available" };
    }

    if (auction.bidsId.length === 0) {
      if (amount <= auction.initialValue) {
        return { msg: "Bid amount must be higher than the initial value" };
      }
    } else {
      for (const bid of auction.bidsId) {
        if (amount <= bid.amount) {
          return {
            msg: "Bid amount must be higher than the current highest bid",
          };
        }
      }
    }

    const newBid = new Bid({
      biderId: userId,
      amount,
      auctionId: auction._id,
    });

    await newBid.save();
    await auction.addBidId(newBid._id);

    const bids = await Bid.find({ auctionId }).select("biderId");
    const userIds = [...new Set(bids.map((bid) => bid.biderId.toString()))];

    for (const id of userIds) {
      const user = await User.findById(id);
      if (user) {
        await user.addNotification(
          `A new bid has been placed on an auction you are bidding on. and the amount is ${amount} and the bid id is ${newBid._id} and the auction id is ${auctionId}`
        );
      }
    }

    this.io.emit("newBid", { amount });
    this.io.emit("notification", {
      notification: `A new bid has been placed on an auction you are bidding on. and the amount is ${amount} and the bid id is ${newBid._id} and the auction id is ${auctionId}`,
    });
    return newBid;
  }

  async getBid(data) {
    data;
    const auctionId = data.auctionId;
    if (!auctionId) {
      throw new Error("You must enter a auction Id");
    }

    const auction = await Auction.findById(auctionId)
      .populate("bidsId productId")
      .exec();
    if (!auction) {
      throw new Error(
        `There is no auction available with this product id ${productId}`
      );
    }

    const bids = auction.bidsId;

    if (!bids || bids.length === 0) {
      return [];
    }

    const highestBid = bids.reduce((maxBid, currentBid) => {
      return currentBid.amount > maxBid.amount ? currentBid : maxBid;
    }, bids[0]);

    return highestBid;
  }
}

module.exports = BidRepository;
