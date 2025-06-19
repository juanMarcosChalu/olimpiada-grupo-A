import styles from "./CardVuelo.module.css";
import { FaClock, FaSuitcaseRolling } from "react-icons/fa"; // Usa react-icons

function CardVuelo() {
  return (
    <article className={styles.card}>
      <header className={styles.title}>Flybondi</header>

      <section className={styles.info}>
        <div className={styles.column}>
          <h3>IDA</h3>
          <p>Buenos Aires (EZE)</p>
          <p>20/07/25</p>
          <p>06:15 hs</p>
        </div>
        <div className={styles.column}>
          <h3>VUELTA</h3>
          <p>Bariloche (BRC)</p>
          <p>27/07/25</p>
          <p>21:00 hs</p>
        </div>
      </section>

      <section className={styles.details}>
        <p>
          <FaClock className={styles.icon} /> Duración: 2h 25m (ida) · 2h 20m (vuelta) · Ambos directos
        </p>
        <p>
          <FaSuitcaseRolling className={styles.icon} /> Equipaje: 1 bolso de mano
        </p>
      </section>

      <footer className={styles.footerPrecio}>
        <div className={styles.precio}>Por persona desde<br /><strong>$134 USD</strong></div>
        <button className={styles.boton}>Siguiente</button>
      </footer>
    </article>
  );
}

export default CardVuelo;
