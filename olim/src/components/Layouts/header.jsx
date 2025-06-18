import { useState } from 'react';
import React from "react";
import styles from "../../styles/header2.module.css"; // estilos
import { Link } from "react-router-dom";
import ServiciosMenu from "../UI/serviciosli.jsx";
import UsuarioMenu from '../UI/UserMenu.jsx';
import SvgCarrito from '../UI/SvgCarrito.jsx';
function Header({ title, menuItems = [] }) {

  const [userOpen, setUserOpen] = useState(false);
 
  return (
    <header className={styles.header}>
      <div className={styles.logocontainer}>{title}</div>
      <nav className={styles.navigation}>
        <ul className={styles.navigationList}>
         {menuItems.map((item, index) =>
         
    item.key === "servicios" ? (
     
      // Este ya devuelve <li>, no lo envuelvas en otro
      <ServiciosMenu key={index} />
    ) : (
      // Este sí necesita <li> si es un <Link> o similar
      <li key={index} className={styles.navbuttons}>{item}</li>
    )
  )}

          {/* Icono usuario fijo al final */}
          <SvgCarrito />
          <UsuarioMenu></UsuarioMenu>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
