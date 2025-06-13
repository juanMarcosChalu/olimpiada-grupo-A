import React, { useState } from "react";
import "../styles/header.css"; // Import the CSS file for styling
import logo from "../assets/Logo.png"; // Import the logo image
function Header() {
   const [showSubmenu, setShowSubmenu] = useState(false);

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };
  return (
    <header className="header">
        <div className="logo-container">
            <img
            src={logo}
            alt="Logo de la empresa"
            className="logo"
            />
        </div>
      <nav className="navigation">
        <ul>
         
           <li className={showSubmenu ? 'fondoActivo' : ''}>
          <button className={`nav-buttons`} onClick={toggleSubmenu}>
            Servicios
          </button>
          {showSubmenu && (
            <ul className="submenu">
              <li><a href="#web">Vuelos</a></li>
              <li><a href="#seo">Alquileres de auto</a></li>
              <li><a href="#marketing">Alojamiento</a></li>
               <li><a href="#marketing">Paquetes</a></li>
            </ul>
          )}
        </li>
        <li>
          <a href="#contact" className="nav-buttons">Contacto</a>
        </li>
        </ul>
      </nav>
    </header>
  );
}


export default Header;