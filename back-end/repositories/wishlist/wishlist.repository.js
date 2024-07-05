const User = require('../../models/user/user.model');
const jwt = require('jsonwebtoken');
const Wishlist = require('../../models/wishlist/wishlist.model') 
class WishListRepository {

    constructor() {}

    async addToWishList(token, data) {
        const { productId } = data;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const wishList = new Wishlist({
            userId,
            productId
        })
        await wishList.save()
        return wishList
    }

    async getWishList(token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const wishList = await Wishlist.find({ userId });
        return wishList
    }

    async deleteFromWishList(token, data) {
        const { productId } = data;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const wishList = await Wishlist.findOne({ userId, productId });
        if (wishList.userId.toString() !== userId) {
            throw new Error('you are not autherized to delete this ')
        }
        await wishList.delete();
        return wishList
    }

}

module.exports = WishListRepository