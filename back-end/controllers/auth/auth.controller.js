


class AuthController {
    constructor(authRepositry) {
        this.authRepositry = authRepositry;
    }

    // Function to handle user signup
    async postSignup(body, files) {
        try {
            (body);
            const result = await this.authRepositry.signup(body);  // Call repository to signup user

            const user = await this.authRepositry.findUserByEmailAndAddImage(body.email, files);  // Add image to user profile

            ("user added successfully");
            
            return { msg: "user added successfully", user};  // Return success message and user data

        } catch (err) {
            console.error(err);
            return{ msg: 'failed to create user', error: err.message };  // Return error message if signup fails
        }
    }

    // Function to handle user login
    async postLogin(body) {
        try {
            const email = body.email;
            const password = body.password;
            const token = await this.authRepositry.login(email, password);  // Call repository to login user
            return { token, msg:"user logged in successfully"};  // Return token and success message

        } catch (err) {
            console.error(err);
            return { msg:"user failed to login "};  // Return error message if login fails
        }
    }
    
    async forgetPassword(body){
        try{
            const email = body.email;
            const result = await this.authRepositry.forgetPassword(email);  // Call repository
            return {msg:"password reset successfully",result};  // Return success message
        }catch(err){
            console.error(err);
            return {msg:"password reset failed"};  // Return error message
        }
    }

    async resetPassword(token,body){
        try{
            const otp = body.otp;
            const password = body.password;
            const confirmPassword = body.confirmPassword;
            const result = await this.authRepositry.resetPassword(token,otp,password,confirmPassword);  // Call repository
            return {msg:"password reset successfully",result};  // Return success message
        }catch(err){
            console.error(err);
            return {msg:"password reset failed"};  // Return error message
        }

    }
}

module.exports = AuthController;  // Export AuthController class
