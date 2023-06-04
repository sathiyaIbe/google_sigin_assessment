import { UserModel } from "../Models/user.model.js";

const AuthenticateUser=async (req,res)=>{
console.log(req.body)
const get= await UserModel.find({})
}

export {AuthenticateUser}