const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces'); /* associe les fonction au router */
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const rateLimit= require('express-rate-limit') // package qui limite le nombre de requêtes de l'utilisateur , retourne une erreur 429 'Too many request'
const limiter= rateLimit({
    max:10,// nombre de requêtes permis dans un certain laps de temps

    windowMs: 60*60*1000, // temps en ms où le max peut être atteint
    message:"too many request from this IP",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})




router.post('/',limiter,auth,multer,saucesCtrl.createSauce);
router.post('/:id/like',auth,saucesCtrl.likeSauce)
router.get('/', auth,saucesCtrl.getAllSauces);
router.get('/:id', auth,saucesCtrl.getOneSauce);
router.put('/:id',auth,multer,saucesCtrl.updateSauce);
router.delete('/:id',auth,multer,saucesCtrl.deleteSauce)
module.exports = router;