import { createConnection } from "mongoose";

var dbs=createConnection('mongodb://0.0.0.0:27017/Krayo',
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
},
function(err,db){
    console.log("Database is connected successfully")
    
}
)
export default dbs
