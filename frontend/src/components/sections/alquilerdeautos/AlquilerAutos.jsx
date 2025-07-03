import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaCheckCircle } from "react-icons/fa";
import "../../../styles/AlquilerAutos.css";

import auto1 from "../../../assets/fiat500.jpg";
import auto2 from "../../../assets/peugeot208.jpg";
import auto3 from "../../../assets/focus.jpg";
import auto4 from "../../../assets/captur.jpg";
import auto5 from "../../../assets/clio.jpg";
import auto6 from "../../../assets/volkswagen.jpg";

import background_of_home_alquiler_de_autos from "../../../assets/alquilerautos.jpg";

export default function AlquilerAutos() {
  const [busqueda, setBusqueda] = useState({
    lugarRetiro: "",
    fechaRetiro: "",
    fechaEntrega: "",
    pasajeros: "",
  });

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

  const autosData = [
    {
      id: 1,
      nombre: "Volkswagen T-Roc – SUV",
      imagen: auto6,
      descripcion: [
        "5 puertas – Hasta 5 pasajeros",
        "Aire acondicionado – Bluetooth",
        "Seguro con franquicia reducida",
        "Motor turbo eficiente",
        "Sistema de navegación integrado",
        "Bluetooth y USB",
        "Espacio amplio para equipaje",
        "Consumo moderado",
      ],
      precio: "Desde $78.000 ARS/día",
    },
    {
      id: 2,
      nombre: "Fiat 500",
      imagen: auto1,
      descripcion: [
        "3 puertas - Bajo consumo",
        "Estilo retro moderno",
        "Fácil de manejar",
        "Compacto para ciudad",
        "Aire acondicionado",
        "Sistema multimedia básico",
      ],
      precio: "Desde $64.000 ARS/día",
    },
    {
      id: 3,
      nombre: "Peugeot 208",
      imagen: auto2,
      descripcion: [
        "5 puertas - Interior tecnológico",
        "Buen rendimiento",
        "Perfecto para ciudad",
        "Pantalla táctil 7''",
        "Sensores de estacionamiento",
        "Consumo eficiente",
      ],
      precio: "Desde $74.000 ARS/día",
    },
    {
      id: 4,
      nombre: "Ford Focus",
      imagen: auto3,
      descripcion: [
        "5 pasajeros",
        "Diseño elegante - Motor eficiente",
        "Buen rendimiento en ciudad",
        "Control de crucero",
        "Bluetooth y sistema audio premium",
      ],
      precio: "Desde $74.000 ARS/día",
    },
    {
      id: 5,
      nombre: "Renault Captur",
      imagen: auto4,
      descripcion: [
        "5 pasajeros",
        "Pantalla multimedia",
        "Buen despeje al suelo",
        "Cámara trasera",
        "Control de estabilidad",
        "GPS integrado",
      ],
      precio: "Desde $74.000 ARS/día",
    },
    {
      id: 6,
      nombre: "Renault Clio",
      imagen: auto5,
      descripcion: [
        "5 puertas",
        "Bajo consumo - Baúl mediano",
        "Fácil de estacionar",
        "Aire acondicionado",
        "Conectividad Bluetooth",
        "Sistema de seguridad básico",
      ],
      precio: "Desde $60.000 ARS/día",
    },
  ];

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
    console.log(reserva+"asda");
    
  };

  const confirmarReserva = (e) => {
    e.preventDefault();
    if (!reserva.nombre || !reserva.correo || !reserva.telefono) {
      setMensajeReserva("Completá todos los campos.");
      return;
    }
    setMensajeReserva("¡Reserva confirmada! Redirigiendo al carrito...");
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
            {autosData.map((auto) => (
            
              <div className="card" key={auto.id}>
              {console.log(auto)}

                <div className="carousel-container">
                  <img src={auto.imagen} alt={auto.nombre} />
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
                    {auto.precio}
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
            <form onSubmit={confirmarReserva}>
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
            </form>
            {mensajeReserva && (
              <p style={{ color: "red", marginTop: "0.5rem" }}>
                {mensajeReserva}
              </p>
            )}
            <button
              className="cerrarModalAlojamientos"
              onClick={cerrarModal}
              aria-label="Cerrar formulario de reserva"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {mostrarMensajeFavorito && (
        <div className="mensaje-favorito-flotante">{mensajeFavorito}</div>
      )}
    </div>
  );
}
