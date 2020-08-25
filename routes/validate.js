const jwt = require("jsonwebtoken")

// middleware for verifying jwt
module.exports = function auth(req, res, next) {
    const token = req.header("auth-token")
    if(!token) return res.status(401).send("Access Denied");

    try{
        const verified = jwt.verify(token, "secret-hack")
        req.id = verified
        next();
    }catch(err){
        res.status(400).send("Invalid Token")
    }
}
