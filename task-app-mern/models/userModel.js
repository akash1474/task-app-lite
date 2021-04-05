import mongoose from 'mongoose';
import validator from 'validator';
import Task from './taskModel.js';
const userSchema=new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'A user must have a name!!!'],
	},
	email: {
		type: String,
		validate: [validator.isEmail, 'Please provide a valid email!!!'],
		lowercase: true,
		required: [true, 'Email is required!!!'],
		unique: true,
	},
	imageUrl: {
		type: String,
	},
	googleId: {
		type: String,
		required: [true, "A user must have a googleId"]
	},
	joinedDate:{
		type:Date,
		default:new Date().getTime()
	},
	totalCompleted:Number,
	settings:{
		showCompleted:Boolean,
		bgColor:String,
		isDark:Boolean,
	}
},{
	toJSON:{virtuals:true},
	toObject:{virtuals:true}
})

userSchema.virtual('tasks', {
	ref: 'Task',
	foreignField: 'userId',
	localField: '_id',
});

userSchema.post(/^find/,async function(docs,next){
	const doc=await Task.find({googleId:this.googleId})
	docs.totalCompleted=doc.filter((el)=>el.isCompleted===true).length
	next();
})

const userModel = mongoose.model('User', userSchema);

export default userModel;
