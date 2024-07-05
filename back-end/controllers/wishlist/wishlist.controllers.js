class WishListController {
    constructor(wishListRepository) {
        this.wishListRepository = wishListRepository;
    }

    async addToWishList(token, body) {
        try {
            const wishList = await this.wishListRepository.addToWishList(token, body);
            return { message: 'Added successfully to wishlist', wishList };
        } catch (err) {
            console.error(err);
            return { error: 'Failed to add to wishlist', error:err.message };
        }
    }


    async getWishList(token) {
        try {
            const wishList = await this.wishListRepository.getWishList(token);
            return { message: 'wishlist fetched successfully', wishList };
        } catch (err) {
            console.error(err);
            return { error: 'Failed to fetch wishlist', error: err.message };
        }
    }

    async deleteFromWishList(token, body) {
        try {
            const wishList = await this.wishListRepository.deleteFromWishList(token, body);
            return { message: 'Deleted successfully from wishlist', wishList };
        } catch (err) {
            console.error(err);
            return { error: 'Failed to delete from wishlist', error: err.message };
        }
    }
}

module.exports = WishListController;
