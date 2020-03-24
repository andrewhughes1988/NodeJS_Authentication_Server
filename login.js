const express = require('express');
const router = express.Router();
const User = require('./models/User.model');
const RefreshToken = require('./models/RefreshToken.model');

router.post('/', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const response = { success: false, message: '', access_token : '', refresh_token : '' };

    User.findOne({ email }, async (error, user) => {
        let authenticated = false;

        if(!(user)) { 
            response.message = 'Email Not Registered';
            
        } else {
        
            authenticated = await user.authenticate(password)
            
            if(authenticated) {
                response.success = true;
                response.message = 'User Authenticated';
                response.access_token = user.generate_token('access');
                response.refresh_token = user.generate_token('refresh');
                register_refresh_token(response.refresh_token);
                
            } else { 
                response.message = 'Password Incorrect'; 
                
            }
        }

        res.json(response);

    }).select('_id name email +password') //Ensures password is selected    

});

function register_refresh_token(token) {
    new RefreshToken({ token }).save();
}


module.exports = router;