const express = require('express');

const validateBody = require('../../utils/validateBody');
const authenticate = require('../../middlewares/authenticate');

const { registerUser, loginUser, getCurrent, logoutUser, updateUserSubscription } = require('../../controllers/authControllers');
const { registerSchema, loginSchema, updateSubscriptionSchema } = require('../../models/users');

const router = express.Router();

router.post('/register', validateBody(registerSchema), registerUser);
router.post('/login', validateBody(loginSchema), loginUser);
router.get('/current', authenticate, getCurrent);
router.post('/logout', authenticate, logoutUser);
router.patch('/', authenticate, validateBody(updateSubscriptionSchema), updateUserSubscription);

module.exports = router;