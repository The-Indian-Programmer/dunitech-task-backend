const joi = require('joi');
const httpStatus = require('http-status');

const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
};


const registerValidator = (req, res, next) => {
    const { userId, password, confirmPassword } = req.body;
    const schema = joi.object({
        userId: joi.string().required().messages({ 'any.required': 'User ID is required' }),
        password: joi.string().min(6).messages({ 'string.min': 'Password must be at least 6 characters' }).required().messages({ 'any.required': 'Password is required' }),
        confirmPassword: joi.string().valid(joi.ref('password')).messages({ 'any.only': 'Password does not match' }).label('Confirm Password').required().messages({ 'any.required': 'Confirm Password is required' })
    });

    const { error } = schema.validate({ userId, password, confirmPassword }, options);

    if (error) {
        const message = error.details[0].message.replace(/['"]+/g, '');
        return res.status(httpStatus.BAD_REQUEST).json({ status: false, message })
    }
    next();

}

const loginValidator = (req, res, next) => {
    const { userId, password } = req.body;
    const schema = joi.object({
        userId: joi.string().required().messages({ 'any.required': 'User ID is required' }),
        password: joi.string().required().messages({ 'any.required': 'Password is required' })
    });

    const { error } = schema.validate({ userId, password }, options);

    if (error) {
        const message = error.details[0].message.replace(/['"]+/g, '');
        return res.status(httpStatus.BAD_REQUEST).json({ status: false, message })
    }
    next();

}

const adminLoginValidator = (req, res, next) => {
    const { email, password } = req.body;
    const schema = joi.object({
        email: joi.string().email().required().messages({ 'any.required': 'Email is required' }),
        password: joi.string().required().messages({ 'any.required': 'Password is required' })
    });

    const { error } = schema.validate({ email, password }, options);

    if (error) {
        const message = error.details[0].message.replace(/['"]+/g, '');
        return res.status(httpStatus.BAD_REQUEST).json({ status: false, message })
    }
    next();

}


module.exports = {
    registerValidator,
    loginValidator,
    adminLoginValidator
}