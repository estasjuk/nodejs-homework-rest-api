const express = require('express');

const validateBody = require('../../utils/validateBody');
const upload = require('../../middlewares/upload');
const authenticate = require('../../middlewares/authenticate');

const { registerUser, verifyEmail, resendVerifyEmail, loginUser, getCurrent, logoutUser, updateUserSubscription, updateAvatar } = require('../../controllers/authControllers');
const { registerSchema, emailSchema, loginSchema, updateSubscriptionSchema } = require('../../schemas/usersSchema');

const router = express.Router();

router.post('/register', validateBody(registerSchema), registerUser);
router.get('/verify/:verificationToken', verifyEmail);
router.post("/verify", validateBody(emailSchema), resendVerifyEmail);
router.post('/login', validateBody(loginSchema), loginUser);
router.get('/current', authenticate, getCurrent);
router.post('/logout', authenticate, logoutUser);
router.patch('/', authenticate, validateBody(updateSubscriptionSchema), updateUserSubscription);
router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar)

module.exports = router;