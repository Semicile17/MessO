const express = require('express');
const studentController  = require('../controllers/studentController');
const {protect,restrictTo} = require("../controllers/authController");
const router = express.Router();

router
     .route('/')
     .get(protect, restrictTo('warden', 'devs'), studentController.getAllStudents);

     

module.exports = router      