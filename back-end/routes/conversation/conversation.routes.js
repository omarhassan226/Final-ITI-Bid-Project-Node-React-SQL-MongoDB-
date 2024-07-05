const express = require("express");
// const ConversationController = require("../../controllers/conversation/conversation.controller");
const router = express.Router();

const ConversationRouter = (ConversationController) => {
    
    router.post('/conversation', async (req, res, next) => {
        try {
            // const token = req.headers['jwt'];
            const { sender,receiver } = req.body;
            const result = await ConversationController.getConversationsForUser(req,res)
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: 'Failed to get conversation', error: err.message });
        }
    });

    return router;
};

module.exports = ConversationRouter;
