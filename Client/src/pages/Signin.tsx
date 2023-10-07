import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Signin = () => {
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

         const {data} = await axios.post('http://127.0.0.1:9000/user/login' , {
            userName : details.userName,
            password : details.password
         })

         console.log(data);
         localStorage.setItem('token' , data.token);
         navigate('/landing')
    }

  return (
    <div className="w-full h-screen bg-black flex justify-center" >

    <div className="w-1/2 h-1/2 border-2 border-white flex flex-col justify-center gap-2 px-48">
        <h1 className="text-white text-2xl  flex justify-center">Sign In</h1>
       <input onChange={handleChange} name='userName' type="text" className="bg-white rounded-lg px-4 py-1"  placeholder="UserName"/>
       <input onChange={handleChange} name='password' type="password" className="bg-white rounded-lg px-4 py-1"  placeholder="Password" />
       <button onClick={handleSubmit} className="bg-green-300 font-mono text-xl rounded-lg px-4 py-1"> Sign In </button>
    </div>

</div>
  )
}

export default Signin
