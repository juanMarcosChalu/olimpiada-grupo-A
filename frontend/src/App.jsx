import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
"use client";
import "./App.css";

import AlquilerAutos2 from "./components/sections/alquilerdeautos/AlquilerAutos2.jsx";
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
import Contacto from "./components/sections/contacto/contacto.jsx";
import Login from "./components/sections/login/login.jsx";
import Alojamientos from "./components/sections/alojamientos/Alojamientos.jsx";
import Asistencia from "./components/sections/asistenciaViajero/Asistencia.jsx";
import PoliticaPrivacidad from "./components/sections/politicaprivacidad/PoliticaPrivacidad.jsx";
import TerminosCondiciones from "./components/sections/terminoscondiciones/TerminosCondiciones.jsx";
import ResultadosVuelos from "./components/sections/resultadosvuelos/ResultadosVuelos.jsx";
import Admin from "./components/sections/adminpanel/admin.jsx";
import ComprasDetalles from "./components/sections/adminpanel/comprasdetalles.jsx";
import UsuariosAdmin from "./components/sections/adminpanel/usuariosadmin.jsx";
import AsistenciaAdmin from "./components/sections/adminpanel/detalleasistencia.jsx";
import AdminPaquetes from "./components/sections/adminpanel/paquetesadmin.jsx";

