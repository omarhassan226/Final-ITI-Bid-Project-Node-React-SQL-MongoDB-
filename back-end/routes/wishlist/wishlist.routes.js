const express = require("express");
const router = express.Router();

const WishListRouter = (wishListController) => {
    router.post('/add-to-wishlist', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const wishList = await wishListController.addToWishList(token, req.body);
            res.status(200).json(wishList);
        } catch (err) {
            res.status(401).json({ message: 'Failed to add to wishlist', error: err.message });
        }
    }); 
    
    router.get('/wishlist', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const wishList = await wishListController.getWishList(token);
            res.status(200).json(wishList);
        } catch (err) {
            res.status(401).json(wishList)
        }
    })

    router.delete('/wishlist', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const wishList = await wishListController.deleteFromWishList(token, req.body);
            res.status(200).json(wishList);
        } catch (err) {
            res.status(401).json(wishList)
        }
    })

    return router;
};

module.exports = WishListRouter;
