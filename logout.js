const express = require('express');
const router = express.Router();
const Token = require('./models/Token.model');


router.delete('/', (req, res) => {
    const refresh_token = req.body.token;
    const response = { success: false, message: '', access_token : ''};

    /* NO TOKEN SENT */
    if(refresh_token == null) {
        return res.sendStatus(401);
    }

    Token.deleteOne({ token: refresh_token }, (error, result) => {
    
        /* DELETE SUCCESSFUL */
        if(result && result.deletedCount > 0) {
            response.success = true;
            response.message = 'Token Removed';
        } 
        
        /* TOKEN NOT FOUND */
        else {
            res.status(204);
        }
        
        return res.json(response);
    });

    

});

module.exports = router;