import mongoose from "mongoose";
// schema..........................
interface Iuser{
    _id?:mongoose.Types.ObjectId,
    name:string,
    image:string,//?optinal
    email:string,
    password?:string,
    createdAt?:Date,
    updatedAt?:Date,
}



const userSchema =new mongoose.Schema<Iuser>({
name:{
    type:String,
    required:true
    },
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:false
},
image:{
    type:String,

}

},{timestamps:true})

// model.............................

const User=mongoose.models.User || mongoose.model("User",userSchema)
export default User