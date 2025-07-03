import styles from "./Cardvuelo.module.css";
import { FaClock, FaSuitcaseRolling } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "sonner";
import usePost from "../../../hooks/usePost";
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

function CardVuelo({ vuelo,index }) {
const { usuario } = useAuth();
const {post,response} = usePost();
//convertir la fecha de ida y vuelta a formato dd/mm/aa
const fechaIda = formatearFecha(vuelo.fecha_ida);
const fechaVuelta = formatearFecha(vuelo.fecha_vuelta);
  const handleAñadirVuelo = async (e) => {
  e.preventDefault();
    if (!usuario) {
      toast.error("Debes iniciar sesión para añadir vuelos al carrito.");
      return;
    }

    const response = await post("https://4479f971-1d51-4b67-938a-a80b7de0af34-00-3inmgxot9m6r9.picard.replit.dev/carrito/anadirProducto", {
      userId: usuario.id,
      tipoProducto: "vuelo",
      productoID: vuelo.id,
      nombreAsignado: usuario.nombre,
      telefonoAsignado: usuario.telefono,
      emailAsignado: usuario.email,
      fechaInicio: fechaIda, // Asignar fecha de ida como fecha de inicio
      fechaFin: fechaVuelta, // Asignar fecha de vuelta como fecha de fin
      cantPersonas: 1, // Asignar cantidad de personas (puedes cambiarlo si es necesario)
    });

    if (response.error) {
      toast.error("Error al añadir el vuelo al carrito.");

    
    } else {
      toast.success("Vuelo añadido al carrito correctamente.");
      setTimeout(() => {
      window.location.href = "/carrito";
    }, 1500);
    }
}

  return (
    <article className={styles.card}>
    
      
      <header className={styles.title}>{vuelo.aerolinea} {vuelo.id}</header>

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

        <Link to="/carrito" className={styles.boton} onClick={handleAñadirVuelo}>
          Añadir
        </Link>
      </footer>
    </article>
  );
}

export default CardVuelo;
