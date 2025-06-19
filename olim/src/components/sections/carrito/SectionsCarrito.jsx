import React from "react";
import styles from "../../../styles/SectionCarrito.module.css";

function SectionsCarrito() {

    return (

        <section className={styles.carritoSection}>

            <aside className={styles.asideProductos}>

                <h1>Alquiler de autos</h1>
                <ol>
                    <li>Alquiler: Renault Kwid o similar
                    </li>
                    <li>Retiro en Río de Janeiro
                    </li>
                    <li>15/07 al 20/07</li>
                </ol>


                <section className={styles.divContainer}>
                    <button>Quitar Auto</button>
                    <span>
                        $220.000  ARS
                    </span>
                </section>

            </aside>

            <aside className={styles.asidePrevista}>
                <article className={styles.articleResumen}>
                    <h1>RESUMEN FINAL</h1>
                    <section className={styles.sectionTexto}>
                        <p>subtotal</p>
                    </section>
                </article>
                {/* <article className={styles.formaDePagoAcordateJuan}></article> */}
            </aside>


        </section>
    )
}

export default SectionsCarrito;