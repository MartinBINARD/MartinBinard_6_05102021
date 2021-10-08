// Encrypt email
// Hash password
const bcrypt = require('bcrypt');
// Token 
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// HASH & SAVE IN DATBASE NEW USER
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.stauts(201).json({ message: 'User created !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                return res.status(401).json({ error: 'User not found !'});
            }
            // COMPARE USER HASH GIVEN WITH DATA BASE USER HASH
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ error: 'Wrong password !'});
                    }
                    res.status(200).json({
                        userID: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.SECRET_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};