import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/header2.module.css";
import ServiciosMenu from "../UI/serviciosli.jsx";
import UsuarioMenu from "../UI/UserMenu.jsx";
import SvgCarrito from "../UI/SvgCarrito.jsx";

function Header({ title, menuItems = [], backgroundColorProp }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);

  function toggleMenu() {
    if (menuOpen) setServiciosOpen(false);
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
    setServiciosOpen(false);
  }

  return (
    <header className={styles.header} style={{ backgroundColor: backgroundColorProp }}>
      <div className={styles.logocontainer}>{title}</div>

      {/* Botón hamburguesa que se transforma en cruz */}
      <div
        className={`${styles.hamburguesa} ${menuOpen ? styles.open : ""}`}
        onClick={toggleMenu}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") toggleMenu();
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={styles.navigation}>
        <ul className={styles.navigationList}>
          {menuItems.map((item, index) =>
            item.key === "servicios" ? (
              <li key={index} className={styles.navbarPc}>
                <ServiciosMenu />
              </li>
            ) : (
              <li key={index} className={`${styles.navbuttons} ${styles.navbarPc}`}>
                {item}
              </li>
            )
          )}

          <li className={styles.navbarPc}>
            <Link to="/carritoPage">
              <SvgCarrito />
            </Link>
          </li>
          <li className={styles.navbarPc}>
            <UsuarioMenu />
          </li>
        </ul>
      </nav>

      {/* Menú lateral hamburguesa */}
      <div className={`${styles.navbarLinks} ${menuOpen ? styles.active : ""}`}>
        <Link to="/" onClick={closeMenu}>Inicio</Link>

        <div className={styles.mobileSubmenuContainer}>
          <button
            className={styles.mobileSubmenuTitle}
            onClick={() => setServiciosOpen(!serviciosOpen)}
            aria-expanded={serviciosOpen}
            aria-controls="submenu-servicios"
          >
            Servicios {serviciosOpen ? "▲" : "▼"}
          </button>
          {serviciosOpen && (
            <ul id="submenu-servicios" className={styles.mobileSubmenu}>
              <li><Link to="/vuelos" onClick={closeMenu}>Vuelos</Link></li>
              <li><Link to="/alquileres" onClick={closeMenu}>Alquiler de autos</Link></li>
              <li><Link to="/alojamiento" onClick={closeMenu}>Alojamientos</Link></li>
              <li><Link to="/paquetes" onClick={closeMenu}>Paquetes</Link></li>
              <li><Link to="/asistencia" onClick={closeMenu}>Asistencia al viajero</Link></li>
            </ul>
          )}
        </div>

        <Link to="/contacto" onClick={closeMenu}>Contacto</Link>
      </div>
    </header>
  );
}

export default Header;
