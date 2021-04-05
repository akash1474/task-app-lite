import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: [true, 'Task name is required'],
			maxlength: [50, 'Title should be less than 50 words']
		},
		description:{
			type:String,
		},
		createdOn: {
			type: Date,
			default: Date.now(),
		},
		expectedDate: Number,
		userId: {
			type: mongoose.Schema.ObjectId,
			required: [true, 'Task must belong to a user!!!'],
			ref: 'User',
		},
		imageUrl:{
			name:String,
			url:String,
		},
		isImportant: {
			type: Boolean,
			default: false,
		},
		isCompleted: {
			type: Boolean,
			default: false,
		},
		isEvent:{
			type:Boolean,
			default:false,
		},
		category: {
			type: Number,
			default: 0,
		},
	}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true },
}
);

const taskModel = mongoose.model('Task', taskSchema);
export default taskModel;