import mongoose from 'mongoose';
import validator from 'validator';
const userSchema=new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'A user must have a name!!!'],
	},
	lastname: {
		type: String,
		trim: true,
		required: [true, 'A user must have a last name!!!'],
	},
	email: {
		type: String,
		validate: [validator.isEmail, 'Please provide a valid email!!!'],
		lowercase: true,
		required: [true, 'Email is required!!!'],
		unique: true,
	},
	photo: {
		type: String,
	},
	googleId: {
		type: String,
		required: [true, "A user must have a googleId"]
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

const userModel = mongoose.model('User', userSchema);

export default userModel;
