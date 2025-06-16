import styles from "../../../styles/sectionsfav.module.css";
import { Link } from "react-router-dom";
import img from "../../../assets/madrid.jpg";
import Cardobjetos from "../../UI/CardObjetos.jsx";
import { FaUser, FaMapMarkerAlt, FaCalendarAlt, FaTrash, FaShoppingCart } from "react-icons/fa";
function SectionFav() {
    const contenido = [
        <><FaUser /> 1 persona</>,
        <><FaMapMarkerAlt /> Salida desde Buenos Aires</>,
        <><FaCalendarAlt /> 15/07 al 19/07</>,
    ];
    function hola() {
    console.log("hola");
  }
    const botones = [
        <button onClick={hola}><FaTrash /></button>,
        <button><FaShoppingCart /> Agregar</button>,
    ];
    return (
        <section className={styles.section}>
            <h1 className={styles.sectionTitle}>Todos los viajes, alojamientos y opciones que más te gustaron, en un <br /> solo lugar.</h1>
            <div className={styles.sectionGrid}>
                <Cardobjetos
                    imagen={img}
                    titulo="Paquete Santorini (5D/4N)"
                    contenido={contenido}
                    precio="$1.100.000 ARS"
                    botones={botones}
                />
                <Cardobjetos
                    imagen={img}
                    titulo="Paquete Santorini (5D/4N)"
                    contenido={contenido}
                    precio="$1.100.000 ARS"
                    botones={botones}
                />
                <Cardobjetos
                    imagen={img}
                    titulo="Paquete Santorini (5D/4N)"
                    contenido={contenido}
                    precio="$1.100.000 ARS"
                    botones={botones}
                />
            </div>
        </section>
    );
}

export default SectionFav;