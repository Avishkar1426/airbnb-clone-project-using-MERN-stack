class ExpressError extends Error {
    constructor(statusCode, message) {
        super();  // Call the Error constructor
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;
