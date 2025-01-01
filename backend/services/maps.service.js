const axios = require('axios');
const captainModel = require('../models/captain.model');


module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {


        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }

            return response.data.rows[ 0 ].elements[ 0 ];
        } else {
            throw new Error('Unable to fetch distance and time');
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
}


module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius = 2) => {
    // Ensure minimum radius is 5km
    radius = Math.max(5, radius);  // This will use 5km even if a smaller value is passed

    // First, let's check what captains exist in the database
    const allCaptains = await captainModel.find({
        'location.ltd': { $exists: true },
        'location.lng': { $exists: true }
    });

    

    // Calculate the actual distance to each captain first
    const testDistance = allCaptains
        .map(c => ({
            id: c._id,
            distance: calculateDistance(ltd, lng, c.location.ltd, c.location.lng),
            status: c.status
        }));
    

    // radius in km with 10% buffer
    const bufferRadius = radius * 1.1;  // Add 10% buffer to radius
    console.log(`Searching within ${radius}km (with buffer: ${bufferRadius}km)`);
    
    // Calculate the bounds with buffer
    const latDiff = bufferRadius / 111.12;
    const lngDiff = bufferRadius / (111.12 * Math.cos(ltd * Math.PI / 180));
    
    const minLat = ltd - latDiff;
    const maxLat = ltd + latDiff;
    const minLng = lng - lngDiff;
    const maxLng = lng + lngDiff;
    
    const query = {
        'location.ltd': { $exists: true, $gte: minLat, $lte: maxLat },
        'location.lng': { $exists: true, $gte: minLng, $lte: maxLng }
    };

    const captains = await captainModel.find(query);
    
    // Filter captains by actual distance and add distance to each captain
    const captainsWithDistance = captains.map(captain => {
        const distance = calculateDistance(
            ltd, lng,
            captain.location.ltd,
            captain.location.lng
        );
        return { 
            ...captain.toObject(), 
            distance
        };
    })
    .filter(captain => captain.distance <= radius) // Only keep captains within original radius
    .sort((a, b) => a.distance - b.distance);
    
    
    
    return captainsWithDistance; // Return all captains regardless of status
}

// Helper function to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}
