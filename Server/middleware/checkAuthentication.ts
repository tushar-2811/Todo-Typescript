import { NextFunction, Request , Response } from "express"
import jwt  from "jsonwebtoken";


export const isAuthenticated = async(req: Request , res: Response , next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(`authHeader : ${authHeader}`);
        if(!authHeader) {
            return res.sendStatus(401);
        }

        const token = authHeader.split(' ')[1];
        console.log(`token : ${token}`)
        const secret:any = process.env.SECRET;

        const payload:any = jwt.verify(token , secret);
        console.log(`payload : ${payload.id}`)

        req.headers["userId"] = payload.id;
        next();

        
    } catch (error) {
        console.log(`error in authentication ${error}`);
        return res.status(400).json({
            message : "error in authentication",
            error
        })
    }
}

