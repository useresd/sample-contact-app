const jwt = require("jsonwebtoken");
const UnauthorizedError = require("./../errors/unauthorized.error");

module.exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_KEY);
    } catch(error) {
        throw new UnauthorizedError(error.message);
    }
}