import { Toaster } from "./components/UI/sonner.tsx";
import PaquetesAdmin from "./components/sections/adminpanel/paquetesadmin.jsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster theme="dark" />
      <Routes>
        {/* INICIO */}
        <Route
          path="/"
          element={
            <>
              <Header
                title={<img src={logo} alt="Logo" />}
                menuItems={[<ServiciosMenu key="servicios" />, <Link to="/contacto" key="contacto">Contacto</Link>]}
              />
              <SectionHome />
              <Carousel />
              <Testimonios />
              <Footer />
            </>
          }
        />

        {/* LOGIN / REGISTRO */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* PAQUETES */}
        <Route
          path="/paquetes"
          element={
            <>
              <Header
                title={<h1>Paquetes</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <ServiciosMenu key="servicios" />]}
              />
              <Paquetes />
              <Footer />
            </>
          }
        />
        <Route
          path="/aventura"
          element={
            <>
              <Header
                title={<h1>Paquetes de Aventuras</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <ServiciosMenu key="servicios" />]}
              />
              <GridPaquetes2 type="aventura" />
              <Footer />
            </>
          }
        />
        <Route
          path="/romantico"
          element={
            <>
              <Header
                title={<h1>Paquetes Románticos</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <ServiciosMenu key="servicios" />]}
              />
              <GridPaquetes2 type="romantico" />
              <Footer />
            </>
          }
        />
        <Route
          path="/familiar"
          element={
            <>
              <Header
                title={<h1>Paquetes Familiares</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <ServiciosMenu key="servicios" />]}
              />
              <GridPaquetes2 type="familiar" />
              <Footer />
            </>
          }
        />
        <Route
          path="/relax"
          element={
            <>
              <Header
                title={<h1>Paquetes Relax</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <ServiciosMenu key="servicios" />]}
              />
              <GridPaquetes2 type="relax" />
              <Footer />
            </>
          }
        />
        <Route
          path="/naturaleza"
          element={
            <>
              <Header
                title={<h1>Paquetes Naturaleza</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <ServiciosMenu key="servicios" />]}
              />
              <GridPaquetes2 type="naturaleza" />
              <Footer />
            </>
          }
        />

        {/* NOTIFICACIONES */}
        <Route
          path="/notificaciones"
          element={
            <>
              <Header
                title={<h1>Notificaciones</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <ServiciosMenu key="servicios" />, <Link to="/contacto" key="contacto">Contacto</Link>]}
              />
              <SectionNotificaciones />
              <Footer />
            </>
          }
        />

        {/* CONTACTO */}
        <Route
          path="/contacto"
          element={
            <>
              <Header
                title={<h1>Contacto</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <ServiciosMenu key="servicios" />, <Link to="/contacto" key="contacto">Contacto</Link>]}
              />
              <Contacto />
              <Footer />
            </>
          }
        />

        {/* FAVORITOS */}
        <Route
          path="/favoritos"
          element={
            <>
              <Header
                title={<h1>♥ Mis Favoritos</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <ServiciosMenu key="servicios" />, <Link to="/contacto" key="contacto">Contacto</Link>]}
              />
              <SectionFav />
              <Footer />
            </>
          }
        />

        {/* BUSQUEDA DE VUELOS */}
        <Route
          path="/vuelos"
          element={
            <>
              <Header
                title={<h1>Vuelos</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <ServiciosMenu key="servicios" />, <Link to="/contacto" key="contacto">Contacto</Link>]}
              />
              <Busqueda />
              <Footer />
            </>
          }
        />

        {/* RESULTADOS DE VUELOS */}
        <Route
          path="/resultadosvuelos"
          element={
            <>
              <Header
                title={<h1>Resultados de Vuelos</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <ServiciosMenu key="servicios" />, <Link to="/contacto" key="contacto">Contacto</Link>]}
              />
              <ResultadosVuelos />
              <Footer />
            </>
          }
        />

        {/* ALQUILER DE AUTOS */}
        <Route
          path="/alquileres"
          element={
            <>
              <Header
                title={<h1>Alquileres de Auto</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <ServiciosMenu key="servicios" />, <Link to="/contacto" key="contacto">Contacto</Link>]}
              />
              <AlquilerAutos2 />
              <Footer />
            </>
          }
        />

        {/* ALOJAMIENTOS */}
        <Route
          path="/alojamiento"
          element={
            <>
              <Header
                title={<h1>Alojamientos</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <ServiciosMenu key="servicios" />, <Link to="/contacto" key="contacto">Contacto</Link>]}
              />
              <Alojamientos />
              <Footer />
            </>
          }
        />

        {/* PERFIL */}
        <Route
          path="/perfil"
          element={
            <>
              <Header
                title={<h1>Perfil</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <ServiciosMenu key="servicios" />, <Link to="/contacto" key="contacto">Contacto</Link>]}
              />
              <Perfil />
              <Footer />
            </>
          }
        />

        {/* POLÍTICA DE PRIVACIDAD */}
        <Route
          path="/politica-privacidad"
          element={
            <>
              <Header
                title={<h1>Política de Privacidad</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <ServiciosMenu key="servicios" />, <Link to="/contacto" key="contacto">Contacto</Link>]}
              />
              <PoliticaPrivacidad />
              <Footer />
            </>
          }
        />

        {/* TÉRMINOS Y CONDICIONES */}
        <Route
          path="/terminos-condiciones"
          element={
            <>
              <Header
                title={<h1>Términos y Condiciones</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <ServiciosMenu key="servicios" />, <Link to="/contacto" key="contacto">Contacto</Link>]}
              />
              <TerminosCondiciones />
              <Footer />
            </>
          }
        />

        {/* ASISTENCIA */}
        <Route
          path="/asistencia"
          element={
            <>
              <Header
                title={<h1>Asistencia al Viajero</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <ServiciosMenu key="servicios" />, <Link to="/contacto" key="contacto">Contacto</Link>]}
              />
              <Asistencia />
              <Footer />
            </>
          }
        />

        {/* CARRITO */}
        <Route
          path="/carritoPage"
          element={
            <>
              <Header
                title={<h1>Tu carrito de compras</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <ServiciosMenu key="servicios" />, <Link to="/contacto" key="contacto">Contacto</Link>]}
              />
              <SectionsCarrito />
              <Footer />
            </>
          }
        />

        {/* ADMIN PANEL */}
        <Route
          path="/admin"
          element={
            <>
              <Header
                title={<h1>Panel de Administrador</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <Link to="/admin" key="admin">Admin</Link>]}
              />
              <Admin />
              <Footer />
            </>
          }
        />

        <Route
          path="/admin/compras"
          element={
            <>
              <Header
                title={<h1>Compras Administrador</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <Link to="/admin" key="admin">Admin</Link>]}
              />
              <ComprasDetalles />
              <Footer />
            </>
          }
        />

        <Route
          path="/admin/usuarios"
          element={
            <>
              <Header
                title={<h1>Usuarios Administrador</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <Link to="/admin" key="admin">Admin</Link>]}
              />
              <UsuariosAdmin />
              <Footer />
            </>
          }
        />

          <Route
          path="/admin/asistencia"
          element={
            <>
              <Header
                title={<h1>Asistencia Administrador</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <Link to="/admin" key="admin">Admin</Link>]}
              />
              <AsistenciaAdmin />
              <Footer />
            </>
          }
        />

        <Route
          path="/admin/paquetes"
          element={
            <>
              <Header
                title={<h1>Paquetes Administrador</h1>}
                menuItems={[<Link to="/" key="inicio">Inicio</Link>, <Link to="/admin" key="admin">Admin</Link>]}
              />
              <PaquetesAdmin />
              <Footer />
            </>
          }
        />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
