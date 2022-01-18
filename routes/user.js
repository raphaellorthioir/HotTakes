const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user'); /* associe les fonctions au router */
const passwordValidator = require('../middleware/password-validator')

router.post('/signup',passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login)
module.exports = router;