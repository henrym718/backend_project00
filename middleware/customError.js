class CustomError extends Error {
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
    }

    notAuthorized(message) {
        this.statusCode = 403
        this.message = message
    }
}
export default CustomError

