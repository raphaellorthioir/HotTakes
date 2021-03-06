const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user'); /* associe les fonctions au router */
const passwordValidator = require('../middleware/password-validator')
const emailValidator = require('../middleware/emailValidator')

router.post('/signup',emailValidator, passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login)
module.exports = router;