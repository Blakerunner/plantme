const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const User = db.user;

// Register a new user
exports.register = (req, res, next) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
    };
    User.findOne({
        where: {
            email: newUser.email,
        },
    })
        .then((user) => {
            if (user) {
                return res.status(401).send({
                    success: false,
                    message: 'User Already Exists.',
                    data: {},
                });
            } else {
                bcrypt.hash(newUser.password, 8, (err, hashedPassword) => {
                    if (err) {
                        return res.status(500).send({
                            success: false,
                            message: err,
                            data: {},
                        });
                    } else {
                        newUser.password = hashedPassword;
                        User.create(newUser)
                            .then((user) => {
                                return res.send({
                                    success: true,
                                    message: 'Register successful',
                                    data: {},
                                });
                            })
                            .catch((err) => {
                                return res.status(500).send({
                                    success: false,
                                    message: err,
                                    data: {},
                                });
                            });
                    }
                });
            }
        })
        .catch((err) => {
            return res
                .status(500)
                .send({ success: false, message: err, data: {} });
        });
};

// Login a User
exports.login = (req, res, next) => {
    const loginUser = {
        email: req.body.email,
        password: req.body.password,
    };
    User.findOne({
        where: {
            email: loginUser.email,
        },
    })
        .then((user) => {
            if (!user) {
                return res.status(401).send({
                    success: false,
                    message: 'User Does Not Exists.',
                    data: {},
                });
            }
            bcrypt.compare(loginUser.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: 'Auth failed',
                        data: {},
                    });
                }
                if (result) {
                    user.password = null;
                    const token = jwt.sign(
                        { user },
                        process.env.JSONWEBTOKEN_SECRET,
                        {
                            expiresIn: 60 * 60 * 24,
                            issuer: 'plantme.api',
                        }
                    );
                    if (!token) {
                        return res.status(500).send({
                            success: false,
                            message: 'Server Failed to create token',
                            data: {},
                        });
                    }
                    res.cookie('plantmejwt', token, {
                        secure: false,
                        httpOnly: true,
                        maxAge: 1000 * 60 * 60 * 24,
                    });
                    res.send({
                        success: true,
                        message: 'Login Success',
                        data: { user, token },
                    });
                } else {
                    return res.status(403).send({
                        success: false,
                        message: 'Incorrect credentials',
                        data: {},
                    });
                }
            });
        })
        .catch((err) => {
            return res.status(500).send({ success: false, message: err });
        });
};

// Silently logged in a user
exports.silentLogin = (req, res, next) => {
    User.findByPk(req.user.id)
        .then((user) => {
            if (!user) {
                return res.status(401).send({
                    success: false,
                    message: 'User Does Not Exists.',
                    data: {},
                });
            }
            user.password = null;
            const token = jwt.sign({ user }, process.env.JSONWEBTOKEN_SECRET, {
                expiresIn: 60 * 60 * 24,
                issuer: 'plantme.api',
            });
            if (!token) {
                return res.status(500).send({
                    success: false,
                    message: 'Server Failed to create token',
                    data: {},
                });
            }
            return res.status(200).send({
                success: true,
                message: 'Silent Login Success',
                data: { user, token },
            });
        })
        .catch((err) => {
            return res
                .status(500)
                .send({ success: false, message: err, data: {} });
        });
};
