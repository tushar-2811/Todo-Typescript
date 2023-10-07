import { Request,Response } from "express";
import Todo from "../models/todoModel";
import {z} from 'zod'
import User from "../models/userModel";
import { ObjectId, Types } from "mongoose";

const todoSchema = z.object({
    title : z.string().min(3).max(10),
    description : z.string().min(3).max(40),
    isCompleted : z.boolean()
})

// create - new - todo
export const createTodoController = async(req:Request, res:Response) => {
    try {
        const {title , description , isCompleted} = req.body;
        const userId = req.headers.userId;
        console.log(userId);

        const parsedInput = todoSchema.safeParse({title,description,isCompleted});
        if(!parsedInput.success) {
            return res.status(401).json({
                message : "input validation error",
                error : parsedInput.error
            })
        }

        const newTodo = await Todo.create({title , description , isCompleted});

        const currUser = await User.findById(userId);

        currUser?.todoList.push(newTodo._id);
        await currUser?.save();

        return res.status(201).json({
            message : 'todo created',
            todoItem : {title:title , description : description , isCompleted : isCompleted}
        })
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "error in creating todo "
        })
    }
}

export const fetchTodoController = async(req:Request , res: Response)  =>{
    try {
        const userId = req.headers.userId;

        const existingUser = await User.findById(userId).populate('todoList');

        return res.status(201).json({
            message : "todo list of the user",
            todoList : existingUser?.todoList,
            userName : existingUser?.userName,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            message : "error in fetching todo list",
            error
        })
    }
}

// delete - todo
export const deleteTodoController = async(req:Request , res:Response) => {
    try {
        const userId = req.headers.userId;
        const todoId = req.params.todoId;

        const existingUser = await User.findById(userId).populate('todoList');

        if(!existingUser) {
            return res.status(403).json({
                message : "user not found"
            })
        }
        console.log(existingUser.todoList);
       
        const newTodoList = existingUser.todoList.filter((todo) => {
            const todoid = todo._id.toString();
            return todoid !== todoId;
        })

       existingUser.todoList = newTodoList;
       await existingUser.save();

        console.log(newTodoList);

        return res.status(201).json({
            msg : "deleted todo",
            todoList : newTodoList
        })

       

        
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            message : "error in deleting todo"
        })
    }
}