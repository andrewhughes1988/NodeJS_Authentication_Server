const express = require('express');
const router = express.Router();
const User = require('./models/User.model');

router.post('/', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const response = { success: false, message: '', token : '' };

    User.findOne({ email }, async (error, user) => {
        let authenticated = false;

        if(!(user)) { 
            response.message = 'Email Not Registered';
            res.json(response);
        } else {
        
        authenticated = await user.authenticate(password)
        
        if(authenticated) {
            response.success = true;
            response.message = 'User Authenticated';
            res.json(response);
        } else { 
            response.message = 'Password Incorrect'; 
            res.json(response);
        }


    }

    }).select('_id name email +password') //Ensures password is selected    

});


module.exports = router;