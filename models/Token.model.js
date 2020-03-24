const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

let TokenSchema = new Schema({

    token: {
        type: String,
        required: true,
        unique: true    
    }

}, { timestamps: true });


/* GENERATE AN ACCESS OR REFRESH TOKEN FOR GIVEN USER */
TokenSchema.statics.generate_token = function(user, type) {
    const issued_at = Date.now();
    const user_token = { id: user.id, name: user.name, email: user.email, iat: issued_at };
        
    if(type == 'access') {
        return jwt.sign(user_token, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'});
    } else {
        return jwt.sign(user_token, process.env.REFRESH_TOKEN_SECRET);
    }    
}

module.exports = mongoose.model('Token', TokenSchema);