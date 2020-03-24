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
    return bcrypt.compare(password, this.password)
}

UserSchema.statics.hash_password = async function(password) {
    return bcrypt.hash(password, 10) 
}

module.exports = mongoose.model('User', UserSchema);