import styles from "./CardVuelo.module.css";
import { FaClock, FaSuitcaseRolling } from "react-icons/fa";
import { Link } from "react-router-dom";

// 📌 Esta es la función que necesitás para arreglar la fecha
function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const año = String(fecha.getFullYear()).slice(2);
  return `${dia}/${mes}/${año}`;
}

function formatearHora(hora) {
  return hora.slice(0, 5) + " hs"; // "06:15:00" -> "06:15 hs"
}

function formatearDuracion(duracion) {
  const [hh, mm] = duracion.split(":");
  return `${parseInt(hh)}h ${parseInt(mm)}m`;
}

function CardVuelo({ vuelo }) {
  return (
    <article className={styles.card}>
      <header className={styles.title}>{vuelo.aerolinea}</header>

      <section className={styles.info}>
        <div className={styles.column}>
          <h3>IDA</h3>
          <p>{vuelo.origen_ida}</p>
          <p>{formatearFecha(vuelo.fecha_ida)}</p>
          <p>{formatearHora(vuelo.hora_ida)}</p>
        </div>
        <div className={styles.column}>
          <h3>VUELTA</h3>
          <p>{vuelo.origen_vuelta}</p>
          <p>{formatearFecha(vuelo.fecha_vuelta)}</p>
          <p>{formatearHora(vuelo.hora_vuelta)}</p>
        </div>
      </section>

      <section className={styles.details}>
        <p>
          <FaClock className={styles.icon} />
          Duración: {formatearDuracion(vuelo.duracion_ida)} (ida) ·{" "}
          {formatearDuracion(vuelo.duracion_vuelta)} (vuelta) ·{" "}
          {vuelo.directos ? "Ambos directos" : "Con escalas"}
        </p>
        <p>
          <FaSuitcaseRolling className={styles.icon} />
          Equipaje: {vuelo.equipaje}
        </p>
      </section>

      <footer className={styles.footerPrecio}>
        <div className={styles.precio}>
          Por persona desde <br />
          <strong>${vuelo.precio.toLocaleString("es-AR")}</strong>
        </div>

        <Link to="/carrito" className={styles.boton}>
          Siguiente
        </Link>
      </footer>
    </article>
  );
}

export default CardVuelo;
