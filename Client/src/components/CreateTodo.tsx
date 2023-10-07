import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"



const CreateTodo = ({todoList , setTodoList}:any) => {
   const[details , setDetails] = useState({
    title : "",
    description : ""
   })
   const navigate = useNavigate();

   const handleChange = async(e:React.ChangeEvent<HTMLInputElement>) => {
         setDetails(prevState => ({
          ...prevState,
          [e.target.name] : e.target.value
         }))
   }

   const handleSubmit = async(e:React.MouseEvent) => {
    e.preventDefault();
    console.log(details);

    const {data} = await axios.post('http://127.0.0.1:9000/todo/create-todo' ,
     {title : details.title ,
      description : details.description,
    isCompleted : false} ,
    {
      headers : {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    console.log(data.todoItem);
    setTodoList(prevState => ([
      ...prevState ,
      {...data.todoItem}
    ]))
   
    
   }


  return (
    <div className="w-72 h-36 p-5  bg-gray-600 rounded-lg shadow-lg mx-auto mb-10" >
      <form className="flex flex-col gap-y-2" >
        <input name="title" onChange={handleChange} value={details.title} className="px-4 py-1 rounded border-2 border-black" type="text" placeholder='Title' />
        <input name="description" onChange={handleChange} value={details.description} className="px-4 py-1 rounded border-2 border-black" type="text" placeholder='description' />
        <button onClick={handleSubmit} className="bg-black text-white font-mono px-4 py-1 rounded-lg" > Add </button>
      </form>
    </div>
  )
}

export default CreateTodo
