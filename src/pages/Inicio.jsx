import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/inicio.png'; // asegúrate de que la importación sea correcta

function Inicio() {
  return (
    <div className="flex h-screen">
           <div 
        className="w-4/5 bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
      >
      </div>
      <div className="w-1/2 flex justify-center items-center bg-[#f0f4f8]">
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-6xl font-bold mb-8 text-center text-gray-800">Welcome</h1>
          <h4 className='text-center mb-12'>Log in or register</h4>
          <Link 
            to={'/login'} 
            className="block w-full bg-blue-300 text-gray-800 py-3 rounded-lg text-lg text-center hover:bg-blue-200 transition-all mb-4"
          >
            Login
          </Link>
          <Link 
            to={'/register'} 
            className="block w-full bg-green-300 text-gray-800 py-3 rounded-lg text-lg text-center hover:bg-green-200 transition-all"
          >
            Register
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Inicio;
