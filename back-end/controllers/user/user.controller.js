const { getPublicIpMiddleware } = require("../../middlewares/location");
const geoip = require("geoip-lite");
const Email = require("../../utils/email");
const User = require("../../models/user/user.model");
const jwt = require("jsonwebtoken");
const fs = require("fs");

class UserController {
  constructor(userRepositry) {
    this.userRepositry = userRepositry;
  }

  async editUser(body, token) {
    try {
      const result = await this.userRepositry.editUser(body, token);
      return { message: "user edited successfully", result };
    } catch (error) {
      error;
      return { msg: "failed to edit user", error: error.message };
    }
  }

  async deleteUser(token) {
    try {
      const result = await this.userRepositry.deleteUser(token);
      return { message: "user deleted successfully", result };
    } catch (err) {
      err;
      return { msg: err.message };
    }
  }

  async getUser(token) {
    try {
      // (token);
      const result = await this.userRepositry.getUser(token);
      return { message: "user fetched successfully", result };
    } catch (err) {
      console.error(err);
      return { msg: "Error fetching user", error: err.message };
    }
  }

  async updateUserImage(files, token) {
    try {
      const result = await this.userRepositry.updateUserImage(token, files);
      return { message: "user image updated successfully", result };
    } catch (err) {
      console.error(err);
      return { msg: "Error updating image", error: err.message };
    }
  }

  async handleSocketConnection(userId, socketId) {
    try {
      const user = await this.userRepositry.updateSocketId(userId, socketId);
      return user;
    } catch (err) {
      err;
      throw new Error(err);
    }
  }

  async handleSocketDisconnection(socketId) {
    try {
      const user = await this.userRepositry.removeSocketId(socketId);
      return user;
    } catch (err) {
      err;
      throw new Error(err);
    }
  }

  async addFavorite(token, productId) {
    try {
      const result = await this.userRepositry.addFavorite(token, productId);
      return { message: "Favorite added successfully", result };
    } catch (error) {
      error;
      return { msg: "Failed to add favorite", error: error.message };
    }
  }

  async removeFavorite(token, productId) {
    try {
      const result = await this.userRepositry.removeFavorite(token, productId);
      return { message: "Favorite removed successfully", result };
    } catch (error) {
      error;
      return { msg: "Failed to remove favorite", error: error.message };
    }
  }

  async getFavorites(token) {
    try {
      const result = await this.userRepositry.getFavorites(token);
      return { message: "Favorites fetched successfully", result };
    } catch (error) {
      error;
      return { msg: "Failed to fetch favorites", error: error.message };
    }
  }

  async getNotification(token) {
    try {
      const result = await this.userRepositry.getNotification(token);
      return { message: "Notifications fetched successfully", result };
    } catch (error) {
      error;
      return { msg: "Failed to fetch notifications", error: error.message };
    }
  }

  async deleteNotification(token, body) {
    try {
      const result = await this.userRepositry.deleteNotification(token, body);
      return { message: "Notifications deleted successfully", result };
    } catch (error) {
      error;
      return { msg: "Failed to delete notifications", error: error.message };
    }
  }

  async clearNotifications(token) {
    try {
      const result = await this.userRepositry.clearNotifications(token);
      return { message: "Notifications cleared successfully", result };
    } catch (error) {
      error;
      return { msg: "Failed to clear notifications", error: error.message };
    }
  }

  async footerNewsTeller(body){
    try{
      const result = await this.userRepositry.footerNewsTeller(body);
      return { message: "message sent successfully", result };

    }catch(err){
      return {msg: "Failed to send notification", error: err.message}
    }
  }
}

module.exports = UserController;
