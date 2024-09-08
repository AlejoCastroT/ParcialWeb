import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerService = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      lastname: lastname,
      email: email,
      password: password
    };

    try {
      const response = await axios.post(
        "https://parcial.nucleoslabs.com.co/api/v1/usuarios/registrar",
        data
      );

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User registered successfully!',
          background: '#eaf0f6',
          confirmButtonColor: '#8dc63f'
        });
        navigate("/dashboard");
      }
    } catch (err) {
      let message = 'An error occurred. Please try again later.';
      if (err.response) {
        message = `Error ${err.response.status}: ${err.response.data.message || 'User registration failed.'}`;
      } else if (err.request) {
        message = 'No response received from the server.';
      } else {
        message = `Request error: ${err.message}`;
      }

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: message,
        background: '#fbe8e8',
        confirmButtonColor: '#f27474'
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h5 className="font-bold text-2xl text-gray-800 text-center mb-6">Register</h5>
        <form onSubmit={registerService}>
          <input
            type='text'
            placeholder='Name'
            className='w-full p-3 border-2 border-gray-300 rounded-lg mb-4'
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <input
            type='text'
            placeholder='Lastname'
            className='w-full p-3 border-2 border-gray-300 rounded-lg mb-4'
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            required
          />
          <input
            type='email'
            placeholder='Email'
            className='w-full p-3 border-2 border-gray-300 rounded-lg mb-4'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type='password'
            placeholder='Password'
            className='w-full p-3 border-2 border-gray-300 rounded-lg mb-6'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button
            type="submit"
            className='w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-300 transition-all'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
