import express from 'express'
import dotenv from 'dotenv'
import './config/mongoDB'
import cors from 'cors'
import userRouter from './routes/authRoutes';
import todoRouter from './routes/todoRoutes';
dotenv.config();


const Port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/user' , userRouter);
app.use('/todo' , todoRouter);






app.listen(Port , () => {
    console.log(`Server is running on port : ${Port}`);
})