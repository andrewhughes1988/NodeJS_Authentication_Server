const express = require('express');
const router = express.Router();
const User = require('./models/User.model');

router.post('/', async (req, res) => {
    const response = { success: false, message: '' };
    let hashed_password = await User.hash_password(req.body.password);
 
    let user = new User({

        name: req.body.name,
        email: req.body.email,
        password: hashed_password
        
    });

    user.save()
        .then(() => {
            response.success = true;
            response.message = 'User created';
            res.json(response);
        })
        .catch((error) => {
            response.message = error;
            res.json(response);
        })
    
})

module.exports = router;