import React, { useState } from 'react';
import { auth } from './FirebaseComponent';
import HoverButton from './HoverButton';
import config from '../assets/config';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('User logged in successfully');
    } catch (err) {
      setError(err.message);
      console.error('Error logging in:', err);
    }
  };
  return (
    <div>
        <form onSubmit={handleLogin}  class="pointer-events-none inset-y-0 left-0 flex flex-col items-center pl-3">
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
        <div class="relative mt-2 rounded-md shadow-sm">
            <input 
                type="email" 
                name="email" 
                id="email" 
                class="block w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
        <div class="relative mt-2 rounded-md shadow-sm">
            <input 
                type="password" 
                name="password" 
                id="password" 
                class="block w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                placeholder="enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
        </div>
        {error && <p className='text-red-300'>{error}</p>}
        <HoverButton  config={config} type="submit">Login</HoverButton>
        </form>
    </div>
);
};

export default Login;
