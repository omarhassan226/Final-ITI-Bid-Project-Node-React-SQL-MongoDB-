const Joi = require("joi");

const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(15).required().messages({
        'string.empty': 'You must enter a first name',
        'string.min': 'First name must be at least 3 letters',
        'string.max': 'First name must be less than 15 letters'
    }),
    lastName: Joi.string().min(3).max(15).pattern(/^[a-zA-Z]+$/).required().messages({
        'string.empty': 'You must enter a last name',
        'string.min': 'Last name must be at least 3 letters',
        'string.max': 'Last name must be less than 15 letters',
        'string.pattern.base': 'Last name must contain only letters'
    }),
    birthDay: Joi.string().required().messages({
        'string.empty': 'You must enter a birthday'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'You must enter an email',
        'string.email': 'Please enter a valid email'
    }),
    phoneNumber: Joi.string().pattern(/^\d{11}$/).required().messages({
        'string.empty': 'You must enter a phone number',
        'string.pattern.base': 'Phone number must be 11 digits'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'You must enter a password'
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        'string.empty': 'You must enter a confirm password',
        'any.only': 'Passwords do not match'
    })
});

const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

module.exports = validateUser;
