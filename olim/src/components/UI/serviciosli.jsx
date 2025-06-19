// ServiciosMenu.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/header2.module.css";

function ServiciosMenu() {
  const [open, setOpen] = useState(false);
  document.addEventListener("click", (e) => {
    if (!e.target.closest(`.${styles.navbuttons}`)) {
      setOpen(false);
    }
  });
  return (
    <li className={open ? styles.fondoActivo : styles.fondodesactivo} key="Servicios">
      <button className={styles.navbuttons} onClick={() => setOpen(!open)}>
        Servicios
      </button>
      <ul className={`${styles.submenu} ${open ? styles.opacityon : styles.opacityoff}`}>
        <li><Link to="/vuelos">Vuelos</Link></li>
        <li><Link to="/alquileres">Alquileres de auto</Link></li>
        <li><Link to="/alojamiento">Alojamiento</Link></li>
        <li><Link to="/paquetes">Paquetes</Link></li>
        <li><Link to="/asistencia">Asistencia al Viajero</Link></li>
      </ul>
    </li>
  );
}

export default ServiciosMenu;
