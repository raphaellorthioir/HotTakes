const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces'); /* associe les fonction au router */
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.post('/',auth,multer,saucesCtrl.createSauce);
router.post('/:id/like',auth,saucesCtrl.likeSauce)
router.get('/', auth,saucesCtrl.getAllSauces);
router.get('/:id', auth,saucesCtrl.getOneSauce);
router.put('/:id',auth,multer,saucesCtrl.updateSauce);
router.delete('/:id', auth,multer,saucesCtrl.deleteSauce)
module.exports = router;