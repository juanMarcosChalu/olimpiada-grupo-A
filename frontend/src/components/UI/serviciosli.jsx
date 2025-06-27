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
    <div key="Servicios" >
      <button className={styles.navbuttons} onClick={() => setOpen(!open)}>
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
