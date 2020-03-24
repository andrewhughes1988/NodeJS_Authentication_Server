export function verify_access_token (req, res, next) {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    
    jwt.verify(token, secret, function(error, user) {

        if(error) { 
            return res.sendStatus(403); 
        } 

        req.user = user;
        next();
        
    });

}

export function verify_refesh_token(token) {

}