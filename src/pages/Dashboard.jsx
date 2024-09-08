// src/components/Products.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

// Asegúrate de que el modal se puede utilizar en el entorno del navegador
Modal.setAppElement('#root');

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://parcial.nucleoslabs.com.co/api/v1/productos/listar');
        if (response.status === 200) {
          setProducts(response.data.result || []);
          setLoading(false);
        } else {
          throw new Error(`Unexpected status code: ${response.status}`);
        }
      } catch (err) {
        console.error('Error al cargar los productos:', err.response || err.message);
        setError('Error al cargar los productos');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProductId) {
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(`https://parcial.nucleoslabs.com.co/api/v1/productos/listar/${selectedProductId}`);
          if (response.status === 200) {
            setSelectedProduct(response.data.result || {});
          } else {
            throw new Error(`Unexpected status code: ${response.status}`);
          }
        } catch (err) {
          console.error('Error al cargar los detalles del producto:', err.response || err.message);
          setError('Error al cargar los detalles del producto');
        }
      };

      fetchProductDetails();
    }
  }, [selectedProductId]);

  const openModal = (productId) => {
    setSelectedProductId(productId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProductId(null);
    setSelectedProduct(null);
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Listado de Productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="text-center col-span-full">No hay productos disponibles.</p>
        ) : (
          products.map(product => (
            <div
              key={product._id}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => openModal(product._id)}
            >
              <img
                src={product.image || 'https://via.placeholder.com/300x200'}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-xl font-bold text-gray-800">{`$${product.price}`}</p>
              </div>
            </div>
          ))
        )}
        <div className="  rounded-lg overflow-hidden flex items-center justify-center">
          <Link to="/add-product" className="p-4 text-center w-full bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-all">
            <h3 className="text-lg font-semibold mb-4">Agregar Producto</h3>
          </Link>
        </div>
      </div>

      {selectedProduct && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Detalles del Producto"
          className="fixed inset-0 flex items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-70"
        >
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-auto p-6 relative">
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600 focus:outline-none transition-colors"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <img
                src={selectedProduct.image || 'https://via.placeholder.com/400x300'}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-lg mb-4 shadow-md"
              />
              <h2 className="text-3xl font-bold mb-2 text-gray-800">{selectedProduct.name}</h2>
              <p className="text-lg mb-2 text-gray-600">{selectedProduct.description}</p>
              <p className="text-xl font-semibold text-gray-900">{`$${selectedProduct.price}`}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Dashboard;
