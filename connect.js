// connect to mongoDB
const mongoose =require('mongoose');
require('dotenv').config();
const connectDB=async (URL)=>{
    return mongoose
    .connect(URL,{
        useNewUrlParser:true,
       useUnifiedTopology: true}).then(()=>{console.log("Connected to DB....")
    });
}
module.exports={
    connectDB
}