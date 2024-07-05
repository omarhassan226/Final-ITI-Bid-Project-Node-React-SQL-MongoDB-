class AddressController {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }


    async addAddress(body, token) {
        try {
            const address = await this.addressRepository.addAddress(body, token);
            return {msg:'address added successfully',address};
        } catch (err) {
            return { err:err.message }
        }  
    }

    async getAddresses(token) {
        try {
            const addresses = await this.addressRepository.getAddresses(token);
            return addresses;
        } catch (err) {
            return { err: err.message }
        }
    }

    async deleteAddress(id, token) {
        try {
            const address = await this.addressRepository.deleteAddress(id, token);
            return { msg: 'Address deleted successfully', address };
        } catch (err) {
            return { err: err.message };
        }
    }

    async editAddress(id, body, token) {
        try {
            const updatedAddress = await this.addressRepository.editAddress(id, body, token);
            return { msg: 'Address updated successfully', address: updatedAddress };
        } catch (err) {
            return { err: err.message };
        }
    }

    
}

module.exports = AddressController;
