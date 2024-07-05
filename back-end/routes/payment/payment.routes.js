const express = require("express");
const router = express.Router();


const payementRouter = (payementController) => {

    router.post('/payment', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const payment = await payementController.payment(token, { ...req.body, req,res } , req.body);
            res.status(201).json(payment);
        } catch (err) {
            res.status(400).json({ msg: 'failed to get payment', error: err.message });
        }
    });

    
    return router;
    
}


module.exports = payementRouter;
