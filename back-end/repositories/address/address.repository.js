const Address = require('../../models/address/address.model');
const jwt = require('jsonwebtoken');

class AddressRepository {
    constructor() { }
    
    async addAddress(data, token) {
        const { street, city, state, zip, country } = data;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        if (!decodedToken) {
            return new Error('no token provided');
        }
        const address = new Address({
            userId,
            street,
            city,
            state,
            zip,
            country
        });
        address.save();
        return address;
    }


    async getAddresses(token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        if (!decodedToken) {
            return new Error('no token provided');
        }
        const addresses = await Address.find({ userId });
        return addresses;
    }

    async deleteAddress(id, token) {
        try {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.userId;
            if (!decodedToken) {
                throw new Error('No token provided');
            }
            const address = await Address.findById(id);
            if (!address) {
                throw new Error('Address not found');
            }
            if (address.userId.toString() !== userId) {
                throw new Error('Unauthorized to delete this address');
            }
            await address.remove();
            return address;
        } catch (err) {
            throw new Error(err.message);
        }
    }
    

    async editAddress(id, newData, token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        if (!decodedToken) {
            return new Error('No token provided');
        }
        const address = await Address.findById(id);
        if (!address) {
            return new Error('Address not found');
        }
        if (address.userId.toString() !== userId) {
            return new Error('Unauthorized to edit this address');
        }
        address.street = newData.street || address.street;
        address.city = newData.city || address.city;
        address.state = newData.state || address.state;
        address.zip = newData.zip || address.zip;
        address.country = newData.country || address.country;
        await address.save();
        return address;
    }
    
}

module.exports = AddressRepository;
