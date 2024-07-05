const express = require("express");
const router = express.Router();
const upload = require("../../utils/multer");

const userRouter = (userController) => {
  router.delete("/delete-user", async (req, res, next) => {
    try {
      const token = req.headers["jwt"];
      const deletedUser = await userController.deleteUser(token);
      res.status(200).json(deletedUser);
    } catch (err) {
      res.status(400).json(deletedUser);
    }
  });

  router.put("/edit-user", async (req, res, next) => {
    try {
      const token = req.headers["jwt"];
      const editedUser = await userController.editUser(req.body, token);
      res.status(200).json(editedUser);
    } catch (err) {
      res.status(400).json(editedUser);
    }
  });

  router.put("/edit-user-image", async (req, res, next) => {
    try {
      const token = req.headers["jwt"];

      // Wait for the file upload to complete
      await upload.uploadImage(req, res);

      // Proceed to postSignup
      const updatedUser = await userController.updateUserImage(
        req.files,
        token
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(updatedUser);
    }
  });

  router.get("/get-user", async (req, res, next) => {
    try {
      const token = req.headers["jwt"];

      const User = await userController.getUser(token);
      res.status(200).json(User);
    } catch (err) {
      res.status(500).json(User);
    }
  });

  router.post("add-socketId", async (req, res, next) => {
    try {
      const token = req.headers["jwt"];
    } catch (err) {
      res.status(500).json({ message: "Failed to add socketId" });
    }
  });

  router.post("/add-favorite", async (req, res, next) => {
    try {
      const token = req.headers["jwt"];
      const { productId } = req.body;
      const result = await userController.addFavorite(token, productId);
      res.status(200).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to add favorite", error: err.message });
    }
  });

  router.delete("/remove-favorite", async (req, res, next) => {
    try {
      const token = req.headers["jwt"];
      const { productId } = req.body;
      const result = await userController.removeFavorite(token, productId);
      res.status(200).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to remove favorite", error: err.message });
    }
  });

  router.get("/favorites", async (req, res, next) => {
    try {
      const token = req.headers["jwt"];
      const result = await userController.getFavorites(token);
      res.status(200).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to get favorites", error: err.message });
    }
  });

  router.get("/get-notification", async (req, res, next) => {
    try {
      const token = req.headers["jwt"];
      const result = await userController.getNotification(token);
      res.status(200).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to get notification", error: err.message });
    }
  });

  router.delete("/delete-notification", async (req, res, next) => {
    try {
      const token = req.headers["jwt"];
      const { notificationIndex } = req.body;
      const result = await userController.deleteNotification(
        token,
        notificationIndex
      );
      res.status(200).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to delete notification", error: err.message });
    }
  });

  router.delete("/clear-notifications", async (req, res, next) => {
    try {
      const token = req.headers["jwt"];
      const result = await userController.clearNotifications(token);
      res.status(200).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to clear notifications", error: err.message });
    }
  });


  router.post('/footer-newsteller',async(req,res,next)=>{
    try{
      const result = await userController.footerNewsTeller(req.body);
      res.status(200).json(result)
    }catch(err){
      res.status(401)
      .json({messsage:"failed to send message",error:err.message})
    }
  })

  return router;
};

module.exports = userRouter;
