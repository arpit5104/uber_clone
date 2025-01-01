const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const mapsService = require('../services/maps.service')
const mapsController = require('../controllers/map.controller')
const { query } = require('express-validator')

const router = express.Router()

router.get('/get-coordinates',
    query('address').notEmpty().isString().isLength({ min: 3 }).withMessage('Address is required'),
    authMiddleware.authUser, mapsController.getCoordinates)

router.get('/get-distance-time',
    query('origin').notEmpty().isString().isLength({ min: 3 }).withMessage('Origin is required'),
    query('destination').notEmpty().isString().isLength({ min: 3 }).withMessage('Destination is required'),
    authMiddleware.authUser, mapsController.getDistanceTime)


router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapsController.getAutoCompleteSuggestions
)

module.exports = router