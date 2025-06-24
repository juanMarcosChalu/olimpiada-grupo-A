import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import "./App.css";

import SectionHome from "./components/sections/home/SectionHome.jsx";
import Carousel from "./components/sections/carusel/carusel.jsx";
import Busqueda from "./components/sections/busqueda/busqueda.jsx";
import Paquetes from "./components/sections/paquetes/Paquetes.jsx";
import logo from "./assets/Logo.png";
import Testimonios from "./components/sections/testimonio/Testimonios.jsx";
import GridPaquetes2 from "./components/sections/paquetes/gridcopia.jsx";
import Footer from "./components/Layouts/Footer.jsx";
import Header from "./components/Layouts/header.jsx";
import ServiciosMenu from "./components/UI/serviciosli.jsx";
import Perfil from "./components/sections/perfilc/Perfil.jsx";
import SectionFav from "./components/sections/favoritos/SectionsFavoritos.jsx";
import SectionNotificaciones from "./components/sections/notificaciones/SectionNotificaciones.jsx";
import Registro from "./components/sections/login/Registro.jsx";
import SectionsCarrito from "./components/sections/carrito/SectionsCarrito.jsx";
import Contacto from "./components/sections/contactanos/contacto.jsx";
import Login from "./components/sections/login/login.jsx";
import Alojamientos from "./components/sections/alojamientos/Alojamientos.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <>
            <Header
              title={<img src={logo} alt="Logo" />}
              menuItems={[
                <ServiciosMenu key="servicios" />,
                <Link to="/contacto" key="contacto">Contacto</Link>,
              ]}
            />
            <SectionHome />
            <Carousel />
            <Testimonios />
            <Login />
            <Registro />
            <SectionsCarrito />
            <Footer />
          </>
        } />

        <Route path='/paquetes' element={
          <>
            <Header
              title={<h1>Paquetes</h1>}
              menuItems={[
                <Link to="/" key="inicio">Inicio</Link>,
                <ServiciosMenu key="servicios" />,
              ]}
            />
            <Paquetes />
            <Header
              title={<h1>Paquetes Románticos</h1>}
              menuItems={[
                <Link to="/" key="inicio">Inicio</Link>,
                <ServiciosMenu key="servicios" />,
              ]}
            />
            <GridPaquetes2 />
            <Footer />
          </>
        } />

        <Route path='/notificaciones' element={
          <>
            <Header
              title={<h1>Notificaciones</h1>}
              menuItems={[
                <Link to="/" key="inicio">Inicio</Link>,
                <ServiciosMenu key="servicios" />,
                <Link to="/contacto" key="contacto">Contacto</Link>,
              ]}
            />
            <SectionNotificaciones />
            <Footer />
          </>
        } />

        <Route path='/contacto' element={
          <>
            <Header
              title={<h1>Contáctanos</h1>}
              menuItems={[
                <Link to="/" key="inicio">Inicio</Link>,
                <ServiciosMenu key="servicios" />,
                <Link to="/contacto" key="contacto">Contacto</Link>,
              ]}
            />
            <Contacto />
            <Footer />
          </>
        } />

        <Route path='/favoritos' element={
          <>
            <Header
              title={<h1>♥ Mis Favoritos</h1>}
              menuItems={[
                <Link to="/" key="inicio">Inicio</Link>,
                <ServiciosMenu key="servicios" />,
                <Link to="/contacto" key="contacto">Contacto</Link>,
              ]}
            />
            <SectionFav />
            <Footer />
          </>
        } />

        {/* Rutas Servicios */}
        <Route path='/vuelos' element={
          <>
            <Header
              title={<h1>Vuelos</h1>}
              menuItems={[
                <Link to="/" key="inicio">Inicio</Link>,
                <ServiciosMenu key="servicios" />,
              ]}
            />
            <Busqueda />
            <Footer />
          </>
        } />

        <Route path='/alquileres' element={
          <>
            <Header
              title={<h1>Alquileres de Auto</h1>}
              menuItems={[
                <Link to="/" key="inicio">Inicio</Link>,
                <ServiciosMenu key="servicios" />,
              ]}
            />
            {/* Aquí puedes poner tu componente para alquileres */}
            <Footer />
          </>
        } />

        <Route path='/alojamiento' element={
          <>
            <Header
              title={<h1>Alojamientos</h1>}
              menuItems={[
                <Link to="/" key="inicio">Inicio</Link>,
                <ServiciosMenu key="servicios" />,
                <Link to="/contacto" key="contacto">Contacto</Link>,
              ]}
            />
            <Alojamientos />
            <Footer />
          </>
        } />

        <Route path='/perfil' element={
          <>
            <Header
              title={<h1>Perfil</h1>}
              menuItems={[
                <Link to="/" key="inicio">Inicio</Link>,
                <ServiciosMenu key="servicios" />,
                <Link to="/contacto" key="contacto">Contacto</Link>,
              ]}
            />
            <Perfil />
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
