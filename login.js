const express = require('express');
const router = express.Router();
const User = require('./models/User.model');
const Token = require('./models/Token.model');

router.post('/', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const response = { success: false, message: '', access_token : '', refresh_token : '' };

    /* FIND USER GIVEN EMAIL */
    User.findOne({ email }, async (error, user) => {
        let authenticated = false;

        if(!(user)) { 
            /* BAD EMAIL */
            response.message = 'Email Not Registered';   
        } else {
        
            authenticated = await user.authenticate(password)
            
            if(authenticated) {
                /* USER AUTHENTICATED, GENERATE/SAVE AUTH TOKENS */
                response.success = true;
                response.message = 'User Authenticated';
                response.access_token = Token.generate_token(user, 'access');
                response.refresh_token = Token.generate_token(user, 'refresh');
                new Token({ token: response.refresh_token }).save();
                
            } else { 
                /* BAD PASSWORD */
                response.message = 'Password Incorrect'; 
            }

        }

        res.json(response);

    }).select('_id name email +password') // Ensure password hash is returned    

});

module.exports = router;