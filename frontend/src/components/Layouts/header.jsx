import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/header2.module.css";
import ServiciosMenu from "../UI/serviciosli.jsx";
import UsuarioMenu from "../UI/UserMenu.jsx";
import SvgCarrito from "../UI/SvgCarrito.jsx";

function Header({ title, menuItems = [], backgroundColorProp }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);

  // Cerrar submenu servicios si se cierra el menú hamburguesa
  function toggleMenu() {
    if (menuOpen) setServiciosOpen(false);
    setMenuOpen(!menuOpen);
  }

  return (
    <header className={styles.header} style={{ backgroundColor: backgroundColorProp }}>
      <div className={styles.logocontainer}>{title}</div>

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
            <Link to="/carrito">
              <SvgCarrito />
            </Link>
          </li>
          <li className={styles.navbarPc}>
            <UsuarioMenu />
          </li>

          {/* Botón hamburguesa - solo visible en mobile */}
          <div
            className={`${styles.hamburguesa} ${menuOpen ? styles.open : ""}`}
            onClick={toggleMenu}
            aria-label="Abrir menú"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if(e.key === "Enter") toggleMenu(); }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Menú hamburguesa lateral */}
          <div className={`${styles.navbarLinks} ${menuOpen ? styles.active : ""}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>

            {/* Submenu Servicios móvil */}
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
                  <li><Link to="/vuelos" onClick={() => setMenuOpen(false)}>Vuelos</Link></li>
                  <li><Link to="/alquileres" onClick={() => setMenuOpen(false)}>Alquiler de autos</Link></li>
                  <li><Link to="/alojamiento" onClick={() => setMenuOpen(false)}>Alojamientos</Link></li>
                  <li><Link to="/paquetes" onClick={() => setMenuOpen(false)}>Paquetes</Link></li>
                  <li><Link to="/asistencia" onClick={() => setMenuOpen(false)}>Asistencia al viajero</Link></li>
                </ul>
              )}
            </div>

            <Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
