const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauces');

// CREATE USER SAUCE
router.post ('/', auth, multer, sauceCtrl.createSauce);
// MODIFY USER SAUCE IN DATABASE
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// DELETE SAUCE IN DATABASE
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// FIND TO DISPLAY SPECIFIC SAUCE FROM DATA BASE
router.get('/:id', auth, sauceCtrl.getOneSauce);
// FIND TO DISPLAY ALL SAUCES FROM DATABASE IN MAIN PAGE
router.get('/', auth, sauceCtrl.getAllSauces);
// LIKE SAUCE
// router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;