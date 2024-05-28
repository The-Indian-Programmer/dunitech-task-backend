const joi = require('joi');
const httpStatus = require('http-status');

const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
};

const createQuestionValidator = (req, res, next) => {
    const { question, option1, option2, option3, option4, answer, points } = req.body;

    const schema = joi.object({
        question: joi.string().required().messages({ 'any.required': 'Question is required' }).max(255).messages({ 'string.max': 'Question must be at most 255 characters' }),
        option1: joi.string().required().messages({ 'any.required': 'Option 1 is required' }),
        option2: joi.string().required().messages({ 'any.required': 'Option 2 is required' }),
        option3: joi.string().required().messages({ 'any.required': 'Option 3 is required' }),
        option4: joi.string().required().messages({ 'any.required': 'Option 4 is required' }),
        answer: joi.string().required().messages({ 'any.required': 'Answer is required' }),
        points: joi.number().required().messages({ 'any.required': 'Points is required' }).min(1).messages({ 'number.min': 'Points must be greater than 0' }).max(10).messages({ 'number.max': 'Points must be less than 10' }),
    });

    const { error } = schema.validate({ question, option1, option2, option3, option4, answer, points}, options);

    if (error) {
        const message = error.details[0].message.replace(/['"]+/g, '');
        return res.status(httpStatus.BAD_REQUEST).json({ status: false, message })
    }

    next();

}

const submitAnswerValidator = (req, res, next) => {
    const { questionId, answer } = req.body;

    const schema = joi.object({
        questionId: joi.number().required().messages({ 'any.required': 'Question is required' }),
        answer: joi.string().required().messages({ 'any.required': 'Answer is required' }),
    });

    const { error } = schema.validate({ questionId, answer}, options);

    if (error) {
        const message = error.details[0].message.replace(/['"]+/g, '');
        return res.status(httpStatus.BAD_REQUEST).json({ status: false, message })
    }

    next();

}



module.exports = {
    createQuestionValidator, submitAnswerValidator
}


