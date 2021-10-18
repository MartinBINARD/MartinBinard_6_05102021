const express = require('express');
const router = express.Router();

const passwordValidation = require('../middleware/passwordValidation');
const userCtrl = require('../controllers/users');

router.post('/signup', passwordValidation, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;