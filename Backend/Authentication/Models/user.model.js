import { Schema, SchemaTypeOptions } from "mongoose";

import dbs from "../DB/index.js"

let UserSchena= new Schema(
    {
        name :{type: String, unique:true},
        userId:String,
        email:String,
        image_url:String,
        files:Array,
    },
    {timestamps:true}
);

const UserModel= dbs.model("User", UserSchena)
export {UserModel}

