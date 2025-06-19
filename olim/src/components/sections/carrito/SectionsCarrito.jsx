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
                        <p className={styles.subtotal}>Subtotal: $2,450,000 ARS</p>
                        <p className={styles.impuestos}>Impuestos: $595.350 ARS</p>

                        <ul className={styles.listaImpuestos}>
                            <li>IVA 21%: $514.500</li>
                            <li>Ingresos Brutos 2,3%: $56.350</li>
                            <li>Tasa Municipal 1%: $24.500</li>
                        </ul>

                        <p className={styles.total}>Total: <strong>$3.045.350 ARS</strong></p>

                        <button className={styles.botonCompra}>Realizar compra</button>
                    </section>

                </article>
                {/* <article className={styles.formaDePagoAcordateJuan}></article> */}
            </aside>


        </section>
    )
}

export default SectionsCarrito;