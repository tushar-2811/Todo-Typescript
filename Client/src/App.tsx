import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Landing from './pages/auth/Landing'
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<Signup/>} />

        <Route path='/landing' element={<Landing/>} />
      </Routes>
    </>
  )
}

export default App
