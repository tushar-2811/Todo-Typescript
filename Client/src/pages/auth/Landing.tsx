import Header from "../../components/Header"
import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Spinner from "../../components/Spinner"
import Card from "../../components/Card"
import {useSetRecoilState} from 'recoil'
import { userState} from '../../../State/atoms/authState'
import CreateTodo from "../../components/CreateTodo"

type todoState = {
    title : string;
    description : string;
    isCompleted : boolean;
    _id : any;
}

const Landing = () => {
    const [loading , setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const [todoList , setTodoList] = useState<todoState[]>([]);
    const setUserName = useSetRecoilState(userState);

    const fetchData = async() => {
         const {data} = await axios.get("http://127.0.0.1:9000/todo/fetch-todo",{
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
         } )

         console.log(data);
         setTodoList(data.todoList);
         setUserName(data.userName);
         
         setLoading(false);
    }
    
    useEffect(() => {
        if(!localStorage.getItem('token')) {
            navigate('/signin');
        }

        fetchData();
    },[])

    
  return (
    <div>
      {(loading) ? (
         <Spinner/> 
      ) : (
        <>
        <div className="w-full h-screen bg-black">
        <Header />

        <CreateTodo todoList={todoList} setTodoList={setTodoList} />

       <div className="flex flex-wrap gap-2"> 
         {
            todoList.map((todoItem:todoState) => (
                <Card key={todoItem.title}
                  title={todoItem.title}
                  _id={todoItem._id.toString()}
                  description={todoItem.description}
                  setTodoList = {setTodoList}
                   />
            ))
         }
       </div>
        </div>
        </>
      )}
    </div>
  )
}

export default Landing
