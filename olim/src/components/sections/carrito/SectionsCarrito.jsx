import React from "react";
import styles from "../../../styles/SectionCarrito.module.css";

function SectionsCarrito() {

    return (

        <section className={styles.carritoSection}>

            <aside className={styles.asideProductos}>

                <h1 className={styles.titulosCarritoCards}>Alquiler de autos</h1>
                <ol>
                    <li>Alquiler: Renault Kwid o similar
                    </li>
                    <li>Retiro en Río de Janeiro
                    </li>
                    <li>15/07 al 20/07</li>
                </ol>

                <div className={styles.divComtainer
                }>
                    <input type="text" className="quitar" />
                    <span className={styles.spanPrecio}>
                        $220.000  ARS
                    </span>
                </div>
            </aside>

            <aside className={styles.asidePrecio}>
                <article className={styles.articleResumen}>
                    <h1>🧾 RESUMEN FINAL
                    </h1>
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