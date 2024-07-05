const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [
            true,
            'User ID is required'
        ]
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [
            true,
            'Product ID is required'
        ]
    }
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
