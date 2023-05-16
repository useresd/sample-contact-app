const express = require("express");
const r = express.Router();
const jsonwebtoken = require("jsonwebtoken");

// mock function to authenticate username, password
function authenticated(username, password) {
    return (username == "user1" && password == "user1") || (username = "user2" && password == "user2");
}

r.post("/login", (req, res, next) => {

    try {
        const { username, password } = req.body;
    
        // check if a user is authenticated then issue the jwt
        if(authenticated(username, password)) {
            
            // jwt payload
            const payload = {
                sub: username,
                exp: Math.floor(Date.now() / 1000) + (60 * 60)
            };

            // sign the jwt
            const token = jsonwebtoken.sign(payload, process.env.JWT_KEY);
            
            // send the response
            res.json({token});
            return;
            
        }

        throw new Error("Please check your username/password!");

    } catch(error) {
        next(error);
    }

})

module.exports = r;