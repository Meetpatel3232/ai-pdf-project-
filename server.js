const app=require("./dbwork/db");


    async function server() {
try{
    
    app.listen(3000,()=>{
        console.log("server is running");
    })


    }catch(e){
    console.log(e);
}
}
server();
