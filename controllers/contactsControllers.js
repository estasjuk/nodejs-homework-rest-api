const Contact = require('../models/contacts');

const { HttpError } = require('../helpers');

const { controllerWrapper } = require('../utils/contollerWrapper');


const getAllContacts = async (req, res) => {
    const contacts = await Contact.find(); // returns all data from the collection
    res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts
    },
  }); 
}

const getContactById = async (req, res) => {
    const {contactId} = req.params;
    // const contact = await Contact.findOne({_id: contactId});
  const contact = await Contact.findById(contactId);
    if(!contact) {
      throw HttpError(404, 'Contact not found');
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contact,
      },
    });
}

const addContact = async (req, res, next) => {
    const result = await Contact.create(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        data: result,
      },
    });  
 }

const updateContact =  async (req, res, next) => {
    const {contactId} = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
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
}

const updateStatusContact =  async (req, res, next) => {
    const {contactId} = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if(!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        data: result,
      },
    });
}

const removeContact = async (req, res, next) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndDelete(contactId, req.body);
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
}

module.exports = {
    getAllContacts: controllerWrapper(getAllContacts),
    getContactById: controllerWrapper(getContactById),
    addContact: controllerWrapper(addContact),
    updateContact: controllerWrapper(updateContact),
    updateStatusContact: controllerWrapper(updateStatusContact),
    removeContact: controllerWrapper(removeContact),
}