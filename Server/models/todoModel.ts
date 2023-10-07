import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title : {
        type : String
    },
    description : {
        type : String
    },
    isCompleted : {
        type : Boolean
    }
})

const Todo = mongoose.model("Todo" , todoSchema);

export default Todo;