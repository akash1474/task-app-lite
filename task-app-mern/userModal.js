const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"A user must have a name"],
    },
    googleId:{
        type:String,
        required:[true,"A user must have a googleId"]
    }
});

const userModal=mongoose.model('user',userSchema);

module.exports=userModal;

