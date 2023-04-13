const Joi = require('joi');

const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../utils/handleMongooseError');

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const subscriptionTypes = ['starter', 'pro', 'business'];

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
    token: {
        type: String,
        default: null,
    }
}, { versionKey: false, timestamps: true, });

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required(),

});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required(),

});

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string()
    .valid(...subscriptionTypes)
    .required(),

});

const User = model('user', userSchema);

module.exports = {
    userSchema,
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
    User,
};