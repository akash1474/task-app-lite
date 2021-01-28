import { promesify } from 'util';
import jwt from 'jsonwebtoken';

import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import User from '../models/userModel';


const signToken=id=>{
	return jwt.sign({id},process.env.SECRET,{
		expiresIn:process.env.JWT_EXPIRES_IN,
	})
}

const createSendToken=(user,statusCode,res)=>{
	const token = signToken(user.id);
	const cookieOpt={
		expires:new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		)
	}
	res.cookie('jwt', token, cookieOpt);
	res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			user,
		},
	});
}

const isLoggedIn=catchAsync(async(req,res,next)=>{
	if(req.cookie.jwt){
		try{
			const decoded = await promesify(jwt.verify)(req.cookie.jwt, process.env.SECRET);
			const currentUser = await User.findById(decoded.id);
			if (!currentUser) return next();
			res.locals.user = currentUser;
			return next();
		}catch(err){
			console.log(err);
		}
	}
	next();
});

const protect=catchAsync(async(req,res,next)=>{
	let token;
	if(
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	){
		token = req.headers.authorization.split(" ")[1];
	}else{
		token=req.cookies.jwt
	}

	if (!token) return next(new AppError("You are not logged in!!!", 401));

	const decoded = await promesify(jwt.verify)(token, process.env.SECRET);
	const currentUser = await User.findById(decoded.id);
	if(!currentUser) return next(new AppError("User belonging to this token doesn't exists",401));

	res.locals.user = currentUser;
	req.user = currentUser;
	next();
})