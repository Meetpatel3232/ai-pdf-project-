const User=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cookie=require("cookie");
//login api 
async function Login(req,res){
    try{
    const{username,email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(401).json({
                success:false,
                message:"you need to register first"
            })
        }
    const pass=await bcrypt.compare(password,user.password);
    if(!pass){
        return res.status(401).json({
           success:false,
    message:"password is wrong"
        })
    } 

   const token=await jwt.sign({id:user._id,email:user.email},process.env.SECRET_KEY);
   res.cookie("token",token,{
    httpOnly:true
   });
   return res.status(200).json({
    success:true,
    message:"login success"
   })
   

    }catch(e){
        console.log("error is -",e);
    }
    
}

//register api 
async function Register(req,res){
        
       try{

           const{username,email,password}=req.body;

         const user= await User.findOne({email});
          if(user){
            return res.status(409).json({
                success:false,
                message:"user is already exits you can login"
            })
           
          }
        const hashpassword=  await bcrypt.hash(password,10);
        await User.create({
           username,
           email,
           password:hashpassword
        })
        res.status(201).json({
            success:true,
            message:"succesfully logined"
        })

       }catch(e){
        console.log("the error is"+e);
       }
}

module.exports={Login,Register};