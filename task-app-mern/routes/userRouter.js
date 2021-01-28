import express from 'express';
import jwt from 'jsonwebtoken';
import taskRouter from './taskRouter.js';
const router = new express.Router();

const authCheck=(req,res,next)=>{
	console.log(req.user);
	if(!req.user){
		res.send("You are not logged in!!!");
	}
	next();
}

const logout= async(req,res,next)=>{
	const cookieOpt = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		)
	}
	const token=jwt.sign({email:"panditakash38@gmail.com"}, process.env.SECRET, {
		expiresIn:"10h",
	})

	console.log(token);
	req.logout();
	res.cookie('jwt', token, cookieOpt);
	res.send("Logged Out");
}

router.use("/:userId/tasks",authCheck,taskRouter);
router.use("/logout", authCheck, logout);

export default router;