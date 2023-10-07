import axios from "axios";
import { useNavigate } from "react-router-dom";


type propstype = {
    title : string;
    description : string;
    isCompleted : boolean;
}

const Card = ({title , description ,  setTodoList,_id }:any) => {
  const navigate = useNavigate();

  const handleDelete = async(e:React.MouseEvent) => {
     e.preventDefault();

     const {data} = await axios.post(`http://127.0.0.1:9000/todo/delete-todo/${_id}` , {} ,{
      headers : {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
     })

     setTodoList(data.todoList);
     navigate('/landing')
  }
  
  return (
    <div className='h-36 w-72 border-2' >

       <h1 className='text-white' > {title} </h1>
       <p className='text-white'> {description} </p>
       <button onClick={handleDelete} className="bg-red-500 text-white border-2 px-4 py-1 rounded" >
         Remove 
        </button>
       
    </div>
  )
}

export default Card 
