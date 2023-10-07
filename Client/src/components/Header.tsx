import { userState } from "../../State/atoms/authState"
import {useRecoilValue} from 'recoil'
import {useState , useEffect } from 'react'
import {useNavigate} from 'react-router-dom'


const Header = () => {
  const userName = useRecoilValue(userState);
  const [isLoggedIn , setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
     if(localStorage.getItem('token')) {
       setIsLoggedIn(true);
     }
  },[])
  console.log(userName)

  const handleLogout = async(e:React.MouseEvent) => {
      e.preventDefault();
      localStorage.removeItem('token');
      navigate('/signin')
  }

  return (
    <div className=" border border-white flex justify-center gap-x-6 mb-10 ">
      <h1 className="text-white font-mono text-4xl" > Todo App <span className="text-white" >  {userName ? userName : ""} </span> </h1>
      {
        isLoggedIn ? (
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded" > Log Out </button>
        ) : (
          <></>
        )
      }
   </div>

  )
}

export default Header
