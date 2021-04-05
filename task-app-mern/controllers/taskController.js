import Task from "../models/taskModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";

const createTask = catchAsync(async (req, res, next) => {
	if (req.params.userId) {
		req.body.userId = req.params.userId;
	}
	const task = await Task.create(req.body);
	res.status(201).json({
		status: "success",
		data: {
			task,
		},
	});
});

const updateImageUrl=catchAsync(async(req,res,next)=>{
	const imageUrl={
		name:req.body.name,
		url:req.body.url,
	}
	const task=await Task.findByIdAndUpdate(req.params.id,{imageUrl});
	if(!task){
		return next(new AppError("No decument found with that ID",404))
	}

	res.status(200).json({
		status:"success",
		data:imageUrl,
	})


})

const deleteTask = catchAsync(async (req, res, next) => {
	const task = await Task.findByIdAndDelete(req.params.id);
	if (!task) {
		return next(new AppError("No document found with that ID!!!", 404));
	}

	res.status(204).json({
		status: "success",
		message: `Task(${task.id}) was deleted successfully!!!`,
	});
});

const updateTask = catchAsync(async (req, res, next) => {
	const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!task) {
		return next(new AppError("No document found with that ID!!!", 404));
	}

	res.status(200).json({
		status: "success",
		data: {
			task,
		},
	});
});

const getTasks = catchAsync(async (req, res, next) => {
	const features = new APIFeatures(
		Task.find({ userId: req.params.userId }),
		req.query
	)
		.filter()
		.sort()
		.limitFields()
		.paginate();
	const doc = await features.query;

	res.status(200).json({
		status: "success",
		results: doc.length,
		doc,
	});
});

export { createTask, deleteTask, updateTask, getTasks,updateImageUrl };
