import React, { useState, useEffect} from "react";
import { FaHeart, FaRegHeart, FaCheckCircle } from "react-icons/fa";
import "../../../styles/AlquilerAutos.css";
import { useFetch } from "../../../hooks/useFetch";
import { useAuth } from "../../../hooks/useAuth.js";
import { toast } from "sonner";
import usePost from "../../../hooks/usePost.js";
import background_of_home_alquiler_de_autos from "../../../assets/alquilerautos.jpg";

export default function AlquilerAutos2() {
  const [busqueda, setBusqueda] = useState({
    lugarRetiro: "",
    fechaRetiro: "",
    fechaEntrega: "",
    pasajeros: "",
  });
  const { data, loading, error } = useFetch(`http://localhost:3000/autos`);
  const [autos, setAutos] = useState([]);
  const { post, response } = usePost();
  const { usuario, cargando,isLogin } = useAuth();
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [autoSeleccionado, setAutoSeleccionado] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [mensajeFavorito, setMensajeFavorito] = useState("");
  const [mostrarMensajeFavorito, setMostrarMensajeFavorito] = useState(false);
  const [descripcionExpandida, setDescripcionExpandida] = useState(null);
  const [reserva, setReserva] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });
  const [mensajeReserva, setMensajeReserva] = useState("");

  useEffect(() => {
    if (window.location.pathname === "/alquiler-autos") {
      setMostrarResultados(true);
    }
  }, []);

   useEffect(() => {
          if (data) {
              const autosConImagen = data.map(auto => {
                  const imagenSrc = auto.imagen
                      ? `data:${auto.imagen.tipo};base64,${auto.imagen.data}`
                      : " ";
  
                  return {
                      ...auto,
                      imagenSrc
                  };
              });
  
              setAutos(autosConImagen);
          }
      }, [data]);


  const handleChange = (e) => {
    setBusqueda({ ...busqueda, [e.target.name]: e.target.value });
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    setMostrarResultados(true);
  };

  const abrirModal = (auto) => {
    setAutoSeleccionado(auto);
    setMostrarModal(true);
    setReserva({ nombre: "", correo: "", telefono: "" });
    setMensajeReserva("");
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const handleReservaChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

 

  const handleConfirmarReserva = async (e) => {
      e.preventDefault();
      console.log(reserva);
      if (!reserva.nombre || !reserva.correo || !reserva.telefono) {
        setMensaje("Completá todos los campos.");
        setTimeout(() => {
        setMensajeReserva("");
      }, 1500);
        return;
      }
      //fechaInicio y fechaFin deben ser validadas
      if (!reserva.fecha || !reserva.fechaEntrega) {
        setMensajeReserva("Completá las fechas de inicio y fin.");
        setTimeout(() => {
        setMensajeReserva("");
      }, 1500);
        return;
      }
      if (new Date(reserva.fecha) >= new Date(reserva.fechaEntrega)) {
        setMensajeReserva("La fecha de inicio debe ser anterior a la fecha de fin.");
        setTimeout(() => {
        setMensajeReserva("");
      }, 1500);
        return;
      }
      
      
      const response = await post("http://localhost:3000/carrito/anadirProducto", {
        userId:usuario.id,
        tipoProducto: "alquilerAuto",
        productoID: autoSeleccionado.id,
        nombreAsignado: reserva.nombre,
        telefonoAsignado: reserva.telefono,
        emailAsignado: reserva.correo,
        fechaInicio: reserva.fecha,
        fechaFin: reserva.fechaEntrega,
        cantPersonas:1,
      });
  
      if (response.error) {
        toast.error("Error al confirmar la reserva.");
        return;
      }
  
      toast.success("Reserva confirmada. Redirigiendo al carrito...");
      setTimeout(() => {
        window.location.href = "/carrito";
      }, 1500);
    };

  const mostrarMensaje = (texto) => {
    setMensajeFavorito(texto);
    setMostrarMensajeFavorito(true);
    setTimeout(() => {
      setMostrarMensajeFavorito(false);
    }, 2000);
  };

  const toggleFavorito = (id) => {
    setFavoritos((prev) => {
      if (prev.includes(id)) {
        mostrarMensaje("Eliminado de favoritos");
        return prev.filter((fav) => fav !== id);
      } else {
        mostrarMensaje("Agregado a favoritos");
        return [...prev, id];
      }
    });
  };

  const toggleDescripcion = (id) => {
    setDescripcionExpandida((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className={`alquiler-container ${mostrarResultados ? "sin-fondo" : "con-fondo"}`}
      style={{backgroundImage: mostrarResultados ? "none" : `url(${background_of_home_alquiler_de_autos})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Open Sans', sans-serif",
        color: "#3a2e25",
        transition: "background 0.3s ease",
      }}
    >
      {!mostrarResultados && (
        <>
          <form className="form-box" onSubmit={handleBuscar}>
            <h3>Busca tu auto ideal</h3>
            <input
              type="text"
              name="lugarRetiro"
              placeholder="Lugar de retiro"
              value={busqueda.lugarRetiro}
              onChange={handleChange}
            />
            <input
              type="date"
              name="fechaRetiro"
              value={busqueda.fechaRetiro}
              onChange={handleChange}
            />
            <input
              type="date"
              name="fechaEntrega"
              value={busqueda.fechaEntrega}
              onChange={handleChange}
            />
            <select
              name="pasajeros"
              value={busqueda.pasajeros}
              onChange={handleChange}
            >
              <option value="">Cantidad de pasajeros</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4+">4 o más</option>
            </select>
            <button type="submit">Buscar</button>
          </form>
        </>
      )}

      {mostrarResultados && (
        <>
          <div className="grid-alojamientos">
            {autos.map((auto) => (
            
              <div className="card" key={auto.id}>
              {console.log(auto)}

                <div className="carousel-container">
                  <img src={auto.imagenSrc} alt={auto.nombre} />
                  <div
                    className="heart-icon"
                    onClick={() => toggleFavorito(auto.id)}
                    title={
                      favoritos.includes(auto.id)
                        ? "Quitar de favoritos"
                        : "Agregar a favoritos"
                    }
                  >
                    {favoritos.includes(auto.id) ? (
                      <FaHeart color="#876445" />
                    ) : (
                      <FaRegHeart color="#876445" />
                    )}
                  </div>
                </div>

                <div className="card-info">
                  <h4>{auto.nombre}</h4>

                  {descripcionExpandida === auto.id ? (
                    <>
                      <ul className="descripcion-lista expandido">
                        {auto.descripcion.map((item, i) => (
                          <li key={i}>
                            <FaCheckCircle
                              style={{ color: "#876445", marginRight: "6px" }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <button
                        className="ver-mas-btn"
                        onClick={() => toggleDescripcion(auto.id)}
                      >
                        Ver menos ▲
                      </button>
                    </>
                  ) : (
                    <>
                      <ul className="descripcion-lista">
                        {auto.descripcion.slice(0, 3).map((item, i) => (
                          <li key={i}>
                            <FaCheckCircle
                              style={{ color: "#876445", marginRight: "6px" }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <button
                        className="ver-mas-btn"
                        onClick={() => toggleDescripcion(auto.id)}
                      >
                        Ver más ▼
                      </button>
                    </>
                  )}

                  <p
                    style={{
                      color: "#786D60",
                      fontWeight: "600",
                      fontSize: "1rem",
                      marginTop: "0.3rem",
                    }}
                  >
                    Desde: {auto.precio} ARS/dia
                  </p>

                  <button
                    className="siguiente"
                    onClick={() => abrirModal(auto)}
                    aria-label={`Reservar ${auto.nombre}`}
                  >
                    Alquilar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {mostrarModal && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div
            className="modalAlojamientos"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <h3 id="modal-title">Reservar {autoSeleccionado.nombre}</h3>
            <form onSubmit={handleConfirmarReserva} className="formularioreservaAlojamientos">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={reserva.nombre}
                onChange={handleReservaChange}
              />
              <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={reserva.correo}
                onChange={handleReservaChange}
              />
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={reserva.telefono}
                onChange={handleReservaChange}
              />
              <input type="date" name="fecha" onChange={handleReservaChange} value={reserva.fechaInicio} />
              <input type="date" name="fechaEntrega" onChange={handleReservaChange} value={reserva.fechaFin} />
              <button type="submit">Confirmar reserva</button>
              <button
              className="cerrarModalAlojamientos"
              onClick={cerrarModal}
              aria-label="Cerrar formulario de reserva"
            >
              Cancelar
            </button>
            </form>
            {mensajeReserva && (
              <p style={{ color: "red", marginTop: "0.5rem" }}>
                {mensajeReserva}
              </p>
            )}
            
          </div>
        </div>
      )}

      {mostrarMensajeFavorito && (
        <div className="mensaje-favorito-flotante">{mensajeFavorito}</div>
      )}
    </div>
  );
}
