import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/header2.module.css";

function ServiciosMenu() {
  const [open, setOpen] = useState(false);

  // Cerrar submenu si clickeas fuera
  useEffect(() => {
    function handleClickOutside(event) {
      // Si el clic no es dentro del botón o menú, cerramos
      if (
        !event.target.closest(`.${styles.navbuttons}`) &&
        !event.target.closest(`.${styles.userBox}`)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={styles["servicios-container"]}>
      <button
        className={styles.navbuttons}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Servicios
      </button>

      {open && (
        <div className={styles.userBox}>
          <ul className={styles.options}>
            <Link to="/vuelos">
              <li>Vuelos</li>
            </Link>
            <Link to="/Alquileres">
              <li>Alquileres de autos</li>
            </Link>
            <Link to="/Alojamiento">
              <li>Alojamientos</li>
            </Link>
            <Link to="/Paquetes">
              <li>Paquetes</li>
            </Link>
            <Link to="/Asistencia">
              <li>Asistencia al Viajero</li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ServiciosMenu;
