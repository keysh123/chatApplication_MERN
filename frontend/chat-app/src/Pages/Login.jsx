import React , {useEffect, useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { loginRoute } from '../utils/APIRoutes'
import { toast } from "react-toastify";
function Login() {
  useEffect(()=>{
    if(sessionStorage.getItem('User')){
      navigate('/')
    }
  },[])
  const navigate = useNavigate()
  const [user , setUser] = useState({
    userName : "",
    password : ""
  })
  const handleSubmit = async (event) =>{
    event.preventDefault()
    try{
    const {userName , password} = user

    const response = await fetch(loginRoute,{
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, password }),

    })
    const data = await response.json()
    if(data.status === false){
      toast.error(data.message || "Error in login")
    }
    else{
      toast.success("Login successful")
      sessionStorage.setItem('User', JSON.stringify(data.user))
      navigate("/")
      
    }
  }
  catch(error){
    console.log("error ",error)
  }
  }
  const handleChange = (event) =>{
    setUser({...user,[event.target.name] : event.target.value })
  }
  return (
    <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Sign In</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            name='userName'
            onChange={handleChange}
          />
         
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            name='password'
            onChange={handleChange}
          />
        

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
    </>
  )
}

export default Login