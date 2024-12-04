import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { db } from '../Constant';
import axios from 'axios'

function Login() {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(!username || !password) {
      alert("All Field Required")
      return 
    }
    try {
      const response = await axios.post(
        `${db}/user/login`,
        {
          username,
          password
        },
        {
          withCredentials : true
        }
      )

      const userInfo = await axios.get(
        `${db}/user/getUserInfo/${username}`,
        {withCredentials : true}
      )
      console.log(userInfo.data)
      localStorage.setItem("user",JSON.stringify(userInfo.data.user))
      navigate("/chat")
    } catch (error) { 
      console.error("Error in login of user",error)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#392a35]">
      <div className="bg-[#fcd4dc] p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;