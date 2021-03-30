import express from 'express';
import jwt from 'jsonwebtoken';
import taskRouter from './taskRouter.js';
const router = new express.Router();
import User from '../models/userModel.js'

const authCheck=(req,res,next)=>{
	console.log(req.user);
	if(!req.user){
		res.send("You are not logged in!!!");
	}
	next();
}

const login=async(req,res,next)=>{
	console.log(req.body);
	console.log(req.cookies);
	User.findOne({ googleId: req.body.googleId }).then((user) => {
				if (!user) {
					console.log('Created');
					const verifiedUser = {
						...req.body,
					};
					User.create(verifiedUser).then((user) => {
						res.status(201).json({
							status:"success",
							user,
						})
					});
				} else {
					console.log('User Available');
					res.status(200).json({
						status:"success",
						user,
					});
				}
			});
	
}

const logout= async(req,res,next)=>{
	res.cookie('jwt', "Logged Out", {
		expires: new Date(Date.now() + 10 * 1000)
	});
	res.json({data:"Logged Out"});
}

router.use("/:userId/tasks",authCheck,taskRouter);
router.post("/login", login);
router.get("/logout", logout);

export default router;