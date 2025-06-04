import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPasword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="animate-fade-in transition-all duration-500 flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-20 gap-4 bg-white p-6 rounded-md shadow-lg text-gray-800"
    >
      <div className="flex items-center gap-2 mb-2 mt-4">
        <p className="text-3xl font-semibold transition-all duration-300">{currentState}</p>
        <hr className="border-none h-[2px] w-8 bg-gray-800" />
      </div>

      {/* Name Input with smooth show/hide */}
      {currentState === 'Sign Up' && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-4 py-2 border border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
          placeholder="Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-4 py-2 border border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPasword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-4 py-2 border border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm text-gray-600">
        {/* <p className="cursor-pointer hover:underline">Forgot your password?</p> */}
        {currentState === 'Login' ? (
          <p
            onClick={() => setCurrentState('Sign Up')}
            className="cursor-pointer hover:underline transition-all"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState('Login')}
            className="cursor-pointer hover:underline transition-all"
          >
            Login Here
          </p>
        )}
      </div>

      <button
        className="bg-black text-white w-full py-2 mt-2 rounded hover:bg-gray-900 transition-all duration-300"
        type="submit"
      >
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>

      {/* Custom fade-in animation using Tailwind */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fadeIn 0.6s ease-out;
          }
        `}
      </style>
    </form>
  );
};

export default Login;
