const express = require("express");
const router = express.Router();
const userController = require('../../controllers/user/user.controller'); // Make sure to import your userController

const favoriteRouter = () => {
    
    router.post('/add-favorite', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const { productId } = req.body;
            const result = await userController.addFavorite(token, productId);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: 'Failed to add favorite', error: err.message });
        }
    });

    router.delete('/remove-favorite', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const { productId } = req.body;
            const result = await userController.removeFavorite(token, productId);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: 'Failed to remove favorite', error: err.message });
        }
    });

    router.get('/favorites', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const result = await userController.getFavorites(token);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: 'Failed to get favorites', error: err.message });
        }
    });

    return router;
};

module.exports = favoriteRouter;
