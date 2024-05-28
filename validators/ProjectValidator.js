const joi = require('joi');
const httpStatus = require('http-status');

const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
};

const createProjectValidator = (req, res, next) => {
    const { name, purpose, description } = req.body;
    const schema = joi.object({ 
        name: joi.string().required().messages({ 'any.required': 'Title is required' }).max(50).messages({ 'string.max': 'Title must be at most 50 characters' }),
        purpose: joi.string().required().messages({ 'any.required': 'Purpose is required' }),
        description: joi.string().required().messages({ 'any.required': 'Description is required' }).min(10).messages({ 'string.min': 'Description must be at least 10 characters' }).max(500).messages({ 'string.max': 'Description must be at most 500 characters' })
    });

    const imageSchema = joi.object({
        logo: joi.any().required().messages({ 'any.required': 'Logo is required' })
    })

    const { error } = schema.validate({ name, purpose, description }, options);


    // we must access the file from req.files instead of req.body
    const { file: logo } = req.files;
    const { error: imageError } = imageSchema.validate({ logo }, options);

    if (imageError) {
        const message = imageError.details[0].message.replace(/['"]+/g, '');
        return res.status(httpStatus.BAD_REQUEST).json({ status: false, message })
    }

    if (error) {
        const message = error.details[0].message.replace(/['"]+/g, '');
        return res.status(httpStatus.BAD_REQUEST).json({ status: false, message })
    }



    next();

}



module.exports = {
    createProjectValidator
}


