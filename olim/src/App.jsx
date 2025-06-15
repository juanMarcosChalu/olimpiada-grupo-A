import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import "./App.css";

import SectionHome from "./components/sections/home/SectionHome.jsx";
import Carousel from "./components/sections/carusel/carusel.jsx";
import Busqueda from "./components/sections/busqueda/busqueda.jsx";
import Paquetes from "./components/sections/paquetes/Paquetes.jsx";
import logo from "./assets/Logo.png";

import Testimonios from "./components/sections/testimonio/Testimonios.jsx";
import img from './assets/madrid.jpg';
import GridPaquetes from "./components/sections/paquetes/gridPaquetes.jsx"
import Footer from "./components/Layouts/Footer.jsx";
import TestimonialCard from "./components/sections/testimonio/TestimonioCard.jsx";
import Header from "./components/Layouts/header.jsx";
import ServiciosMenu from "./components/UI/serviciosli.jsx";
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
  const navigation = [
    {
      label: 'Inicio',
      to: '/'
    },
    {
      label: 'Servicios',
      submenu: [
        { label: 'Vuelos', to: '/vuelos' },
        { label: 'Alquileres de auto', to: '/alquileres' },
        { label: 'Alojamiento', to: '/alojamiento' }
      ]
    }
  ];

  const [cart, setCart] = useState([]);

  const handleAddToCart = (pkg) => {
    setCart([...cart, pkg]);
  };

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={
          <>
            {/* {index} */}

            <Header
              title={<img src={logo} alt="Logo" />}
              menuItems={[
                <ServiciosMenu key="servicios" />,
                <Link to="/contacto" key="contacto">Contacto</Link>,
                <Link to="/blog" key="blog">Blog</Link>,
              ]}
            />

            <SectionHome />
            <Carousel />
            <Testimonios />
            <Header
              title={<h1>Paquetes</h1>}
              menuItems={[
                <Link>Inicio</Link>,
                <ServiciosMenu key="servicios" />,
              ]}
            />
            <Paquetes />
            <GridPaquetes />

            <Testimonios />
           


            <Footer />
          </>
        } />
        <Route path='/Paquetes' element={
          <>
            
            <SectionHome />
            <Footer />
          </>
        } />
        <Route path='/Vuelos' element={
          <>
            <Busqueda></Busqueda>
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
