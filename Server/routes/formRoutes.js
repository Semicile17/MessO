const express = require('express');
const formController  = require('../controllers/formController') 
const {protect,restrictTo} = require('../controllers/authController')
const router = express.Router();

router
     .route('/')
     .post(formController.addForm)  
     .get(protect,restrictTo('warden','devs','caretaker'),formController.getAllForms) 

module.exports = router      