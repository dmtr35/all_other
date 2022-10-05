











// module.exports = class ApiError extends Error {
export default class ApiError extends Error {
    status
    

    constructor(status, message) {
        super(message)
        this.status = status
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }
    
    static BadRequest(message) {
        return new ApiError(400, message)
    }
}

