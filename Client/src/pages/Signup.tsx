import React, { useState } from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'


const Signup = () => {
    const [details, setDetails] = useState({
        userName : "",
        password : ""
    })
    const navigate = useNavigate();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
         setDetails(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value
         }))
    }

    const handleSubmit = async(e:React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
         e.preventDefault();
         console.log(details);

         const {data} = await axios.post('http://127.0.0.1:9000/user/signup' , {
            userName : details.userName,
            password : details.password
         })
         
         console.log(data.user);
         navigate('/signin')

    }

  return (
    <div className="w-full h-screen bg-black flex justify-center" >

        <div className="w-1/2 h-1/2 border-2 border-white flex flex-col justify-center gap-2 px-48">
            <h1 className="text-white text-2xl  flex justify-center">Sign Up</h1>
           <input name="userName"  onChange={handleChange} value={details.userName} type="text" className="bg-white rounded-lg px-4 py-1"  placeholder="UserName"/>
           <input name="password" onChange={handleChange} value={details.password} type="password" className="bg-white rounded-lg px-4 py-1"  placeholder="Password" />
           <button onClick={handleSubmit} className="bg-green-300 font-mono text-xl rounded-lg px-4 py-1"> Create Account </button>
        </div>

    </div>
  )
}

export default Signup
