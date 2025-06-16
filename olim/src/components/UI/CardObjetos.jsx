import React from "react";
import styles from "../../styles/cardobjetos.module.css";

function Cardobjetos({ imagen, titulo, contenido = [], precio, botones = [] }) {+
  function hola() {
    console.log("hola");
  }
  return (
    <section className={styles.card}>
      <img src={imagen} alt={titulo} className={styles.imagen} />

      <div className={styles.info}>
        <h3 className={styles.titulo}>{titulo}</h3>
        <ul className={styles.lista}>
          {contenido.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p className={styles.precio}>{precio}</p>
        <div className={styles.botones}>
          {botones.map((boton, i) => (
            <span key={i}>{boton}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Cardobjetos;
