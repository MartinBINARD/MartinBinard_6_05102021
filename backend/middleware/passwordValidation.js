const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();
const User = require('../models/User');

passwordSchema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports = (req, res, next) => {
    console.log(req.body);
    if (passwordSchema.validate(req.body.password)) {
        console.log('Strong password !');
        next();
    } else {
        res.status(403).json({ error: error | 'Weak password !' })
    }
};