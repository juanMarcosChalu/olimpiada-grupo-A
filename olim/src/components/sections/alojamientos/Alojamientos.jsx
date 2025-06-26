import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaHeart, FaRegHeart, FaWifi, FaUtensils, FaFire, FaPaw, FaWater } from "react-icons/fa";

import "../../../styles/Alojamientos.css";

import image_of_departamento from "../../../assets/departamento.jpg";
import image_of_cabañas_lago from "../../../assets/cabañaslago.jpg";
import image_of_depto_catedral from "../../../assets/deptocatedral.jpg";
import image_of_depto_patagonia from "../../../assets/deptopatagonia.jpg";

export default function Alojamientos() {
  const [busqueda, setBusqueda] = useState({
    lugar: "",
    personas: "",
    entrada: "",
    salida: "",
  });

  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [alojamientoSeleccionado, setAlojamientoSeleccionado] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [descripcionesExpand, setDescripcionesExpand] = useState({});

  const [mensajeFavorito, setMensajeFavorito] = useState("");
  const [mostrarMensajeFavorito, setMostrarMensajeFavorito] = useState(false);

  const [reserva, setReserva] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });

  const alojamientosData = [
    {
      id: 1,
      nombre: "Cabañas Los Arrayanes",
      descripcion:
        "Vista al lago · Hasta 5 personas · Cocina completa.",
      precio: "$312.000 ARS · 7 noches",
      imagenes: [image_of_departamento, image_of_cabañas_lago, image_of_depto_catedral],
      caracteristicas: {
        wifi: true,
        cocina: true,
        parrilla: false,
        mascotas: true,
        piscina: false,
      },
    },
    {
      id: 2,
      nombre: "Departamento Bariloche",
      descripcion:
        "Centro Cívico · Para 2 personas · Wi-Fi gratis.",
      precio: "$278.000 ARS · 7 noches",
      imagenes: [image_of_depto_catedral, image_of_depto_patagonia, image_of_departamento],
      caracteristicas: {
        wifi: true,
        cocina: true,
        parrilla: false,
        mascotas: false,
        piscina: false,
      },
    },
    {
      id: 3,
      nombre: "Hostel Patagonia",
      descripcion:
        "Para 1-4 personas · Baño privado · Wi-Fi incluido.",
      precio: "$180.000 ARS · 7 noches",
      imagenes: [image_of_depto_patagonia, image_of_departamento, image_of_cabañas_lago],
      caracteristicas: {
        wifi: true,
        cocina: false,
        parrilla: false,
        mascotas: true,
        piscina: false,
      },
    },
    {
      id: 4,
      nombre: "EcoLodge del Bosque",
      descripcion:
        "Rodeado de naturaleza · Piscina climatizada.",
      precio: "$350.000 ARS · 7 noches",
      imagenes: [image_of_cabañas_lago, image_of_depto_catedral, image_of_depto_patagonia],
      caracteristicas: {
        wifi: false,
        cocina: true,
        parrilla: true,
        mascotas: false,
        piscina: true,
      },
    },
    {
      id: 5,
      nombre: "Suite Panorámica",
      descripcion:
        "Vista a la montaña · Jacuzzi privado · Balcón.",
      precio: "$420.000 ARS · 7 noches",
      imagenes: [image_of_departamento, image_of_cabañas_lago, image_of_depto_patagonia],
      caracteristicas: {
        wifi: true,
        cocina: true,
        parrilla: false,
        mascotas: false,
        piscina: false,
      },
    },
    {
      id: 6,
      nombre: "Cabaña Familiar Andina",
      descripcion:
        "Ideal para grupos grandes · Parrilla · Amplio jardín.",
      precio: "$299.000 ARS · 7 noches",
      imagenes: [image_of_depto_catedral, image_of_departamento, image_of_cabañas_lago],
      caracteristicas: {
        wifi: false,
        cocina: true,
        parrilla: true,
        mascotas: true,
        piscina: false,
      },
    },
  ];

  const handleBuscar = (e) => {
    e.preventDefault();
    if (!busqueda.lugar || !busqueda.personas || !busqueda.entrada || !busqueda.salida) {
      alert("Por favor, completá todos los campos.");
      return;
    }
    setMostrarResultados(true);
  };

  const abrirModal = (alojamiento) => {
    setAlojamientoSeleccionado(alojamiento);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setReserva({ nombre: "", correo: "", telefono: "" });
    setMensaje("");
  };

  const handleReservaChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

  const confirmarReserva = (e) => {
    e.preventDefault();
    if (!reserva.nombre || !reserva.correo || !reserva.telefono) {
      setMensaje("Completá todos los campos.");
      return;
    }
    setMensaje("¡Reserva confirmada! Redirigiendo al carrito...");
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
    setDescripcionesExpand((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div
      className={`alojamiento-container ${
        mostrarResultados ? "sin-fondo" : "con-fondo"
      }`}
    >
      {!mostrarResultados ? (
        <form className="form-box" onSubmit={handleBuscar}>
          <h3>Elegí tu mejor hospedaje</h3>
          <input
            type="text"
            name="lugar"
            placeholder="Lugar"
            value={busqueda.lugar}
            onChange={(e) => setBusqueda({ ...busqueda, lugar: e.target.value })}
          />
          <select
            name="personas"
            value={busqueda.personas}
            onChange={(e) => setBusqueda({ ...busqueda, personas: e.target.value })}
          >
            <option value="" disabled>
              Cantidad de personas
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4+">4 o más</option>
          </select>
          <input
            type="date"
            name="entrada"
            value={busqueda.entrada}
            onChange={(e) => setBusqueda({ ...busqueda, entrada: e.target.value })}
          />
          <input
            type="date"
            name="salida"
            value={busqueda.salida}
            onChange={(e) => setBusqueda({ ...busqueda, salida: e.target.value })}
          />
          <button type="submit">Buscar</button>
        </form>
      ) : (
        <>
          <h3 style={{ marginBottom: "1rem", color: "#776B5D" }}>
            Alojamientos disponibles en {busqueda.lugar}
          </h3>
          <div className="grid-alojamientos">
            {alojamientosData.map((a) => (
              <div className="card" key={a.id}>
                <div className="carousel-container">
                  <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop
                    autoPlay
                    interval={3000}
                    stopOnHover={true}
                    swipeable={true}
                  >
                    {a.imagenes.map((img, index) => (
                      <div key={index}>
                        <img src={img} alt={`Alojamiento ${a.nombre} ${index + 1}`} />
                      </div>
                    ))}
                  </Carousel>
                  <div
                    className="heart-icon"
                    onClick={() => toggleFavorito(a.id)}
                    aria-label="Agregar a favoritos"
                  >
                    {favoritos.includes(a.id) ? (
                      <FaHeart color="#E74C3C" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </div>
                </div>

                <div className="card-info">
                  <h4>{a.nombre}</h4>
                  <p
                    className={
                      descripcionesExpand[a.id] ? "descripcion expandido" : "descripcion"
                    }
                  >
                    {a.descripcion}
                  </p>
                  {descripcionesExpand[a.id] && (
                    <div className="detalles-alojamiento">
                      <div className="detalle-item" title="Wi-Fi">
                        <FaWifi size={22} color={a.caracteristicas.wifi ? "green" : "grey"} />
                        <span style={{ marginLeft: "6px" }}>
                          {a.caracteristicas.wifi ? "Sí" : "No"}
                        </span>
                      </div>
                      <div className="detalle-item" title="Cocina">
                        <FaUtensils size={22} color={a.caracteristicas.cocina ? "green" : "grey"} />
                        <span style={{ marginLeft: "6px" }}>
                          {a.caracteristicas.cocina ? "Sí" : "No"}
                        </span>
                      </div>
                      <div className="detalle-item" title="Parrilla">
                        <FaFire size={22} color={a.caracteristicas.parrilla ? "green" : "grey"} />
                        <span style={{ marginLeft: "6px" }}>
                          {a.caracteristicas.parrilla ? "Sí" : "No"}
                        </span>
                      </div>
                      <div className="detalle-item" title="Mascotas permitidas">
                        <FaPaw size={22} color={a.caracteristicas.mascotas ? "green" : "grey"} />
                        <span style={{ marginLeft: "6px" }}>
                          {a.caracteristicas.mascotas ? "Sí" : "No"}
                        </span>
                      </div>
                      <div className="detalle-item" title="Piscina">
                        <FaWater size={22} color={a.caracteristicas.piscina ? "green" : "grey"} />
                        <span style={{ marginLeft: "6px" }}>
                          {a.caracteristicas.piscina ? "Sí" : "No"}
                        </span>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => toggleDescripcion(a.id)}
                    className="ver-mas-btn"
                  >
                    {descripcionesExpand[a.id] ? "Ver menos" : "Ver más"}
                  </button>
                  <p>
                    <strong>{a.precio}</strong>
                  </p>
                  <button onClick={() => abrirModal(a)} className="siguiente">
                    Siguiente
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modalAlojamientos">
            <h3>Completá tu reserva</h3>
            <p>
              <strong>{alojamientoSeleccionado.nombre}</strong>
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
              <button type="submit">Reservar</button>
            </form>
            {mensaje && <p className="form-message">{mensaje}</p>}
            <button onClick={cerrarModal} className="cerrarModalAlojamientos">Cerrar</button>
          </div>
        </div>
      )}

      {mostrarMensajeFavorito && (
        <div className="mensaje-favorito-flotante">
          {mensajeFavorito}
        </div>
      )}
    </div>
  );
}
