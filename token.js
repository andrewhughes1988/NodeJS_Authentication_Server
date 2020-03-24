const express = require('express');
const router = express.Router();
const Token = require('./models/Token.model');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    const refresh_token = req.body.token;
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const response = { success: false, message: '', access_token : ''};

    /* NO TOKEN SENT */
    if(refresh_token == null) {
        return res.sendStatus(401);
    }

    Token.findOne({token: refresh_token}, function (error, result) {
        /* INVALID REFRESH TOKEN */
        if(! (result)) {
            return res.sendStatus(403);
        } 
        
        /* TOKEN IS VALID, GENERATE NEW ACCESS TOKEN */
        
        jwt.verify(result.token, secret,  function(error, user) {
            if(error) {
                return res.sendStatus(403);
            } else {
                response.success = true;
                response.message = 'Access token refreshed';
                response.access_token = Token.generate_token(user, 'access');   
                res.json(response);  
            }
        });

    })

});

module.exports = router;