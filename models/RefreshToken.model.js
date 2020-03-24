const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RefreshTokenSchema = new Schema({

    token: {
        type: String,
        required: true,
        unique: true
        
    }

    
}, { timestamps: true });


module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);