import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please enter username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"please enter email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please enter password"],
    },
    avatar:{
        type:String,
    },
    role:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

const User = mongoose.models.User|| mongoose.model("User",userSchema)

export default User;