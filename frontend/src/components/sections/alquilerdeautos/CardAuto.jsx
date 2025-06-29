import { FaCheckCircle } from "react-icons/fa";
import "../../../styles/CardAuto.css";

function CardAuto({ nombre, imagenSrc, descripcion = [], precio, fondo }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div className="card-auto" style={{ backgroundColor: fondo }}>
      <img src={imagenSrc} alt={nombre} className="auto-img" />
      <h4>{nombre}</h4>

      <ul className="descripcion-auto">
        {(expandido ? descripcion : descripcion.slice(0, 3)).map((linea, i) => (
          <li key={i}><FaCheckCircle style={{ marginRight: 6 }} />{linea}</li>
        ))}
      </ul>

      <button className="ver-mas-btn" onClick={() => setExpandido(!expandido)}>
        {expandido ? "Ver menos ▲" : "Ver más ▼"}
      </button>

      <p className="precio-auto">{precio}</p>
      <button className="btn-alquilar">Alquilar</button>
    </div>
  );
}

export default CardAuto;
