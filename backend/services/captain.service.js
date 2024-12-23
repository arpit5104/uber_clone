const CaptainModel = require('../models/captain.model');


module.exports.createCaptain = async (captainData) => {

    const {firstname, lastname, email, password, color, plate, capacity, vehicleType} = captainData;
    
    if(!firstname || !email || !password || !color || 
       !plate || !capacity || !vehicleType){
        throw new Error('All fields are required');
    }

    const captain = new CaptainModel({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    return captain;
}

