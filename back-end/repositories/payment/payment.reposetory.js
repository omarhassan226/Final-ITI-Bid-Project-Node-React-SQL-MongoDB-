const orderModel = require('../../models/order/order.model');
const Product = require('../../models/products/product.model');
const User = require('../../models/user/user.model');
const jwt = require("jsonwebtoken");
const Stripe = require("stripe");
const OrderRepository = require('../order/Order.repository');
const stripe = Stripe(process.env.STRIPE_KEY);

class PaymentRepository {
    constructor() { }

    async payment(data, token) {
        // console.log(token);
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            if (!decodedToken) return 'token must be provided';
            
            const { req } = data;  // Destructure req from data

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: data.name,
                            },
                            unit_amount: data.totalPrice * 100, // Stripe expects amount in cents
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${req.protocol}://${req.get('host')}/checkout-success?success=true&token=${token}`,
                cancel_url: `${req.protocol}://${req.get('host')}/cart?canceled=true`,
            });

            return session.url;

        } catch (err) {
            throw err;
        }
    }
}

module.exports = PaymentRepository;
