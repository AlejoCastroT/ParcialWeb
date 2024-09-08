// src/components/AddProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    marca: '',
    image: '',
    price: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
        console.log('Enviando datos:', newProduct);
      const response = await axios.post(
        'https://parcial.nucleoslabs.com.co/api/v1/productos/registrar',
        newProduct,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Producto agregado exitosamente!',
          background: '#eaf0f6',
          confirmButtonColor: '#8dc63f'
        });
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err); // Para depuración
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Error al agregar el producto.',
        background: '#fbe8e8',
        confirmButtonColor: '#f27474'
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Agregar Nuevo Producto</h2>
      <form onSubmit={addProduct} className="max-w-lg mx-auto flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={newProduct.name}
          onChange={handleInputChange}
          className="border-2 border-gray-300 rounded-lg p-2"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={newProduct.description}
          onChange={handleInputChange}
          className="border-2 border-gray-300 rounded-lg p-2"
          required
        />
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          value={newProduct.marca}
          onChange={handleInputChange}
          className="border-2 border-gray-300 rounded-lg p-2"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL de Imagen"
          value={newProduct.image}
          onChange={handleInputChange}
          className="border-2 border-gray-300 rounded-lg p-2"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={newProduct.price}
          onChange={handleInputChange}
          className="border-2 border-gray-300 rounded-lg p-2"
          required
        />
        <button
          type="submit"
          className="mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-400 transition-all"
        >
          Agregar
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
