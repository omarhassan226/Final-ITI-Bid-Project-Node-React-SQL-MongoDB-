const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();  // Load environment variables from .env file
const Email = require('../../utils/email');
const User = require("../../models/user/user.model");
const UserRole = require('../../models/userRole/userRole.model');
const { storage } = require('../../config/firebase/firebase.config');
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

class AuthRepositry {
    constructor() { };

    // Function to sign up a new user
    async signup(userData) {
        try {
            // (userData);
            const { firstName, lastName, birthDay, email, phoneNumber, password, confirmPassword } = userData;

            // Check if passwords are provided and match
            if (!password || !confirmPassword) {
                throw new Error('Passwords are required');
            }
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            // Find user role
            const userRole = await UserRole.find();
            if (!userRole) {
                throw new Error('Role not found');
            }

            // Set role based on email
            const role = email === 'tolba@gmail.com' ? userRole[0]._id : userRole[1]._id;

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Email already exists');
            }

            // Create a new user
            const folderName = email + new Date().toISOString().split('T')[0];
            const user = new User({
                firstName,
                lastName,
                birthDay,
                email,
                phoneNumber,
                imageUrl: { images: [] },
                folderName,
                role,
                password: hashedPassword,
                notification: { items: [] },
            });

            // Save the user
            await user.save();

            // Send a confirmation email
            await Email.sendMail({
                to: email,
                from: 'shop@node-complete.com',
                subject: 'Signup succeeded!',
                html: '<h1>You successfully signed up!</h1>'
            });

            return user;
        } catch (err) {
            throw err;
        }
    }

    // Function to log in a user
async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password.");
    }

    // Check if user password is missing
    if (!user.password) {
        throw new Error("User password is missing.");
    }

    // Compare the passwords
    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) {
        throw new Error("Invalid email/phone number or password.");
    }

    // Create and return a JWT token
    const token = jwt.sign(
        {
            email: user.email,
            userId: user._id.toString(),
        },
        process.env.JWT_SECRET,  // Secret key for signing the token
        { expiresIn: "5h" }       // Token expiration time
    );
    
    return {token,user}
}
// (token);

    // Function to find a user by email and add an image
    async findUserByEmailAndAddImage(email, files) {
        const user = await User.findOne({ email });
        if (user && files && files.length > 0) {
            const storageRef = ref(storage, `images/${user.email}/${Date.now()}-${files[0].originalname}`);
            const metadata = {
                contentType: files[0].mimetype,
            };

            // Upload the file to Firebase Storage
            await uploadBytes(storageRef, files[0].buffer, metadata);
            const imageUrl = await getDownloadURL(storageRef);

            // Add the image URL to the user's image URL array
            if (!user.imageUrl) {
                user.imageUrl = { images: [] };
            }
            user.imageUrl.images.push(imageUrl);

            // Save the user with the new image URL
            await user.save();
        }
        return user;
    }


    
    async generateOTP() {
        let otp = '';
        for (let i = 0; i < 8; i++) {
            otp += Math.floor(Math.random() * 10); // Generates a random digit between 0 and 9
        }
        return otp;
    }


    async forgetPassword(email){
        const user = await User.findOne({ email });
        const token = jwt.sign(
            {
                email
            },
            process.env.JWT_SECRET,  // Secret key for signing the token
            { expiresIn: "10m" }       // Token expiration time
        );
        const otp = await this.generateOTP();
        if(!user){
            return new Error('user not found')
        }
        user.resetPasswordToken = token;
        user.resetPasswordOtp = otp;
        await user.save();
        // Send the OTP to the user's email
        await Email.sendMail({
            to: email,
            from: 'shop@node-complete.com',
            subject: 'Reset Password!',
            html: `click here to redirect to reset password link 127.0.0.1:3000/api/v1/auth/${token}
            OTP: ${otp}
            it will expire in 10 minutes`
        });
        return {token, otp};
    }


    async resetPassword(token,otp,password,confirmPassword){
        const user = await User.findOne({ resetPasswordToken: token , resetPasswordOtp:otp });
        if (!user) {
            return 'Invalid token or OTP';
        };
        if(password!==confirmPassword){
            return 'password and confirm password do not match';
        };
        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordOtp = undefined;
        await user.save();
        return user;
    }



}

module.exports = AuthRepositry;
