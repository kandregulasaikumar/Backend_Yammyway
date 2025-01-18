const vendorController =require('../controllers/vendorController')
const verifyToken = require('../middileware/verifyToken')
const express =require('express');

const router =express.Router();

router.post('/register',vendorController.vendorRegister);

router.post('/login',vendorController.vendorLogin)

router.get('/all-vendors',vendorController.getAllvendors)

// router.get('/one-vendor',verifyToken,vendorController.getOnevendor)we can do like this also

router.get('/one-vendor/:id',vendorController.getOnevendor)

module.exports =router;