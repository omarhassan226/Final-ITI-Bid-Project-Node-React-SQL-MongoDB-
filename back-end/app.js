const express = require('express');
const http = require('http');
require('dotenv').config();
const connect = require('./config/db/connection.config')
const PORT = process.env.PORT;
const app = express();
const requestIp = require('request-ip');
const socket = require('socket.io');
const cors = require('cors');
const bodyParser = require("body-parser");
const server = http.createServer(app);


const jwt = require('jsonwebtoken');




const getUserIdFromToken = (socket) => {
    return new Promise((resolve, reject) => {
        const token = socket.handshake.headers['jwt'];
        
        if (!token) {
            return reject(new Error('No token provided'));
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject(new Error('Failed to authenticate token'));
            }

            resolve(decoded.userId);
        });
    });
};

const io = socket(server, {
    cors: {
        origin: "*",
    methods: ['GET', 'POST','PUT', 'DELETE']
    }
});

let chatHistory = [];

io.on('connection', async (socket) => {
    ('A connection started', socket.id);
    try {
        const userId = await getUserIdFromToken(socket);
        if (userId) {
            (`User ${userId} connected with socket ID ${socket.id}`);
        }
    } catch (err) {
        console.error('Error getting user ID from token:', err.message);
        socket.disconnect();
        return;
    }

    socket.emit('chat history', chatHistory);

    socket.on('chat message', async (message) => {
        
        chatHistory.push(message.message);
        await messagesRepository.createMessage(message.sender, message.receiver, message.content);
        io.emit('chat message', message);
    });

    socket.on('newBid', async (bidData) => {
        // Store the new bid in the database (you may already have this functionality)
        // await bidRepository.createBid(bidData.bidder, bidData.amount, bidData.auctionId);
        
        // Emit the new bid to all clients
        io.emit('newBid', bidData);
    });

    socket.on('disconnect', async () => {
        ('A connection disconnected', socket.id);
    });
});

app.get('/api/chat-history', (req, res) => {
    res.json(chatHistory);
});

app.get('/checkout-success', async(req, res) => {
  const token =req.query.token;
console.log(token);
     const x = await orderRepository.createOrder(token)
     res.redirect('http://localhost:5173/profile/orders');
});

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST','PUT', 'DELETE' ,'PATCH']
}));

const AuthRespositry = require('./repositories/auth/auth.repositry');
const AuthController = require('./controllers/auth/auth.controller');
const ProductRepositry = require('./repositories/products/products.repositry');
const ProductController = require('./controllers/products/products.controller');
const ProductStatusRepositry = require('./repositories/productStatus/productStatus.repositry');
const ProductStatusController = require('./controllers/productStatus/productStatus.controller');
const UserRoleRepository = require('./repositories/userRole/userRole.repository');
const UserRoleController = require('./controllers/userRole/userRole.controller');
const CategoryRepository = require('./repositories/category/category.repositry');
const CategoryController = require('./controllers/category/category.controller');
const SubcategoryRepository = require('./repositories/subcategory/subCategory.repository');
const SubcategoryController = require('./controllers/subCategory/subCategory.controller');
const UserRepository = require('./repositories/user/user.repository');
const UserController = require('./controllers/user/user.controller');
// calling AuctionRepository and AuctionController
const AuctionRepository = require('./repositories/auction/auction.repository');
const AuctionController = require('./controllers/auction/auction.controller');
// calling BidRepository and BidController
const BidRepository = require('./repositories/bid/bid.repository');
const BidController = require('./controllers/bid/bid.controllers');
// calling CartRepository and CartController
const CartRepository = require('./repositories/cart/cart.repository');
const CartController = require('./controllers/cart/cart.controllers');
// calling CartRepository and CartController
const PaymentRepository = require('./repositories/payment/payment.reposetory');
const PaymentController = require('./controllers/payment/payment.controller');
// calling wishListRepository and wishListController
const WishListRepository = require('./repositories/wishlist/wishlist.repository');
const WishListController = require('./controllers/wishlist/wishlist.controllers');
// calling ChatRepository and ChatController
const ChatRepository = require('./repositories/chat/chat');
const ChatController = require('./controllers/chat/chat');
// calling MessageRepository and MessageListController
const MessageRepository = require('./repositories/Messages/Messages.repository');
const MessageController = require('./controllers/Messages/Messages.controller');
// calling ConversationRepository and ConversationListController
const ConversationRepository = require('./repositories/conversation/Conversation.repositiry')
const ConversationController = require('./controllers/conversation/conversation.controller')
// calling AddressRepository and AddressListController
const AddressRepository = require('./repositories/address/address.repository')
const AddressController = require('./controllers/address/address.controllers')








