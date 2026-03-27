const bcrypt = require('bcrypt');
const JWT=require('jsonwebtoken');
const userModel=require("../models/userModel");

const registerController=async(req,res)=>{
                try{
                     const {username,email,password}=req.body;
                         if(!username ||!email ||!password){
                            return res.status(400).send({
                                success:false,
                                message:"All Field Required"
                            })
                         }
                        //check existing user
                        const existingUser=await userModel.findOne({email});
                        if(existingUser){
                            return res.status(409).send({
                                success:false,
                                message:"User  Already exist"
                            })
                        }

                        //hash password
                        const salt= await bcrypt.genSalt(10);
                        const hashPassword=await bcrypt.hash(password,salt);

                        //save user
                        const newUser=new userModel({username,email,password:hashPassword});
                        await newUser.save();
                         res.status(201).send({
                            success:true,
                            message:"User reigster successfully"
                         })
                }
                catch(err){
                    console.log(err);
                    res.status(500).send(
                        {
                           success:false,
                           message:"Register api"
                        }
                    )
                }
}


//login
const loginController=async(req,res)=>{
    try{
     const{email,password}=req.body;
     //find user
     const user=await userModel.findOne({email});
            if(!user){
                  return  res.status(404).send(
                        {
                           success:false,
                           message:"User does not exist"
                        }
                    )
            }
            //match password
           const isMatch=await bcrypt.compare(password,user.password);

           if(!isMatch){
            return res.status(401).send({
                success:false,
                message:"Invalid credentals"
            })
           }
   
           const token=await JWT.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})

            res.status(200).send({
                success:true,
                message:"Login successfully",
                token,
                user:{
                  id: user._id,
                  username: user.username,
                  email: user.email
                  }
            })

    }
    catch(err){
             console.log(err);
             res.status(404).send(
                        {
                           success:false,
                           message:"login failed"
                        }
                    )
    }
}

module.exports={registerController,loginController}