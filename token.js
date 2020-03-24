require('dotenv').config();
const express = require('express');
const router = express.Router();
const RefreshToken = require('./models/RefreshToken.model');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    const refresh_token = req.body.token;
    const secret = process.env.REFRESH_TOKEN_SECRET;

    if(refresh_token == null) {
        return res.sendStatus(401);
    }

    RefreshToken.findOne({token: refresh_token}, function (error, result) {
        if(! (result)) {
            return res.sendStatus(403);
        } else {
            jwt.verify(result.token, secret,  function(error, user) {
                if(error) {
                    return res.sendStatus(403);
                } else {
                    //TODO : GENERATE ACCESS TOKEN AND SEND BACK TOKENS TO CLIENT
                }
            });
        }


    })


})

module.exports = router;