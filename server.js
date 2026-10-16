const app=require("./dbwork/db");
const Dbconnect=require("./dbwork/databaseconnect");
const AuthRouter=require("./routers/auth.router");

    async function server() {
try{
    
     app.use("/auth",AuthRouter);
    await Dbconnect();
    await app.listen(3000,()=>{
        console.log("server is running");
    })

   


    }catch(e){
   console.error("DB connection failed:", e.message);
    throw e;
}
}
server();
