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
                              <Link to="/perfil">
                                  <li><span className={`${styles.icon} material-symbols-outlined`}>person</span>Vuelos</li>
                              </Link>
                              <Link to="/Favoritos">
                                  <li><span className={`${styles.icon} material-symbols-outlined`}>favorite</span>Alquileres de auto</li>
                              </Link>
                              <Link to="/Notificaciones">
                                  <li><span className={`${styles.icon} material-symbols-outlined`}>notifications</span>alojamiento</li>
                              </Link>
                              <Link to="/Notificaciones">
                                  <li><span className={`${styles.icon} material-symbols-outlined`}>notifications</span>Paquetes</li>
                              </Link>
                              <Link to="/Notificaciones">
                                  <li><span className={`${styles.icon} material-symbols-outlined`}>notifications</span>Asistencia al Viajero</li>
                              </Link>
                          </ul>
                          {/* <button className={styles.logout}>Cerrar Sesión</button> */}
                      </div>
                  )}
    </div>
  );
}

export default ServiciosMenu;
