const jwt = require("jsonwebtoken");
const UnauthorizedError = require("./../errors/unauthorized.error");

function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_KEY);
    } catch(error) {
        throw new UnauthorizedError(error.message);
    }
}

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