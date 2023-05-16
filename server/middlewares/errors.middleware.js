const { StatusCodes } = require("http-status-codes");
const UnauthorizedError = require("./../errors/unauthorized.error");

module.exports = (error, req, res, next) => {

    var statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    
    if(error instanceof UnauthorizedError) {
        statusCode = StatusCodes.UNAUTHORIZED;
    }
    
    res.status(statusCode).send(`error: ${error.message}`);

}