const express = require('express');
const authController = require('../controllers/authController')

const router = express.Router();

router
     .route('/stu_login')
     .post(authController.studentLogin); 

router
     .route('/stu_signup')
     .post(authController.studentSignup);   

router
     .route('/adm_login')
     .post(authController.adminLogin); 

router
     .route('/adm_signup')
     .post(authController.adminSignup); 
     
router
     .route('/')
     .get(authController.protect)     

module.exports = router      