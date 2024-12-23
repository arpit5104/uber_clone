const express = require('express');
const captainController = require('../controllers/captain.controller');
const router = express.Router();
const {body} = require('express-validator');
const {authCaptain} = require('../middlewares/auth.middleware');


router.post('/register', [
    body('fullname.firstname').isLength({min:2}).withMessage('Full name must be at least 2 characters long'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({min:8}).withMessage('Password is required'),
    body('vehicle.color').isLength({min: 3}).withMessage('Vehicle color is required'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Vehicle plate is required'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type is required'),
],
captainController.registerCaptain
)

router.post('/login',[
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({min:8}).withMessage('Password is required'),
], captainController.loginCaptain);

router.get('/profile', authCaptain, captainController.getCaptainProfile);

router.get('/logout', authCaptain, captainController.logoutCaptain);   





module.exports = router;
