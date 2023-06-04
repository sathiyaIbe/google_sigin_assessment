import { Schema, SchemaTypeOptions } from "mongoose";

import dbs from "../DB/index.js"

let UserSchena= new Schema(
    {
        name :String,
        clientId:String,
        files:Array,
    },
    {timestamps:true}
);

const UserModel= dbs.model("User", UserSchena)
export {UserModel}

