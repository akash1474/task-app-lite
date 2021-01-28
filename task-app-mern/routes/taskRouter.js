import express from "express";
import {
	getTasks,
	updateTask,
	deleteTask,
	createTask,
} from "../controllers/taskController.js";
const taskRouter = new express.Router({ mergeParams: true });

taskRouter.route("/").post(createTask).get(getTasks);
taskRouter.route("/:id").patch(updateTask).delete(deleteTask);

export default taskRouter;
