import { Router } from "express";
import { isAuthenticated } from "../middleware/checkAuthentication";
import { createTodoController, deleteTodoController, fetchTodoController } from "../controllers/todoController";

const todoRouter = Router();

// create new todo
todoRouter.post('/create-todo' , isAuthenticated , createTodoController);

// delete todo
todoRouter.post('/delete-todo/:todoId' , isAuthenticated , deleteTodoController);

// fetch- todo
todoRouter.get('/fetch-todo' , isAuthenticated , fetchTodoController);

export default todoRouter;