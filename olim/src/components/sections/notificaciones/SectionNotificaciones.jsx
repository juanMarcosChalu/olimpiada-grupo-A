import styles from "../../../styles/SectionNotificaciones.module.css"
import React from "react";
import CardVuelo from "../../UI/CardVuelo/CardVuelo";
import { FaUser, FaMapMarkerAlt, FaCalendarAlt, FaTrash, FaShoppingCart } from "react-icons/fa";
function SectionNotificaciones() {
    return(
        <section className={styles.sectionNotificaciones}>
            <div className={styles.notificacionesContainerFlex}>
               <article className={styles.notificaciones}>
                    <header className={styles.notificacionesHeader}><h1>Tu pedido fue confirmado con exito</h1> <p className={styles.date}> 15 jun 2025, 14:30</p></header>
                    <p className={styles.notificacionesInfo}>Gracias por comprar el paquete santorini <br/> Paquete para 2 personas · 7 noches · vuelo + hotel incluido · Precio: $2.200.200 ARS</p>
                    <footer className={styles.notificacionesButtons}>
                        <button className={styles.notificacionesButtons}>
                            Marcar como leido
                        </button>
                        <button className={styles.notificacionesButtons}>Eliminar <FaTrash></FaTrash></button>  
                    </footer>
               </article>
               <h1 className={styles.noNotificacionesmessage}>No Tienes Mas Notificaciones</h1>
            </div>
            <CardVuelo/>
        </section>
    ) 
}

export default SectionNotificaciones;