import { Request , Response } from "express";
import User from "../models/userModel";
import {z} from 'zod'
import jwt from 'jsonwebtoken'

const userSchema = z.object({
    userName : z.string().min(3).max(12),
    password : z.string().min(4).max(10)
})

export const loginController = async(req: Request,res : Response) => {
    try {
        const {userName , password} = req.body;
        const parsedInput = userSchema.safeParse({userName , password});

        if(!parsedInput.success) {
            return res.status(401).json({
                message : "error in validation",
                error : parsedInput.error
            })
        }
        
        const existingUser = await User.findOne({userName});
        if(!existingUser) {
            return res.status(400).json({
                message : "no user found"
            })
        }

        if(password !== existingUser.password) {
            return res.status(401).json({
                message : "password don't match"
            })
        }

        const secret : any = process.env.SECRET;

        const token = jwt.sign({id : existingUser._id} , secret , {expiresIn : '1h'});
         return res.status(201).json({
            message : "successful",
            token : token
         })
        
    } catch (error) {
        console.log(error);
    }
}


export const registerController = async(req:Request,res: Response) => {
    try {
        const {userName , password} = req.body;
        const parsedInput = userSchema.safeParse({userName , password});

        if(!parsedInput.success) {
            return res.status(401).json({
                message : "error in input validation",
                error : parsedInput.error
            })
        }

        const newUser = await User.create({userName , password});
        return res.status(201).json({
            success : true,
            message : "user created",
            user : newUser
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "error in sign up"
        })
    }
}