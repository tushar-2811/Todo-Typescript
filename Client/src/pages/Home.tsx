import Header from "../components/Header"
import {useNavigate} from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-black gap-5" >
        
        <Header/>
       
       <div className="flex justify-center gap-4">

        <button onClick={() => navigate('/signin')}  className="text-white px-4 py-1 border-2 border-white rounded-lg"> 
        Sign In 
        </button>

        <button onClick={() => navigate('/signup')} className="text-white px-4 py-1 border-2 border-white rounded-lg" >
             Sign Up 
        </button>

       </div>
    </div>
  )
}

export default Home
