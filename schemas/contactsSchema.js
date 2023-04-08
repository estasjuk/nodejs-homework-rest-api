const Joi = require('joi');

const addSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `"name" is required`
    }),
    phone: Joi.string().pattern(/^\+?[0-9]{3,}$/).required().messages({
        "any.required": `"phone" is required`,
        "string.empty": `"phone" cannot be empty`,
        "string.base": `"phone" must be a string`
    }),
    email: Joi.string().required().messages({
        "any.required": `"email" is required`,
        "string.empty": `"email" cannot be empty`,
        "string.base": `"email" must be a string`
    }),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
        
    }),
});

module.exports = {
    addSchema,
    updateFavoriteSchema,
}

