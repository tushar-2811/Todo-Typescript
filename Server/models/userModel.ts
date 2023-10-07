import mongoose from "mongoose";
import Todo from "./todoModel";

const userSchema = new mongoose.Schema({
    userName : {
        type : String
    },
    password : {
        type : String
    },
    todoList: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Todo',
        },
      ],
})


const User = mongoose.model('User' , userSchema);
export default User;