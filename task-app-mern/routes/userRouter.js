import express from 'express';
import jwt from 'jsonwebtoken';
import taskRouter from './taskRouter.js';
const router = new express.Router();
import User from '../models/userModel.js'
import { signToken,protect,login,logout,updateSettings,getTaskOrder,updateTaskOrder } from '../controllers/authController.js';



router.post("/login", login);
router.get("/logout", logout);
router.use(protect);
router.use("/:userId/tasks",taskRouter);
router.route("/:userId/taskOrder").get(getTaskOrder).patch(updateTaskOrder);
router.patch("/:userId/syncSettings",updateSettings);


export default router;