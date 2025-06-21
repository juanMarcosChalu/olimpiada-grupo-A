import { useState } from 'react';
import React from "react";
import styles from "../../styles/header2.module.css"; // estilos
import { Link } from "react-router-dom";
import ServiciosMenu from "../UI/serviciosli.jsx";
import UsuarioMenu from '../UI/UserMenu.jsx';
import SvgCarrito from '../UI/SvgCarrito.jsx';
function Header({ title, menuItems = [], backgroundColorProp }) {

  const [userOpen, setUserOpen] = useState(false);

  return (
    <header className={styles.header} style={{ backgroundColor: backgroundColorProp }}>
      <div className={styles.logocontainer}>{title}</div>
      <nav className={styles.navigation}>
        <ul className={styles.navigationList}>
          {menuItems.map((item, index) =>

            item.key === "servicios" ? (

              // Este ya devuelve <li>, no lo envuelvas en otro
                <li className={styles.navbarPc}> <ServiciosMenu key={index}  /></li>
             
            ) : (
              // Este sí necesita <li> si es un <Link> o similar
              <li key={index} className={`${styles.navbuttons} ${styles.navbarPc}`}>{item}</li>
            )
          )}

          {/* Icono usuario fijo al final */}
          <li className={styles.navbarPc}>
            <SvgCarrito />
          </li>
          <li className={styles.navbarPc}>
            <UsuarioMenu />
          </li>
          <div
            className={`${styles.hamburguesa} ${userOpen ? styles.open : ""}`}
            onClick={() => setUserOpen(!userOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={`${styles.navbarLinks} ${userOpen ? styles.active : ""}`}>
            <a href="#inicio">Inicio</a>
            <a href="#servicios">Servicios</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#contacto">Contacto</a>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
