import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginService = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post(
        'https://parcial.nucleoslabs.com.co/api/v1/usuarios/login',
        data,
      );

      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Login successful',
          icon: 'success',
          confirmButtonText: 'OK',
          background: '#eaf0f6',
          confirmButtonColor: '#8dc63f'
        });
        navigate("/dashboard");
      }
    } catch (err) {
      let message = 'An error occurred. Please try again later.';
      if (err.response) {
        message = `Error ${err.response.status}: ${err.response.data.message}`;
      } else if (err.request) {
        message = 'No response received from the server.';
      } else {
        message = `Request error: ${err.message}`;
      }

      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK',
        background: '#fbe8e8',
        confirmButtonColor: '#f27474'
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h5 className="font-bold text-2xl text-gray-800 text-center mb-6">Login</h5>
        <form onSubmit={loginService}>
          <input
            type="text"
            placeholder="Email"
            className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border-2 border-gray-300 rounded-lg mb-6"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-300 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
