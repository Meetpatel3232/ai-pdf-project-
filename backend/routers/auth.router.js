const express=require("express");
const Authrouter=express.Router();
const {Login,Register}=require("../controllers/auth.controller");
Authrouter.post("/Login",Login);
Authrouter.post("/Register",Register);



module.exports=Authrouter;