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
<<<<<<< HEAD
    lugar: "",
    entrada: "",
    salida: "",
    personas: ""
=======
    lugarRetiro: "",
    fechaRetiro: "",
    fechaEntrega: "",
    pasajeros: "",
>>>>>>> parent of 5d0d6b40 (2.7.5)
  });

  const { data, loading, error } = useFetch(`/autos`);
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
        return { ...auto, imagenSrc };
      });
      setAutos(autosConImagen);
    }
  }, [data]);

  const handleBuscar = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    const { lugar, entrada, salida, personas } = busqueda;
    if (!lugar || !entrada || !salida || !personas) {
      toast.error("Completá todos los campos de búsqueda.");
      return;
    }
=======
>>>>>>> parent of 5d0d6b40 (2.7.5)
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
    if (!reserva.nombre || !reserva.correo || !reserva.telefono) {
      setMensajeReserva("Completá todos los campos.");
      setTimeout(() => setMensajeReserva(""), 1500);
      return;
    }
    if (!reserva.fecha || !reserva.fechaEntrega) {
      setMensajeReserva("Completá las fechas de inicio y fin.");
      setTimeout(() => setMensajeReserva(""), 1500);
      return;
    }
    if (new Date(reserva.fecha) >= new Date(reserva.fechaEntrega)) {
      setMensajeReserva("La fecha de inicio debe ser anterior a la fecha de fin.");
      setTimeout(() => setMensajeReserva(""), 1500);
      return;
    }

    const response = await post("/carrito/anadirProducto", {
      userId: usuario.id,
      tipoProducto: "alquilerAuto",
      productoID: autoSeleccionado.id,
<<<<<<< HEAD
      nombreAsignado: nombre,
      telefonoAsignado: telefono,
      emailAsignado: correo,
      fechaInicio: fecha,
      fechaFin: fechaEntrega,
      cantPersonas: busqueda.personas
=======
      nombreAsignado: reserva.nombre,
      telefonoAsignado: reserva.telefono,
      emailAsignado: reserva.correo,
      fechaInicio: reserva.fecha,
      fechaFin: reserva.fechaEntrega,
      cantPersonas: 1,
>>>>>>> parent of 5d0d6b40 (2.7.5)
    });

    if (response.error) {
      toast.error("Error al confirmar la reserva.");
      return;
    }

    toast.success("Reserva confirmada. Redirigiendo al carrito...");
    setTimeout(() => {
      window.location.href = "/carritoPage";
    }, 700);
  };

  const mostrarMensaje = (texto) => {
    setMensajeFavorito(texto);
    setMostrarMensajeFavorito(true);
    setTimeout(() => setMostrarMensajeFavorito(false), 2000);
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
      style={{
        backgroundImage: mostrarResultados ? "none" : `url(${background_of_home_alquiler_de_autos})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Open Sans', sans-serif",
        color: "#3a2e25",
        transition: "background 0.3s ease",
      }}
    >
      {!mostrarResultados && (
        <form className="form-box" onSubmit={handleBuscar}>
<<<<<<< HEAD
          <h3>Elegí tu mejor hospedaje</h3>

=======
          <h3>Busca tu auto ideal</h3>
>>>>>>> parent of 5d0d6b40 (2.7.5)
          <input
            type="text"
            name="lugarRetiro"
            placeholder="Lugar de retiro"
            value={busqueda.lugarRetiro}
            onChange={handleChange}
          />
<<<<<<< HEAD

          <select
            name="personas"
            value={busqueda.personas}
            onChange={(e) => setBusqueda({ ...busqueda, personas: e.target.value })}
            required
          >
            <option value="" disabled hidden>
              Cantidad de personas
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4+">4 o más</option>
          </select>

          <input
            type="text"
            name="entrada"
            placeholder="Seleccioná la fecha de retiro del vehículo"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
            value={busqueda.entrada}
            onChange={(e) => setBusqueda({ ...busqueda, entrada: e.target.value })}
=======
          <input
            type="date"
            name="fechaRetiro"
            value={busqueda.fechaRetiro}
            onChange={handleChange}
>>>>>>> parent of 5d0d6b40 (2.7.5)
          />
          <input
<<<<<<< HEAD
            type="text"
            name="salida"
            placeholder="Seleccioná la fecha de entrega del vehículo"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
            value={busqueda.salida}
            onChange={(e) => setBusqueda({ ...busqueda, salida: e.target.value })}
=======
            type="date"
            name="fechaEntrega"
            value={busqueda.fechaEntrega}
            onChange={handleChange}
>>>>>>> parent of 5d0d6b40 (2.7.5)
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
      )}

<<<<<<< HEAD
      {mostrarMensajeFavorito && <div className="mensaje-favorito-flotante">{mensajeFavorito}</div>}
=======
      {mostrarResultados && (
        <div className="grid-alojamientos">
          {autos.map((auto) => (
            <div className="card" key={auto.id}>
              <div className="carousel-container">
                <img src={auto.imagenSrc} alt={auto.nombre} />
                <div
                  className="heart-icon"
                  onClick={() => toggleFavorito(auto.id)}
                  title={favoritos.includes(auto.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                  {favoritos.includes(auto.id) ? <FaHeart color="#876445" /> : <FaRegHeart color="#876445" />}
                </div>
              </div>

              <div className="card-info">
                <h4>{auto.nombre}</h4>

                {descripcionExpandida === auto.id ? (
                  <>
                    <ul className="descripcion-lista expandido">
                      {auto.descripcion.map((item, i) => (
                        <li key={i}>
                          <FaCheckCircle style={{ color: "#876445", marginRight: "6px" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button className="ver-mas-btn" onClick={() => toggleDescripcion(auto.id)}>Ver menos ▲</button>
                  </>
                ) : (
                  <>
                    <ul className="descripcion-lista">
                      {auto.descripcion.slice(0, 3).map((item, i) => (
                        <li key={i}>
                          <FaCheckCircle style={{ color: "#876445", marginRight: "6px" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button className="ver-mas-btn" onClick={() => toggleDescripcion(auto.id)}>Ver más ▼</button>
                  </>
                )}

                <p style={{ color: "#786D60", fontWeight: "600", fontSize: "1rem", marginTop: "0.3rem" }}>
                  Desde: {auto.precio} ARS/día
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
      )}
>>>>>>> parent of 5d0d6b40 (2.7.5)

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
              <input
                type="date"
                name="fecha"
                onChange={handleReservaChange}
                value={reserva.fecha || ""}
              />
              <input
                type="date"
                name="fechaEntrega"
                onChange={handleReservaChange}
                value={reserva.fechaEntrega || ""}
              />
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
<<<<<<< HEAD
=======

      {mostrarMensajeFavorito && (
        <div className="mensaje-favorito-flotante">{mensajeFavorito}</div>
      )}
>>>>>>> parent of 5d0d6b40 (2.7.5)
    </div>
  );
}
