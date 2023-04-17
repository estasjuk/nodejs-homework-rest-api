const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');

const { User } = require('../models/users');

const HttpError = require('../helpers/HttpError');

const { controllerWrapper } = require('../utils/contollerWrapper');

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) { 
        throw new HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({...req.body, password: hashPassword, avatarURL});
    res.status(201).json({
        status: 'success',
        code: 201,
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
    },);
};

const loginUser = async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({ email });
    if (!user) { 
        throw new HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) { 
        throw new HttpError(401, "Email or password is wrong");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(201).json({
        status: 'success',
        code: 201,
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        }
    },);
};

const getCurrent = (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({
        email,
        subscription,
    })
};

const logoutUser = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json({
        message: "No content"
    })
};

const updateUserSubscription = async (req, res, next) => {
    const { subscription } = req.body;
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, { subscription });
    if (!result) {
        throw new HttpError(404, 'Not found');
    }
    else if (result.subscription === subscription) {
        next(
            new HttpError(400, "This status is already set")
        );
        return;
    }
    res.status(200).json({
        status: 'success',
        code: 200,
        message: "Status successfully updated"
    });
};

const updateAvatar = async (req, res) => { 
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL })
    
    res.status(200).json({
        status: 'success',
        code: 200,
        avatarURL,
    });
};



module.exports = {
    registerUser: controllerWrapper(registerUser),
    loginUser: controllerWrapper(loginUser),
    getCurrent: controllerWrapper(getCurrent),
    logoutUser: controllerWrapper(logoutUser),
    updateUserSubscription: controllerWrapper(updateUserSubscription),
    updateAvatar: controllerWrapper(updateAvatar),
}