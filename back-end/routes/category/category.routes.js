const express = require("express");
const router = express.Router();
const upload = require('../../utils/multer');


const categoryRouter = (categoryController) => {

    router.post('/add-category', async (req, res, next) => {
        try {
            (req.files);
            await upload.uploadImage(req, res);
            const category = await categoryController.addCategory(req.body, req.files);
            res.status(200).json(category)
        } catch (err) {
            res.status(400).json(category);
        };
        
    });



    router.post('/edit-category', async (req, res, next) => {
        try {
            await upload.uploadImage(req, res);
            const category = await categoryController.editCategory(req.body, req.files);
            if(category){

                res.status(200).json(category)
            }
        } catch (err) {
            res.status(400).json(err);
        };
        
    });


    router.get('/categories',async (req, res, next) => {
        try {
            const categories = await categoryController.getCategories();
            res.status(200).json(categories);
        } catch (err) {
            res.status(400).json({err:err.message,categories});
        }
    })

    router.delete('/delete-category/:id',async (req, res, next) => {
        try {
            const category = await categoryController.deleteCategory(req.params.id);
            res.status(200).json(category);
        } catch (err) {
            res.status(400).json({err:err.message,categories});
        }
    })
    
    return router;
    
}


module.exports = categoryRouter;