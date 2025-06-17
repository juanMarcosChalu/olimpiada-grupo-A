import React from "react";
import styles from "../../../styles/Registrar.module.css"
import fondo from "../../../assets/Logo.png"

function Registrar() {
    return (

        <section className={styles.Section} style={{ backgroundImage: `url(${fondo})` }}>
            <div className={styles.registerContainer}>
                <span className={styles.Span}>
                    Regístrate en Brújula
                </span>

                <form action="" className={styles.formRegister}>
                    <input className={styles.datosForm} type="text" />
                    <input className={styles.datosForm} type="text" />
                    <input className={styles.datosForm} type="text" />

                    <input type="checkbox" name="" className={styles.Check} />
                    <input type="button" value="Registrarse" className={styles.Boton} />
                </form>
            </div>
        </section>
    )
}

export default Registrar; 