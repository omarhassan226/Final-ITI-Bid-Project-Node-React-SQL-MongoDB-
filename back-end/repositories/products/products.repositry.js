const Product = require('../../models/products/product.model');
const Category = require('../../models/category/category.model');
const SubCategory = require('../../models/subCategory/subCategory.model');
const User = require('../../models/user/user.model');
const ProductStatus = require('../../models/productStatus/productStatus.model');
const jwt = require("jsonwebtoken");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require('../../config/firebase/firebase.config');
const fs = require('fs');
const stream = require('stream');



class ProductRepositry{
    constructor() { }

    async addProduct(productData, token, files) {
        try {
            const { title, categoryId, quantity, location, price, productStatus,productDetails } = productData;
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            const email = decodedToken.email;
            const user = await User.findOne({ email });
            const userId = user._id;
            const folderName = title + new Date().toISOString().split('T')[0];
            const status = await ProductStatus.findOne({ status: productStatus });
            const statusId = status._id;
            const product = new Product({
                title,
                imagesUrl: { images: [] },
                userId,
                categoryId,
                quantity,
                location,
                price,
                folderName,
                status: statusId,
                productDetails
            });

            // Upload images using buffer directly
            const uploadPromises = files.map(async (file) => {
                const storageRef = ref(storage, `images/${folderName}/${Date.now()}-${file.originalname}`);
                const metadata = { contentType: file.mimetype };

                // Upload the file buffer directly to Firebase Storage
                const snapshot = await uploadBytes(storageRef, file.buffer, metadata);

                // Get the download URL and push it to the images array
                const imageUrl = await getDownloadURL(snapshot.ref);
                product.imagesUrl.images.push(imageUrl);
            });

            await Promise.all(uploadPromises);
            await product.save();

            return product; // Return the created product

        } catch (err) {
            throw err;
        }
    }



    async getProducts() {
        try {
            const products = await Product.find().populate('status userId categoryId subCategoryId').exec();
            return products;
        } catch (err) {
            throw new Error(err.message) ;
        }
    }


    async getProductById(id) {
        try {
            const product = await Product.findById(id).populate('status userId categoryId subCategoryId').exec();
            return product;
        } catch (err) {
            throw new Error(err.message);
        }
    }
    


    async editProduct(id , productData , token) {
        try {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.userId;
            const userEmail = decodedToken.email;
            (userEmail.toString());
            const { updatedTitle, updatedQuantity, updatedPrice } = productData;
            const product = await Product.findById(id);
            // if (userEmail.toString() !== 'alimagdi12367@gmail.com' && product.userId.toString() !== userId.toString()) {
            //     throw new Error('You are not authorized to edit this product');
            // }

            product.title = updatedTitle;
            product.quantity = updatedQuantity;
            product.price = updatedPrice;
            await product.save();
            return product;
        } catch (err) {
            throw new Error(err.message);
        }
    }


    async deleteProduct(id,token) {
        try {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.userId;
            const userEmail = decodedToken.email;
            const product = await Product.findById(id);
            // if (userEmail.toString() !== 'alimagdi12367@gmail.com' && product.userId.toString() !== userId.toString()) {
            //     throw new Error('You are not authorized to edit this product');
            // }
            const deletedProduct = await Product.findByIdAndDelete(id);
            return deletedProduct
        } catch (err) {
            throw new Error(err.message);
        }
    }

}


module.exports = ProductRepositry;
