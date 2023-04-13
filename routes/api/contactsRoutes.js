const express = require('express');

const isValidId = require('../../middlewares/isValidId');
const authenticate = require('../../middlewares/authenticate');
const validateBody = require('../../utils/validateBody');

const { getAllContacts, getContactById, addContact, updateContact, updateStatusContact, removeContact} = require('../../controllers/contactsControllers');
const { addSchema, updateSchema, updateFavoriteSchema } = require('../../models/contacts');

const router = express.Router();

router.get('/', authenticate, getAllContacts);
router.get('/:contactId', authenticate, isValidId, getContactById);
router.post('/', authenticate, validateBody(addSchema), addContact );
router.put('/:contactId', authenticate, validateBody(updateSchema), updateContact);
router.patch('/:contactId/favorite', authenticate, validateBody(updateFavoriteSchema), updateStatusContact);
router.delete('/:contactId', authenticate, removeContact);

module.exports = router;
