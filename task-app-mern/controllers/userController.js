import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';


const createUser=catchAsync(async(req,res,next)=>{
	const verifiedUser={
		name:req.body.displayName,
		email:req.body.email,
		photo:req.body.image.url,
		gender:req.body.gender,
		googleId:req.body.id,
		lastname:req.body.name.familyName,
	}
	const user = await User.create(verifiedUser);

	res.status(201).json({
		status:"success",
		user,
	})
});

const loginUser=catchAsync(async(req,res,next)=>{
	const user = await User.findOne({ googleId: req.params.googleId });
	if(!user){
		return next()
	}
})