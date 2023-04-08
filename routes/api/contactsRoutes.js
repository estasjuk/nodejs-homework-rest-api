const express = require('express');

const { getAllContacts, getContactById, addContact, updateContact, updateFavorite, removeContact} = require('../../controllers/contactsControllers');
const { validateBody } = require('../../utils/validateBody');
const { addSchema, updateFavoriteSchema } = require('../../schemas/contactsSchema');

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:contactId', getContactById);
router.post('/', validateBody(addSchema), addContact );
router.put('/:contactId', validateBody(addSchema), updateContact);
router.patch('/:contactId/favorite', validateBody(updateFavoriteSchema), updateFavorite);
router.delete('/:contactId', removeContact);

module.exports = router;
