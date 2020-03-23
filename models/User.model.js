const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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

module.exports = mongoose.model('User', UserSchema);