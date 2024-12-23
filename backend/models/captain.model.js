const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [2, 'First name must be at least 2 characters long'],
            
        },
        lastname:{
            type: String,
            required: true,
            minlength: [2, 'Last name must be at least 2 characters long'],
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    socketId:{
        type: String,
        
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle:{
       color:{
        type: String,
        required: true,
       },
       plate:{
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Plate must be at least 3 characters long'],
       },
       capacity:{
        type: Number,
        required: true,
        min: [1, 'Capacity must be at least 1'],
       },
       vehicleType:{
        type: String,
        required: true,
        enum: ['car', 'bike', 'auto'],
       }
    },
    location:{
        latitude:{
            type: Number,
        },
        longitude:{
            type: Number,
        }
    }
})

captainSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model('Captain', captainSchema);