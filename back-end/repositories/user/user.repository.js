const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Email = require("../../utils/email");
const User = require("../../models/user/user.model");
const UserRole = require("../../models/userRole/userRole.model");
const fs = require("fs");
const Product = require("../../models/products/product.model");
const { storage } = require("../../config/firebase/firebase.config");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

class UserRepositry {
  constructor(io) {
    this.io = io;
  }

  async getUser(token) {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const email = decodedToken.email;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found.");
    }
    return user;
  }

  async editUser(userData, token) {
    userData;
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // No need for await here
      const email = decodedToken.email;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found.");
      }

      let updated = false;

      if (userData.firstName && userData.firstName !== user.firstName) {
        user.firstName = userData.firstName;
        updated = true;
      }
      if (userData.lastName && userData.lastName !== user.lastName) {
        user.lastName = userData.lastName;
        updated = true;
      }
      if (userData.birthDay && userData.birthDay !== user.birthDay) {
        user.birthDay = userData.birthDay;
        updated = true;
      }
      if (userData.phoneNumber && userData.phoneNumber !== user.phoneNumber) {
        user.phoneNumber = userData.phoneNumber;
        updated = true;
      }

      if (updated) {
        await user.save();
      }

      return user;
    } catch (err) {
      err;
      throw new Error(
        err.message || "An error occurred while updating the user."
      );
    }
  }

  async deleteUser(token) {
    try {
      const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
      const email = decodedToken.email;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found.");
      }

      await user.remove();

      return user;
    } catch (err) {
      err;
      throw new Error(err);
    }
  }

  async updateUserImage(token, files) {
    files;
    try {
      const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
      const email = decodedToken.email;

      const user = await User.findOne({ email });
      const folderName =
        user.firstName + new Date().toISOString().split("T")[0];
      if (!user) {
        throw new Error("User not found.");
      }

      if (files && files.length > 0) {
        const file = files[0];
        file;
        // If the user has an existing image, delete it
        if (
          user.imageUrl &&
          user.imageUrl.images &&
          user.imageUrl.images.length > 0
        ) {
          const existingImage = user.imageUrl.images[0];
          const imagePath = `./uploads/${existingImage}`;
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }

        // Save the new image in the user's folder
        const uploadPromises = files.map(async (file) => {
          const storageRef = ref(
            storage,
            `images/${folderName}/${Date.now()}-${file.originalname}`
          );
          const metadata = { contentType: file.mimetype };

          // Upload the file buffer directly to Firebase Storage
          const snapshot = await uploadBytes(storageRef, file.buffer, metadata);

          // Get the download URL and push it to the images array
          const imageUrl = await getDownloadURL(snapshot.ref);
          user.imageUrl.images = [];
          user?.imageUrl?.images?.push(imageUrl);
        });

        await Promise.all(uploadPromises);
        await user.save();
        return { success: true, user };
      } else {
        return { success: false, message: "No image provided" };
      }
    } catch (err) {
      err;
      throw new Error(err);
    }
  }

  async updateSocketId(userId, socketId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found.");
      }
      user.userSocketId = socketId;
      await user.save();
      ("socketid saved successfully");
      this.io.emit("newUser", { user });
      return user;
    } catch (err) {
      err;
      throw new Error(err);
    }
  }

  async removeSocketId(socketId) {
    try {
      const user = await User.findOne({ userSocketId: socketId });
      if (!user) {
        throw new Error("User not found.");
      }
      user.userSocketId = null;
      await user.save();
      return user;
    } catch (err) {
      err;
      throw new Error(err);
    }
  }

  async addFavorite(token, productId) {
    // const user = await User.findByToken(token);
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const email = decodedToken.email;
    const user = await User.findOne({ email });
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      throw new Error("no product");
    }
    if (!user) throw new Error("User not found");

    if (!user.favorites.includes(productId)) {
      user.favorites.push(productId);
      await user.save();
    }
    return user.favorites;
  }

  async removeFavorite(token, productId) {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const email = decodedToken.email;
    const user = await User.findOne({ email });
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      throw new Error("No product");
    }
    if (!user) {
      throw new Error("User not found");
    }

    "Original Favorites:", user.favorites;
    "Product ID to remove:", productId;

    // Convert productId to a string to ensure correct comparison
    const productIdString = productId.toString();

    // Ensure all IDs in the favorites array are strings for comparison
    const updatedFavorites = user.favorites.filter(
      (id) => id?.toString() !== productIdString
    );

    "Updated Favorites:", updatedFavorites;

    user.favorites = updatedFavorites; // Update user's favorites with the filtered array
    await user.save();
    return user.favorites;
  }

  async getFavorites(token) {
    // const user = await User.findByToken(token);
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const email = decodedToken.email;
    const user = await User.findOne({ email }).populate("favorites");
    if (!user) throw new Error("User not found");
    return user.favorites;
  }

  async getNotification(token) {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const email = decodedToken.email;
    const user = await User.findOne({ email });
    if (!user) return "User not found";
    const notification = user.notification.items;
    return notification;
  }

  async deleteNotification(token, index) {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const email = decodedToken.email;
    const user = await User.findOne({ email });
    if (!user) return "User not found";
    const notification = user.notification.items;
    notification.splice(index, 1);
    user.notification.items = notification;
    await user.save();
    return notification;
  }

  async clearNotifications(token) {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const email = decodedToken.email;
    const user = await User.findOne({ email });
    if (!user) return "User not found";
    user.notification.items = [];
    await user.save();
    return user.notification.items;
  }

  async footerNewsTeller(data){
    const email = data.email;
    await Email.sendMail({
      to: email,
      from: 'shop@node-complete.com',
      subject: 'Signup succeeded!',
      html: '<h1>subscribed successfully</h1>'
    });
    return email;
    
  }
}

module.exports = UserRepositry;
