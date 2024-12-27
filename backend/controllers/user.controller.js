const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname, email, password} = req.body;
    const isUserAlreadyExist = await userModel.findOne({email});
    
    if(isUserAlreadyExist){
        return res.status(400).json({message: 'User already exists'});
    }

    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstname: fullname.firstname, 
        lastname: fullname.lastname, 
        email, 
        password: hashedPassword
    });
    const token = user.generateAuthToken();

    res.status(201).json({token, user});

}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    
    const user = await userModel.findOne({email}).select('+password');
    if(!user) {
        return res.status(401).json({message: "Invalid email or password"});
    }

    const isPasswordMatch = await user.comparePassword(password, user.password);
    if(!isPasswordMatch) {
        return res.status(401).json({message: "Invalid email or password"});
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);
    res.status(200).json({token, user});
}

module.exports.getProfile = async (req, res, next) => {
    const user = req.user;
    res.status(200).json({user});
}

module.exports.logoutUser = async (req, res, next) => {
    try {
        // Safely extract token from either cookies or authorization header
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ message: "No token found" });
        }

        // Check if token is already blacklisted
        const existingToken = await blacklistTokenModel.findOne({ token });
        if (!existingToken) {
            // Only add to blacklist if token isn't already there
            await blacklistTokenModel.create({ token });
        }
        
        // Clear cookie if it exists
        if (req.cookies.token) {
            res.clearCookie('token');
        }

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: "Internal server error during logout" });
    }
}

