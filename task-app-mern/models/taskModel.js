import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'Task name is required'],
			maxlength: [50, 'Name should be less than 50 words']
		},
		createdOn: {
			type: Date,
			default: Date.now(),
		},
		deadline: Date,
		userId: {
			type: mongoose.Schema.ObjectId,
			required: [true, 'Task must belong to a user!!!'],
			ref: 'User',
		},
		important: {
			type: Boolean,
			default: false,
		},
		isCompleted: {
			type: Boolean,
			default: false,
		},
		color: String,
		category: {
			type: String,
			default: 'Task',
		},
	}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true },
}
);

const taskModel = mongoose.model('Task', taskSchema);
export default taskModel;