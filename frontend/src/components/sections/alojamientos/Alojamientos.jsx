import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaHeart, FaRegHeart, FaWifi, FaUtensils, FaFire, FaPaw, FaWater } from "react-icons/fa";
import "../../../styles/Alojamientos.css";
import { useFetch } from "../../../hooks/useFetch";
import usePost from "../../../hooks/usePost.js";
import { useAuth } from "../../../hooks/useAuth.js";
import { toast } from "sonner";

export default function Alojamientos() {
  const [busqueda, setBusqueda] = useState({
    lugar: "",
    personas: "",
    entrada: "",
    salida: "",
  });

  const { usuario } = useAuth();
  const { data } = useFetch('/alojamientos');
  const [alojamientos, setAlojamientos] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [alojamientoSeleccionado, setAlojamientoSeleccionado] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [descripcionesExpand, setDescripcionesExpand] = useState({});
  const { post } = usePost();
  const [mensajeFavorito, setMensajeFavorito] = useState("");
  const [mostrarMensajeFavorito, setMostrarMensajeFavorito] = useState(false);
  const [reserva, setReserva] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    fechaInicio: "",
    fechaFin: ""
  });

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    const alojamientosProcesados = data.map(alojamiento => {
      const imagenesValidas = Array.isArray(alojamiento.imagenes) ? alojamiento.imagenes : [];
      const imagenesSrc = imagenesValidas.reduce((acc, imagen) => {
        if (imagen?.tipo && imagen?.data) {
          acc.push(`data:${imagen.tipo};base64,${imagen.data}`);
        }
        return acc;
      }, []);

      return {
        ...alojamiento,
        imagenesSrc,
        tieneImagenes: imagenesSrc.length > 0
      };
    });

    setAlojamientos(alojamientosProcesados);
  }, [data]);

  const handleBuscar = (e) => {
    e.preventDefault();
    if (!busqueda.lugar || !busqueda.personas || !busqueda.entrada || !busqueda.salida) {
      toast.error("Completá todos los campos.");
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
    setReserva({ nombre: "", correo: "", telefono: "", fechaInicio: "", fechaFin: "" });
    setMensaje("");
  };

  const handleReservaChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

  const handleConfirmarReserva = async (e) => {
    e.preventDefault();
    if (!usuario) {
      toast.error("Debes iniciar sesión para añadir vuelos al carrito.");
      return;
    }
    if (!reserva.nombre || !reserva.correo || !reserva.telefono) {
      toast.error("Completá todos los campos.");
      return;
    }
    if (!reserva.fechaInicio || !reserva.fechaFin) {
      toast.error("Completá las fechas de inicio y fin.");
      return;
    }
    if (new Date(reserva.fechaInicio) >= new Date(reserva.fechaFin)) {
      toast.error("La fecha de inicio debe ser anterior a la fecha de fin.");
      return;
    }

    const response = await post("/carrito/anadirProducto", {
      userId: usuario.id,
      tipoProducto: "alojamiento",
      productoID: alojamientoSeleccionado.id,
      nombreAsignado: reserva.nombre,
      telefonoAsignado: reserva.telefono,
      emailAsignado: reserva.correo,
      fechaInicio: reserva.fechaInicio,
      fechaFin: reserva.fechaFin,
      cantPersonas: 1,
    });

    if (response.error) {
      console.log("Error al confirmar la reserva." + response.error);
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
    <div className={`alojamiento-container ${mostrarResultados ? "sin-fondo" : "con-fondo"}`}>
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
            type="text"
            name="entrada"
            placeholder="Seleccioná la fecha de entrada"
            onFocus={(e) => e.target.type = "date"}
            onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
            value={busqueda.entrada}
            onChange={(e) => setBusqueda({ ...busqueda, entrada: e.target.value })}
          />

          <input
            type="text"
            name="salida"
            placeholder="Seleccioná la fecha de salida"
            onFocus={(e) => e.target.type = "date"}
            onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
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
          {/* ... Aquí seguiría el renderizado de resultados ... */}
        </>
      )}

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modalAlojamientos">
            <h3>Completá tu reserva</h3>
            <p>
              <strong>{alojamientoSeleccionado.nombre}</strong>
            </p>
            <form onSubmit={handleConfirmarReserva}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre y apellido"
                value={reserva.nombreAsignado}
                onChange={handleReservaChange}
              />
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={reserva.telefonoAsignado}
                onChange={handleReservaChange}
              />
              <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={reserva.emailAsignado}
                onChange={handleReservaChange}
              />
              <input
                type="text"
                name="fechaInicio"
                placeholder="Fecha de entrada"
                onFocus={(e) => e.target.type = "date"}
                onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
                onChange={handleReservaChange}
                value={reserva.fechaInicio}
              />
              <input
                type="text"
                name="fechaFin"
                placeholder="Fecha de salida"
                onFocus={(e) => e.target.type = "date"}
                onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
                onChange={handleReservaChange}
                value={reserva.fechaFin}
              />
              <button type="submit">Reservar</button>
              <button onClick={cerrarModal} className="cerrarModalAlojamientos">Cerrar</button>
            </form>
            {mensaje && <p className="form-message">{mensaje}</p>}
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