// Create instances of AuthRepository and AuthController
const authRepositry = new AuthRespositry();
const authController = new AuthController(authRepositry);
// Create instances of ProductRepositry and ProductController
const productRespositry = new ProductRepositry();
const productController = new ProductController(productRespositry);
// Create instances of ProductStatusRepositry and ProductStatusController
const productStatusRespositry = new ProductStatusRepositry();
const productStatusController = new ProductStatusController(productStatusRespositry);
// Create instances of userRoleRepository and userRoleController
const userRoleRepository = new UserRoleRepository();
const userRoleController = new UserRoleController(userRoleRepository);
// Create instances of userRoleRepository and userRoleController
const categoryRepository = new CategoryRepository();
const categoryController = new CategoryController(categoryRepository);
// Create instances of subCategoryRepository and subCategoryController
const subcategoryRepository = new SubcategoryRepository();
const subcategoryController = new SubcategoryController(subcategoryRepository);
// Create instances of userRepository and userController
const userRepository = new UserRepository(io);
const userController = new UserController(userRepository);
// Create instances of AuctionRepository and AuctionController
const auctionRepository = new AuctionRepository(io);
const auctionController = new AuctionController(auctionRepository);
// Create instances of BidRepository and BidController
const bidRepository = new BidRepository(io);
const bidController = new BidController(bidRepository);
// Create instances of CartRepository and CartController
const cartRepository = new CartRepository();
const cartController = new CartController(cartRepository);
// Create instances of CartRepository and CartController
const paymentRepository = new PaymentRepository();
const paymentController = new PaymentController(paymentRepository);
// Create instances of CartRepository and CartController
const wishlistRepository = new WishListRepository();
const wishlistController = new WishListController(wishlistRepository);
// Create instances of ChatRepository and ChatController
const chatRepository = new ChatRepository();
const chatController = new ChatController(chatRepository);
// Create instances of MessageRepository and MessageController
const messagesRepository = new MessageRepository()
const mesaagecontroller = new MessageController(messagesRepository)
// Create instances of ConversationRepository and ConversationController
const conversationsRepository = new ConversationRepository 
const conversationsController = new ConversationController(conversationsRepository)
// Create instances of AddressRepository and AddressController
const addressRepository = new AddressRepository; 
const addressController = new AddressController(addressRepository)




// routes of the whole application
const authRoutes = require("./routes/auth/auth.routes");
const productsRoutes = require('./routes/products/products.routes');
const productStatusRoutes = require('./routes/productStatus/productStatus.routes');
const userRoleRoutes = require('./routes/userRole/userRole.routes');
const categoryRoutes = require('./routes/category/category.routes');
const subCategoryRoutes = require('./routes/subCategory/subCategory.routes');
const userRoutes = require('./routes/user/user.routes');
const auctionRoutes = require('./routes/auction/aucttion.routes');
const bidRoutes = require('./routes/bid/bid.routes');
const cartRoutes = require('./routes/cart/cart.routes');
const paymentRoutes = require('./routes/payment/payment.routes');
const wishListRoutes = require('./routes/wishlist/wishlist.routes');
const MessagesRouter = require('./routes/Messages/Messages.routes');
const ConversationRouter = require('./routes/Conversation/Conversation.routes');
const addressRouter = require('./routes/address/address.routes');
const OrderController = require('./controllers/orders/Orders.controller');
const OrderRepository = require('./repositories/order/Order.repository');
const orderRouter = require('./routes/order/order.routes');

const BlogRepository = require('./repositories/blog/blog.repository');
const BlogController = require('./controllers/blog/blog.controller');
const CommentRepository = require('./repositories/comment/comment.repository');
const CommentController = require('./controllers/comment/comment.controller');


const blogRepository = new BlogRepository();
const blogController = new BlogController(blogRepository);
const commentRepository = new CommentRepository();
const commentController = new CommentController(commentRepository);

const blogRoutes = require('./routes/blog/blog.routes');
const commentRoutes = require('./routes/comment/comment.routes');


// Create instances of OrderRepository and OrderController
const orderRepository = new OrderRepository();
const orderController = new OrderController(orderRepository);



// Middleware to get client's IP address
app.use(requestIp.mw());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// executing the routes 
app.use("/api/v1/auth", [
    authRoutes(authController),
    ConversationRouter(conversationsController),
    userRoutes(userController),
    bidRoutes(bidController),
    cartRoutes(cartController),
    paymentRoutes(paymentController),
    wishListRoutes(wishlistController),
    MessagesRouter(mesaagecontroller),
    addressRouter(addressController),
    orderRouter(orderController),
    blogRoutes(blogController)
]);
app.use("/api/v1/products", productsRoutes(productController));
app.use('/api/v1', [productStatusRoutes(productStatusController), auctionRoutes(auctionController)], commentRoutes(commentController));
app.use('/api/v1/admin', [
    userRoleRoutes(userRoleController),
    categoryRoutes(categoryController),
    subCategoryRoutes(subcategoryController)
]);

connect.connection
    .then(result => {
        server.listen(PORT, () => {
            (`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        (err);
    });
