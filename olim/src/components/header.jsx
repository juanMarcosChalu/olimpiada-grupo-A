import React from "react";
import "../styles/header.css"; // Import the CSS file for styling
import logo from "../assets/Logo.png"; // Import the logo image
function Header() {
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
          <li><a href="#home">Destinos</a></li>
          <li><a href="#packages">Paquetes</a></li>
          <li><a href="#about">Nosotros</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}


export default Header;