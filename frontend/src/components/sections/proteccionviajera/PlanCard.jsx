import React from "react";
import styles from "./proteccion.module.css";

function PlanCard({ nombre, precio, beneficios, onSeleccionar, destacado }) {
    return (
        <div className={`${styles.planCard} ${destacado ? styles.destacado : ""}`}>
            {destacado && <span className={styles.etiqueta}>★ Recomendado</span>}

            <h1 className={styles.tituloPlan}>{nombre}</h1>
            <h2 className={styles.subtituloPlan}>{precio}</h2>
            <p className={styles.pPlan}>Incluye</p>
            <ul className={styles.listaContainer}>
                {beneficios.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
            <div className={styles.containerButton}>
                <button onClick={onSeleccionar}>Siguiente</button>
            </div>
        </div>
    );
}

export default PlanCard;
