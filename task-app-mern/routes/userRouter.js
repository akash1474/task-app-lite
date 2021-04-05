import express from 'express';
import jwt from 'jsonwebtoken';
import taskRouter from './taskRouter.js';
const router = new express.Router();
import User from '../models/userModel.js'
import { signToken,protect,login,logout,updateSettings } from '../controllers/authController.js';




router.use("/:userId/tasks",protect,taskRouter);
router.patch("/:userId/syncSettings",updateSettings);
router.post("/login", login);
router.get("/logout", logout);

export default router;