import React from "react";
import styles from "../../../styles/carrito.module.css";
import Header from "../../Layouts/header.jsx";

function carrito() {
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
                <div>
                    <input type="text"><span>❌ Quitar auto</span></input>
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