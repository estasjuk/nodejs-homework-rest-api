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
}, {versionKey: false, timestamps: true,});

contactSchema.post('save', handleMongooseError)

const Contact = model('contact', contactSchema); // create connected to contacts collection model, that will work with contactSchema

module.exports = Contact;