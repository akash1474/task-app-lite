import Task from '../models/taskModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
const createTask = catchAsync(async (req, res, next) => {
	if(req.params.userId){
		req.body.userId = req.params.userId;
	}
	const task = await Task.create(req.body);
	res.status(201).json({
		status:"success",
		data: {
			task,
		}
	});
});

const deleteTask=catchAsync(async(req,res,next)=>{
	const task=await Task.findByIdAndDelete(req.params.id);
	if (task) {
		return next(new AppError('No document found with that ID!!!', 404));
	}

	res.status(204).json({
		status: "success",
		message: `Task(${task.id}) was deleted successfully!!!`,
	});
})

const updateTask = catchAsync(async (req, res, next) => {
	const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!task) {
		return next(new AppError('No document found with that ID!!!', 404));
	}

	res.status(200).json({
		status: "success",
		data: {
			task,
		}
	})
});

const getTasks=catchAsync(async(req,res,next)=>{
	const tasks = await Task.find({userId:req.params.userId});

	res.status(200).json({
		status:"success",
		data:{
			tasks,
		}
	})
})

export {
	createTask,
	deleteTask,
	updateTask,
	getTasks,
}