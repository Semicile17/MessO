class AppError extends Error{
    constructor(message,statusCode){
        super(message);   // to call the parent constructor

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this,this.constructor);   // Where the error occurred
    }
}




module.exports = AppError