const express = require("express");
const router = express.Router();



const addressRouter = (addressController) => {

    router.post('/add-address', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const address = await addressController.addAddress(req.body, token); 
            res.status(200).json(address);
        } catch (error) {
            console.error(error)
            res.status(401).json(error.message)
        }
    })

    router.get('/addresses', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const addresses = await addressController.getAddresses(token);
            res.status(200).json(addresses);
        } catch (error) {
            console.error(error)
            res.status(401).json(error.message)
        }
    })

    router.delete('/delete-address/:id', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const addressId = req.params.id; // Use req.params.id instead of req.query.addressId
            const result = await addressController.deleteAddress(addressId, token);
            res.status(200).json({ message: 'Address deleted successfully', address: result.address });
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: error.message });
        }
    });

    router.post('/edit-address/:id', async (req, res, next) => {
        try {
            const token = req.headers['jwt'];
            const addressId = req.params.id;
            const updatedAddress = await addressController.editAddress(addressId, req.body, token);
            res.status(200).json(updatedAddress);
        } catch (error) {
            console.error(error);
            res.status(401).json(error.message);
        }
    });



    return router;
}

module.exports = addressRouter;
