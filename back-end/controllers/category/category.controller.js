const Category = require('../../models/category/category.model');

class CategoryController{
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async addCategory(body,files){
        try {
            (files);
            const category = await this.categoryRepository.addCategory(body,files);
            // const category = await this.categoryRepository.getCategoryByNameAndAddImage(body.title,files)
            return {msg:"category added successfully",category}
        } catch (err) {
            console.error(err);
            return { message: 'Failed to add category', error: err.message };
        }
    }

    async editCategory(body,files){
        try {
            const result = await this.categoryRepository.editCategory(body,files);
            // const category = await this.categoryRepository.getCategoryByNameAndAddImage(body.title,files)
            return {msg:"category added successfully",result}
        } catch (err) {
            console.error(err);
            return { message: 'Failed to add category', error: err.message };
        }
    }



    async getCategories() {
        try {
            const categories = await this.categoryRepository.getCategories();
            return { message: 'categories retrieved successfully', categories };
        } catch (err) {
            console.error(err);
            return { message: "failed to fetch category data", err: err.message };
        }
    }

    async deleteCategory(id) {
        try {
            const deletedCategory = await this.categoryRepository.deleteCategory(id);
            return { message: 'category deleted successfully', category: deletedCategory };
        } catch (err) {
            console.error(err);
            return{ msg: 'failed to delete product', err: err.message };
        }
    }
}


module.exports = CategoryController;