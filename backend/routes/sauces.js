const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');

// POST USER SAUCE
router.post ('/', auth, sauceCtrl.createSauce);

module.exports = router;