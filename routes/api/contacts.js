const express = require('express');
// const createError = require('http-errors');
const Joi = require('joi');

const contactsOperations = require('../../models/contacts');
const {HttpError} = require('../../helpers');

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required().messages({
      "any.required": `"name" is required`
  }),
  phone: Joi.string().pattern(/^\+?[0-9]{3,}$/).required().messages({
      "any.required": `"phone" is required`,
      "string.empty": `"phone" cannot be empty`,
      "string.base": `"phone" must be string`
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" is required`,
    "string.empty": `"email" cannot be empty`,
    "string.base": `"email" must be string`
}),
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts
    },
  });
  }
  catch(error) {
    next(error);
  }
  
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const {id} = req.params;
    const contact = await contactsOperations.getContactById(id);
    if(!contact) {
      throw HttpError(404, 'Contact not found');
      // throw createError(404, 'Contact not found'); - генерация ошибки с помощью пакета http-errors

      // генерация ошибки вручную:
      // const error = new Error('Contact not found');
      // error.status = 404;
      // throw error; 
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contact,
      },
    });
  } 
   catch (error) {
   next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        data: result,
      },
    });
    
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contactsOperations.removeContact(contactId, req.body);
    if(!result) {
      throw HttpError(404, 'Contact not found');
    }
     res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        message: "contact deleted",
        data: result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const {contactId} = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if(!result) {
      throw HttpError(404, 'Contact not found');
    }
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        data: result,
      },
    });
  } catch (error) {
    next(error);
    }
});

module.exports = router;
