import  express  from "express";
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { handleError } from "../error.js";

export const signup= async (req,res,next)=>{
    try{
        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password,salt);
        const newUser=new User({...req.
        body,password:hash})
        await newUser.save();

        const token=jwt.sign({id: newUser._id},
            process.env.JWT)
        
        const { password, ...othersData } =newUser._doc;
        const value={...othersData,access_token:token}
        res.status(200)
        .json(value);
    }
    catch(err){
        next(err)
    }
}; 


export const signin= async (req,res,next)=>{
    try{
        const user=await User.findOne({username: req.body.username})
        if(!user){return next(handleError(404,"user not found"))}

        const isCorrect= await bcrypt.compare
        (req.body.password,user.password);

        if(!isCorrect){return next(handleError(404,"user not found"))}


        const token=jwt.sign({id: user._id},
            process.env.JWT)
        
        const { password, ...othersData } =user._doc;

    
        const value={...othersData,access_token:token}
        res.status(200)
        .json(value);

    }
    catch(err){
        next(err)
    }
}; 