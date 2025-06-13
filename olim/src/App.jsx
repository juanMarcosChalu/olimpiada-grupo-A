import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "./App.css";
import Header from "./components/header.jsx";
import SectionHome from "./components/SectionHome.jsx";
import Carousel from "./components/carusel.jsx";
import Busqueda from "./components/busqueda.jsx";
import Paquetes from "./components/Paquetes.jsx";
import CardPaquetes from "./components/CardPaquetes.jsx";
import Testimonios from "./components/Testimonios.jsx";
import img from './assets/madrid.jpg';
import GridPaquetes from "./components/gridPaquetes.jsx"
import Footer from "./components/Footer.jsx";


function App() {


  const [packages, setPackages] = useState([
    {
      id: 1,
      title: "Paquete a Cancún",
      price: 500,
      description: "Incluye vuelos y hotel por 3 noches.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "Tour por Machu Picchu",
      price: 800,
      description: "Excursión y hotel 2 noches.",
      image: "https://via.placeholder.com/300x200",
    },
  ]);

  const [cart, setCart] = useState([]);

  const handleAddToCart = (pkg) => {
    setCart([...cart, pkg]);
  };

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={
          <>
            <Header />
            <SectionHome />
            <Footer />
          </>
        } />
        <Route path='/Paquetes' element={
          <>
            <Header />
            <SectionHome />
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
