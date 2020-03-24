const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let UserSchema = new Schema({

    name: {
        type: String,
        required: true,
        
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
    },

    password: {
        type: String,
        required: true,
        select: false,
    }

}, { timestamps: true });

UserSchema.methods.authenticate = async function (password) {
    if(typeof password === 'string') { 
        return bcrypt.compare(password, this.password)
    }
    else { return false; }
}

UserSchema.statics.hash_password = async function(password) {
    if(typeof password === 'string') { 
        return bcrypt.hash(password, 10) 
    }
    else { return false; }
    
}

UserSchema.methods.generate_token = function(type) {
    const issued_at = Date.now();
    const user = { id: this._id, name: this.name, email: this.email, iat: issued_at };
    let secret;
    
    
    if(type == 'access') {
        secret = process.env.ACCESS_TOKEN_SECRET;
        return jwt.sign(user, secret, {expiresIn: '24h'});
    } else {
        secret = process.env.REFRESH_TOKEN_SECRET;
        return jwt.sign(user, secret);
    }
    
    
}

module.exports = mongoose.model('User', UserSchema);