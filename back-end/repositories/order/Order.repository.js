const Order = require('../../models/order/order.model'); 
const Cart = require('../../models/cart/cart.model');
const jwt = require("jsonwebtoken");

class OrderRepository {
    async createOrder(token) {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        const cartItems = await Cart.find({ userId }).populate('productId').exec();
        if (!cartItems || cartItems.length === 0) {
            throw new Error('Cart is empty');
        }

        const totalAmount = cartItems.reduce((acc, item) => acc + item?.productId?.price * item?.quantity, 0);
        (cartItems);
        const order = new Order({
            userId,
            items: cartItems.map(item => ({
                productId: item?.productId?._id,
                quantity: item?.quantity
            })),
            totalAmount
        });

        await order.save();

        await Cart.deleteMany({ userId });

        return order;
    }

    async getOrder(orderId) {
        const order = await Order.findById(orderId).populate('items.productId').exec();
        return order;
    }

    async getAllOrders() {
        const orders = await Order.find({}).populate('userId productId').exec();
        return orders;
    }

    async getUserOrders(token) {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const orders = await Order.find({ userId }).populate('items.productId').populate('userId').exec();
        return orders;
    }


    async updateOrder(orderId,data){
        const order= await Order.findByIdAndUpdate(orderId, data)
        return order
    }

    // New method for deleting an order
    async deleteOrder(orderId) {
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    }
}

module.exports = OrderRepository;
