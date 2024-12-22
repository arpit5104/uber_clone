const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller')


router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:2}).withMessage("First name must be atleast 3 char long"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 char long")
],
userController.registerUser)











module.exports = router;