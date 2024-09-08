import { Route,Routes } from "react-router-dom";
import './App.css'
import Login from './pages/Login'
import Inicio from "./pages/Inicio";
import Register from './pages/Register'
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import React from 'react'

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Inicio/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/add-product" element={<AddProduct />} />

    </Routes>
  )
}

export default App 