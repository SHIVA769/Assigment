const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    user.password = undefined; // Remove password from output

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};

exports.signup = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        // Only parents and mentors can sign up
        if (!['parent', 'mentor'].includes(role)) {
            return res.status(400).json({ message: 'Only parents and mentors can sign up normally.' });
        }

        const newUser = await User.create({ name, email, password, role });
        createSendToken(newUser, 201, res);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password, user.password))) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        createSendToken(user, 200, res);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getMe = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            user: req.user,
        },
    });
};
