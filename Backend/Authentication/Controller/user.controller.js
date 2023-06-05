import { UserModel } from "../Models/user.model.js";
import jwt  from 'jsonwebtoken'
import fs from "fs"
import path from "path";
const {sign}=jwt
const accessTokenSecret = 'Signinappsecret';
const AuthenticateUser=async (req,res)=>{
const data=req.body.email
try{
    var token=""
    const get= await UserModel.findOne({email:data})
    if(get!==null){
    var token = sign({data:{user_id : get.userId,Email: get.email,Name:get.name,Picture:get.picture}}, accessTokenSecret);
    const user_data={data:get,token}
    res.status(200).json(user_data)
    }else{
    res.status(200).json(get)
    }
}catch(err){
    console.log(err)
    res.status(400).json({message:"Internal Error"})
}
}
const StoreUser=async(req,res)=>{
    const data=req.body
    const name=req.body.name
    if (name.length>2){
        var val=name.substring(0,3).toLowerCase()
      }else{
        var val=name
      }
      function createVal(val){
        let id=val
        for (let i = 0; i < 5; i++) {
          id += (Math.floor(Math.random() * 9));
          if (id.length===6){
              return id
          }
      }
      }
      var userId=''
      var tembId=createVal(val)
      var checkId=true
      while(checkId){
        var check= await UserModel.findOne({userId:tembId})
        if (check===null){
          checkId=false
          userId=tembId
        }else{
         var tempId=createVal(val)
        }
      }
    try{
        const user_data={...data,userId}
        const store= await new UserModel(user_data).save()
        const get=store
        const token = sign({data:{user_id : get.userId,Email: get.email,Name:get.name,Picture:get.picture}}, accessTokenSecret);
        const stored_data={data:get,token}
        res.status(200).json(stored_data)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"Internal Error"})
    }
}
const StoreFile=async(req,res)=>{
    const data=req.body
    const file = req.files.my_file;
    console.log(data)
    console.log(data)
    var dir = `./Upload/${data.userId}`;
    const name=file.name
    if (!fs.existsSync(dir)) {
        console.log(dir);
        fs.mkdirSync(dir, { recursive: true });
      }
    var path=dir+'/'+name;
  file.mv(path, async(err) => {
    if (err) {
      console.log(err)
      return res.status(500).send(err);
    }
    const findArray=await UserModel.findOne({userId:data.userId})
    console.log(findArray)
    const arr=findArray.files
    arr.push( [`http://localhost:5051/files/${data.userId}/${name}`, data.filename])
    const updateArray=await UserModel.updateOne({userId:data.userId},
        {
            $set:{
                files:arr
            }
        }
        )
        const updatedArray=await UserModel.findOne({userId:data.userId})
   return res.status(200).json(updatedArray)
  });
}
const GetFiles=async(req,res)=>{
    const userId=req.params.id
    try{
        const data= await UserModel.findOne({userId:userId})
        res.status(200).json(data)
    }catch(err){
        res.status(400).json({message:"Internal Error"})
    }
}
export {AuthenticateUser, StoreUser,StoreFile,GetFiles}