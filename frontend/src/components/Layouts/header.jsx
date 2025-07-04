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

      {/* Botón hamburguesa */}
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
              <li><Link to="/proteccion" onClick={closeMenu}>Protección viajera</Link></li>
            </ul>
          )}
        </div>

        {/* Carrito justo debajo de servicios */}
        <Link to="/carritoPage" onClick={closeMenu} className={styles.hamburguesaItem}>
          <span>Carrito</span>
        </Link>

        <Link to="/contacto" onClick={closeMenu}>Contacto</Link>

        {/* Iniciar sesión y registro al final */}
        <div className={styles.menuBottom}>
          <Link to="/login" onClick={closeMenu} className={styles.hamburguesaItem}>
            <span>Iniciar sesión</span>
          </Link>

          <Link to="/registro" onClick={closeMenu} className={styles.hamburguesaItem}>
            <span>Registrarse</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
