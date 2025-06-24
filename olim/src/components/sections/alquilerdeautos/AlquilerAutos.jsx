import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
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

  // Detectar si estamos en la "página de resultados" simulada
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

  // Para que los datos de búsqueda puedan persistir y mostrar en resultados
  useEffect(() => {
    // Si la url incluye '/alquiler-autos' (simulamos ruta resultados)
    if (window.location.pathname === "/alquiler-autos") {
      // En la práctica, la búsqueda se podría pasar por query params o contexto
      // Aquí forzamos mostrar resultados para simular la navegación
      setMostrarResultados(true);
      // Podrías restaurar busqueda desde localStorage si querés persistirla
    }
  }, []);

  const autosData = [
    {
      id: 1,
      nombre: "Volkswagen T-Roc – SUV",
      imagen: auto6,
      descripcion:
        "✔️ 5 puertas – Hasta 5 pasajeros\n✔️ Aire acondicionado – Bluetooth\n✔️ Seguro con franquicia reducida\n✔️ Motor turbo eficiente\n✔️ Sistema de navegación integrado\n✔️ Bluetooth y USB\n✔️ Espacio amplio para equipaje\n✔️ Consumo moderado",
      precio: "Desde $78.000 ARS/día",
    },
    {
      id: 2,
      nombre: "Fiat 500",
      imagen: auto1,
      descripcion:
        "✔️ 3 puertas - Bajo consumo\n✔️ Estilo retro moderno\n✔️ Fácil de manejar\n✔️ Compacto para ciudad\n✔️ Aire acondicionado\n✔️ Sistema multimedia básico",
      precio: "Desde $64.000 ARS/día",
    },
    {
      id: 3,
      nombre: "Peugeot 208",
      imagen: auto2,
      descripcion:
        "✔️ 5 puertas - Interior tecnológico\n✔️ Buen rendimiento\n✔️ Perfecto para ciudad\n✔️ Pantalla táctil 7''\n✔️ Sensores de estacionamiento\n✔️ Consumo eficiente",
      precio: "Desde $74.000 ARS/día",
    },
    {
      id: 4,
      nombre: "Ford Focus",
      imagen: auto3,
      descripcion:
        "✔️ 5 pasajeros\n✔️ Diseño elegante - Motor eficiente\n✔️ Buen rendimiento en ciudad\n✔️ Control de crucero\n✔️ Bluetooth y sistema audio premium",
      precio: "Desde $74.000 ARS/día",
    },
    {
      id: 5,
      nombre: "Renault Captur",
      imagen: auto4,
      descripcion:
        "✔️ 5 pasajeros\n✔️ Pantalla multimedia\n✔️ Buen despeje al suelo\n✔️ Cámara trasera\n✔️ Control de estabilidad\n✔️ GPS integrado",
      precio: "Desde $74.000 ARS/día",
    },
    {
      id: 6,
      nombre: "Renault Clio",
      imagen: auto5,
      descripcion:
        "✔️ 5 puertas\n✔️ Bajo consumo - Baúl mediano\n✔️ Fácil de estacionar\n✔️ Aire acondicionado\n✔️ Conectividad Bluetooth\n✔️ Sistema de seguridad básico",
      precio: "Desde $60.000 ARS/día",
    },
  ];

  const handleChange = (e) => {
    setBusqueda({ ...busqueda, [e.target.name]: e.target.value });
  };
  const handleBuscar = (e) => {
    e.preventDefault();
    // Simular navegación a resultados
    setMostrarResultados(true);
    // Aquí podrías guardar la búsqueda en localStorage si es necesario
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
      className={`alquiler-container ${
        mostrarResultados ? "sin-fondo" : "con-fondo"
      }`}
      style={{
        backgroundImage: mostrarResultados
          ? "none"
          : `url(${background_of_home_alquiler_de_autos})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    
        
        fontFamily: "'Open Sans', sans-serif",
        color: "#3a2e25",
        transition: "background 0.3s ease",
      }}
    >
      {/* Si NO estamos en resultados mostramos el formulario y requisitos */}
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

          {/* Requisitos básicos fuera del form */}
          <div className="requisitos-basicos">
            <h4>Requisitos basicos</h4>
            <ul>
              <li>Edad minima: 21 años</li>
              <li>Licencia de conducir vigente</li>
              <li>Tarjeta de credito para garantia</li>
              <li>DNI o pasaporte</li>
            </ul>
          </div>
        </>
      )}

      {/* Mostrar resultados si estamos en /alquiler-autos */}
    {mostrarResultados && (
        <>
          <h3 style={{ marginBottom: "1rem", color: "#776B5D" }}>
            Autos disponibles en {busqueda.lugarRetiro || "tu ciudad"}
          </h3>

          

          <div className="grid-alojamientos">
            {autosData.map((auto) => (
              <div className="card" key={auto.id}>
                <div className="carousel-container">
                  <img src={auto.imagen} alt={auto.nombre} />
                  <div
                    className="heart-icon"
                    onClick={() => toggleFavorito(auto.id)}
                    aria-label="Agregar a favoritos"
                  >
                    {favoritos.includes(auto.id) ? (
                      <FaHeart color="#E74C3C" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </div>
                </div>
                <div className="card-info">
                  <h4>{auto.nombre}</h4>
                  {descripcionExpandida === auto.id ? (
                    <>
                      {auto.descripcion.split("\n").map((linea, index) => (
                        <p key={index} className="descripcion expandido">
                          {linea}
                        </p>
                      ))}
                      <button
                        className="ver-mas-btn"
                        onClick={() => toggleDescripcion(auto.id)}
                      >
                        Ver menos ▲
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="descripcion">
                        {auto.descripcion.split("\n")[0]}
                      </p>
                      <button
                        className="ver-mas-btn"
                        onClick={() => toggleDescripcion(auto.id)}
                      >
                        Ver más ▼
                      </button>
                    </>
                  )}
                  <p>
                    <strong>{auto.precio}</strong>
                  </p>
                  <button
                    className="siguiente"
                    onClick={() => abrirModal(auto)}
                    aria-label={`Continuar reserva de ${auto.nombre}`}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>)}

      {/* Modal de reserva */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modalAlojamientos">
            <h3>Completá tu reserva</h3>
            <p>
              <strong>{autoSeleccionado.nombre}</strong>
            </p>
            <form onSubmit={confirmarReserva}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre y apellido"
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
              <button type="submit">Continuar reserva</button>
            </form>
            {mensajeReserva && (
              <p className="form-message">{mensajeReserva}</p>
            )}
            <button
              className="cerrarModalAlojamientos"
              onClick={cerrarModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Mensaje flotante favoritos */}
      {mostrarMensajeFavorito && (
        <div className="mensaje-favorito-flotante">{mensajeFavorito}</div>
      )}
    </div>
  );
}
