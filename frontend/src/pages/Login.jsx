import React, { useState } from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up')

  const onSubmitHandler = (e) => {
    e.preventDefault();
  }

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
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-primary-600
                     focus:border-primary-600 transition"
        />
      )}

      <input
        type="email"
        placeholder="Email"
        required
        className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-primary-600
                   focus:border-primary-600 transition"
      />

      <input
        type="password"
        placeholder="Password"
        required
        className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-primary-600
                   focus:border-primary-600 transition"
      />

      <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
        <p className="cursor-pointer hover:text-primary-600 transition">Forgot Your Password?</p>
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
