const jwt = require("jsonwebtoken");
const UnauthorizedError = require("./../errors/unauthorized.error");
const { verifyToken } = require("./../utils/token");

module.exports = (req, res, next) => {
    try {

        // check the authorizaiton header
        /**
         * @type string
         */
        const authorization = req.headers["authorization"];

        if(!authorization) {
            throw new UnauthorizedError("missing authorization token header");
        }
    
        // extract the token form the header
        const token = authorization.substring(6).trim();
    
        // verify the token
        const { sub: username } = verifyToken(token);

        res.locals.username = username;

        next();

    } catch(error) {
        next(error);
    }
    
}