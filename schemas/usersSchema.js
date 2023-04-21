const Joi = require('joi');

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionTypes = ['starter', 'pro', 'business'];

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required(),

});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required(),

});

const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
        "any.required": `"missing required field email"`,
    }),
})

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string()
    .valid(...subscriptionTypes)
    .required(),

});

module.exports = {
    registerSchema,
    loginSchema,
    emailSchema,
    updateSubscriptionSchema,
};