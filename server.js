const app=require("./dbwork/db");
const Dbconnect=require("./dbwork/databaseconnect");

    async function server() {
try{
    await Dbconnect();
    app.listen(3000,()=>{
        console.log("server is running");
    })


    }catch(e){
   console.error("DB connection failed:", e.message);
    throw e;
}
}
server();
