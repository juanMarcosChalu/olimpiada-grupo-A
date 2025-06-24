import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
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

  const [reserva, setReserva] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });

  const alojamientosData = [
    {
      id: 1,
      nombre: "Cabañas Los Arrayanes",
      descripcion: "Vista al lago · Hasta 5 personas · Cocina completa",
      precio: "$312.000 ARS · 7 noches",
      imagenes: [image_of_cabañas_lago, image_of_cabañas_lago, image_of_cabañas_lago],
    },
    {
      id: 2,
      nombre: "Departamento Bariloche",
      descripcion: "Centro Cívico · Para 2 personas · Wi-Fi gratis",
      precio: "$278.000 ARS · 7 noches",
      imagenes: [image_of_departamento, image_of_departamento, image_of_departamento],
    },
    {
      id: 3,
      nombre: "Hostel Patagonia",
      descripcion: "Para 1-4 personas · Baño privado",
      precio: "$180.000 ARS · 7 noches",
      imagenes: [image_of_depto_patagonia, image_of_depto_patagonia, image_of_depto_patagonia],
    },
    {
      id: 4,
      nombre: "EcoLodge del Bosque",
      descripcion: "Rodeado de naturaleza · Piscina climatizada",
      precio: "$350.000 ARS · 7 noches",
      imagenes: [image_of_cabañas_lago, image_of_cabañas_lago, image_of_cabañas_lago],
    },
    {
      id: 5,
      nombre: "Suite Panorámica",
      descripcion: "Vista a la montaña · Jacuzzi privado",
      precio: "$420.000 ARS · 7 noches",
      imagenes: [image_of_depto_catedral, image_of_depto_catedral, image_of_depto_catedral],
    },
    {
      id: 6,
      nombre: "Cabaña Familiar Andina",
      descripcion: "Ideal para grupos grandes · Parrilla",
      precio: "$299.000 ARS · 7 noches",
      imagenes: [image_of_departamento, image_of_departamento, image_of_departamento],
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
    // Simulación de redirección al carrito
    console.log("Reserva confirmada. Datos enviados al carrito:", {
      ...reserva,
      alojamiento: alojamientoSeleccionado,
    });
    setMensaje("¡Reserva confirmada! Redirigiendo al carrito...");
    setTimeout(() => {
      window.location.href = "/carrito"; // Ajustar según tu ruta real
    }, 1500);
  };

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
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
            <option value="">Cantidad de personas</option>
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
                  <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
                    {a.imagenes.map((img, index) => (
                      <div key={index}>
                        <img src={img} alt={`Alojamiento ${a.nombre} ${index + 1}`} />
                      </div>
                    ))}
                  </Carousel>
                  <div className="heart-icon" onClick={() => toggleFavorito(a.id)}>
                    {favoritos.includes(a.id) ? <FaHeart color="#E74C3C" /> : <FaRegHeart />}
                  </div>
                </div>
                <h4>{a.nombre}</h4>
                <p>{a.descripcion}</p>
                <p>
                  <strong>{a.precio}</strong>
                </p>
                <button onClick={() => abrirModal(a)}>Siguiente</button>
              </div>
            ))}
          </div>
        </>
      )}

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
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
            <button onClick={cerrarModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
