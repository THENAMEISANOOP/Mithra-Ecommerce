import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

useEffect(() => {
  if (token || localStorage.getItem("token")) {
    navigate('/');
  }
}, [token, navigate]);

const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    if (currentState === 'Sign Up') {
      const response = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        email,
        password,
      });
      console.log('Sign Up response:', response.data);
      // Optionally navigate after signup or ask user to login
    } else {
      const response = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Save token persistently
        setToken(response.data.token);
        navigate('/');
      } else {
        toast.error('Login failed: No token received');
      }
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    // toast.error('Error submitting form');
  }
};



  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md
                 sm:p-8 sm:mt-20"
    >
      <div className="mb-6 text-center">
        <p className="text-2xl font-semibold text-gray-800">{currentState}</p>
        <hr className="mt-2 border-primary-600 w-16 mx-auto" />
      </div>

      {currentState === 'Sign Up' && (
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-primary-600
                     focus:border-primary-600 transition"
        />
      )}

      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-primary-600
                   focus:border-primary-600 transition"
      />

      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-primary-600
                   focus:border-primary-600 transition"
      />

      <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
        <p className="cursor-pointer hover:text-primary-600 transition">
          Forgot Your Password?
        </p>
        {currentState === 'Sign Up' ? (
          <button
            type="button"
            onClick={() => setCurrentState('Login')}
            className="text-primary-600 font-semibold hover:underline"
          >
            Login
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrentState('Sign Up')}
            className="text-primary-600 font-semibold hover:underline"
          >
            Sign Up
          </button>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-primary-600 text-white font-semibold rounded-md
                   hover:bg-primary-700 transition"
      >
        {currentState === 'Sign Up' ? 'Sign Up' : 'Login'}
      </button>
    </form>
  )
}

export default Login
