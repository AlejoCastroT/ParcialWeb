import React from 'react';
import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <div className='flex justify-center items-center flex-col' style={{ height: '100vh', backgroundColor: '#f0f4f8' }}>
      <div className='w-80 p-6 bg-white shadow-lg rounded-lg'>
        <h1 className='text-3xl font-semibold mb-8 text-center text-gray-800'>Welcome</h1>
        <Link 
          to={'/login'} 
          className='block w-full bg-blue-300 text-gray-800 py-3 rounded-lg text-lg text-center hover:bg-blue-200 transition-all mb-4'
        >
          Login
        </Link>
        <Link 
          to={'/register'} 
          className='block w-full bg-green-300 text-gray-800 py-3 rounded-lg text-lg text-center hover:bg-green-200 transition-all'
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Inicio;
