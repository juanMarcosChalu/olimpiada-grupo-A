import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Importá esto
import styles from "../../../styles/sectionsfav.module.css";
import { FaUser, FaMapMarkerAlt, FaCalendarAlt, FaTrash, FaShoppingCart, FaStar, FaWifi, FaBed } from "react-icons/fa";
import Cardobjetos from "../../UI/CardObjetos.jsx";

import image_of_santorini from "../../../assets/santorini.jpg";
import image_of_captur from "../../../assets/captur.jpg";
import image_of_departamento from "../../../assets/deptopatagonia.jpg";

function SectionFav() {
  const navigate = useNavigate(); // ✅ Hook para redirigir

  const [favoritos, setFavoritos] = useState([
    {
      id: 1,
      imagen: image_of_santorini,
      titulo: "Paquete Santorini (5D/4N)",
      contenido: [
        <><FaUser /> 1 persona</>,
        <><FaMapMarkerAlt /> Salida desde Buenos Aires</>,
        <><FaCalendarAlt /> 15/07 al 19/07</>,
        <><FaStar /> 4.8 (230 opiniones)</>,
      ],
      precio: "$1.100.000 ARS",
    },
    {
      id: 2,
      imagen: image_of_captur,
      titulo: "Renault Captur",
      contenido: [
        <><FaUser /> 5 personas</>,
        <><FaMapMarkerAlt /> Retiro: Río de Janeiro</>,
        <><FaCalendarAlt /> 15/07 al 20/07</>,
        <><FaStar /> 4.6 (190 opiniones)</>,
      ],
      precio: "$74.000 ARS/día",
    },
    {
      id: 3,
      imagen: image_of_departamento,
      titulo: "Departamento Bariloche",
      contenido: [
        <><FaMapMarkerAlt /> A 2 cuadras del Centro Cívico</>,
        <><FaBed /> Para 2 personas</>,
        <><FaWifi /> Wi-Fi incluido</>,
        <><FaStar /> 4.7 (120 opiniones)</>,
      ],
      precio: "$278.000 ARS",
    },
  ]);

  const handleEliminar = (id) => {
    const nuevosFavoritos = favoritos.filter((item) => item.id !== id);
    setFavoritos(nuevosFavoritos);
  };

  const handleAgregar = (id) => {
    const item = favoritos.find((fav) => fav.id === id);
    console.log("Agregado al carrito:", item.titulo);
    // Si usás contexto o Redux, acá podrías hacer el dispatch
    navigate("/carrito"); // ✅ Redirige al carrito
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.sectionTitle}>Tus favoritos en un solo lugar</h1>
      <p className={styles.subTitle}>
        Todos los viajes, alojamientos y opciones que más te gustaron, organizados para vos.
      </p>

      <div className={styles.sectionGrid}>
        {favoritos.map(({ id, imagen, titulo, contenido, precio }) => (
          <Cardobjetos
            key={id}
            imagen={imagen}
            titulo={titulo}
            contenido={contenido}
            precio={precio}
            botones={[
              <button
                key={`eliminar-${id}`}
                type="button"
                onClick={() => handleEliminar(id)}
                className={styles.btnEliminar}
                aria-label="Eliminar favorito"
              >
                <FaTrash />
              </button>,
              <button
                key={`agregar-${id}`}
                type="button"
                onClick={() => handleAgregar(id)}
                className={styles.btnAgregar}
              >
                <FaShoppingCart /> Agregar
              </button>,
            ]}
          />
        ))}
      </div>
    </section>
  );
}

export default SectionFav;
