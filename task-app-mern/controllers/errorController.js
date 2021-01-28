import AppError from '../utils/appError.js';

const handleCastError = (err) => {
	return new AppError(`Invalid ${err.path}:${err.value}`, 401);
};

const handleDuplicationError = (err) => {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
	const msg = `Duplicate field value ${value}. Please use another value`;
	return new AppError(msg, 400);
};

const handleValidationError = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);
	const msg = `Invalid input data. ${errors.join('. ')}`;
	return new AppError(msg, 400);
};

const handleJsonWebTokenError = () => {
	return new AppError(`Invalid token please login again!!!`, 401);
};

const handleTokenExpiredError = () => {
	return new AppError(`Your token has expired!!!`, 401);
};

const handleDevError = (err, req, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const handleProdError = (err, req, res) => {
	if (err.isOperational) {
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	}

	res.status(500).json({
		status: 'error',
		message: 'Something went very wrong!!!',
	});
};

export default function(err,req,res,next){
	console.log("Global Error Handling Middleware");
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';
	if(process.env.NODE_ENV==='development'){
		handleDevError(err, req, res);
	}else if(process.env.NODE_ENV==='production'){
		let error = { ...err };
		error.message = err.message;
		if (error.name === 'CastError') error = handleCastError(error);
		if (error.code === 11000) error = handleDuplicationError(error);
		if (error.name === 'ValidationError') error = handleValidationError(error);
		if (error.name === 'JsonWebTokenError') error = handleJsonWebTokenError();
		if (error.name === 'TokenExpiredError') error = handleTokenExpiredError();

		handleProdError(error, req, res);
	}
}