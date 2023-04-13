const Joi = require('joi');

const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../utils/handleMongooseError');

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'], // change the standart error text
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
}, { versionKey: false, timestamps: true, });


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

const updateSchema = Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    email: Joi.string().email(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean(),
});


contactSchema.post('save', handleMongooseError);

const Contact = model('contact', contactSchema); // create connected to contacts collection model, that will work with contactSchema

module.exports = {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
  Contact,
};