const express = require("express");
const router = express.Router();

const MessagesRouter = (MessageController) => {
  router.post("/messages", async (req, res, next) => {
    try {
      const result = await MessageController.createMessage(req, res);    
      } catch (err) {
      res.status(400).json({ err: err.message });
      } 
  });

  router.post("/usersMessages", async (req, res, next) => {
    try {
      const result = await MessageController.getMessagesForUser(req, res);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  });

  router.delete("/messages/:messageId", async (req, res, next) => {
    try {
      const result = await MessageController.deleteMessage(req, res);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  });

  return router;
};

module.exports = MessagesRouter;
