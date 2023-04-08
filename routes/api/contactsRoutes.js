const express = require('express');

const { getAllContacts, getContactById, addContact, updateContact, updateStatusContact, removeContact} = require('../../controllers/contactsControllers');
const { validateBody } = require('../../utils/validateBody');
const { addSchema, updateSchema, updateFavoriteSchema } = require('../../schemas/contactsSchema');

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:contactId', getContactById);
router.post('/', validateBody(addSchema), addContact );
router.put('/:contactId', validateBody(updateSchema), updateContact);
router.patch('/:contactId/favorite', validateBody(updateFavoriteSchema), updateStatusContact);
router.delete('/:contactId', removeContact);

module.exports = router;
