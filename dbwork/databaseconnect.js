const mongoose=require("mongoose");
require("dotenv").config();


    async function Dbconnect(){
  try{
    
    await mongoose.connect(process.env.DBURL)
   console.log("db is connected succesfully ");
     
}catch(e){
    console.log(e);
}
}        

module.exports=Dbconnect;