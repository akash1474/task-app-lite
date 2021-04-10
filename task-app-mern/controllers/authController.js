import jwt from "jsonwebtoken";

import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";

export const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "7d",
  });
};

export const login = async (req, res, next) => {
  User.findOne({ googleId: req.body.googleId }).then((user) => {
    if (!user) {
      console.log("Created");
      const verifiedUser = {
        ...req.body,
      };
      User.create(verifiedUser).then((user) => {
        res.status(201).json({
          status: "success",
          token: signToken(user.googleId),
          user,
        });
      });
    } else {
      console.log("User Available");
      res.status(200).json({
        status: "success",
        token: signToken(user.googleId),
        user,
      });
    }
  });
};

export const logout = async (req, res, next) => {
  res.json({ data: "Logged Out" });
};

export const updateSettings = catchAsync(async (req, res, next) => {
  const settings = {
    isDark: req.body.isDark,
    showCompleted: req.body.showCompleted,
    bgColor: req.body.bgColor,
  };
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { settings },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!user) return next(new AppError("Invalid Id", 404));
  res.status(200).json({
    status: "success",
    message: "Settings Synced",
    settings: user.settings,
  });
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(new AppError("You are not logged in!!!", 401));

  const decoded = jwt.verify(token, process.env.SECRET);
  const currentUser = await User.find({ googleId: decoded.id });
  if (!currentUser)
    return next(
      new AppError("User belonging to this token doesn't exists", 401)
    );

  req.user = currentUser;
  next();
});

