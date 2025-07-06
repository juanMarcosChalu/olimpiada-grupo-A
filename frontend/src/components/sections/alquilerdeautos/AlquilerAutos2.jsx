import React, { useState, useEffect } from "react";
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
    personas: "",
  });

  const { data } = useFetch(`/autos`);
  const [autos, setAutos] = useState([]);
  const { post } = usePost();
  const { usuario } = useAuth();
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [autoSeleccionado, setAutoSeleccionado] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [mensajeFavorito, setMensajeFavorito] = useState("");
  const [mostrarMensajeFavorito, setMostrarMensajeFavorito] = useState(false);
  const [descripcionExpandida, setDescripcionExpandida] = useState(null);
  const [reserva, setReserva] = useState({ nombre: "", correo: "", telefono: "", fecha: "", fechaEntrega: "" });

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

  const handleChange = (e) => {
    setBusqueda({ ...busqueda, [e.target.name]: e.target.value });
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    const { lugarRetiro, fechaRetiro, fechaEntrega, pasajeros } = busqueda;
    if (!lugarRetiro || !fechaRetiro || !fechaEntrega || !pasajeros) {
      toast.error("Completá todos los campos de búsqueda.");
      return;
    }
    setMostrarResultados(true);
  };

  const abrirModal = (auto) => {
    setAutoSeleccionado(auto);
    setMostrarModal(true);
    setReserva({ nombre: "", correo: "", telefono: "", fecha: "", fechaEntrega: "" });
  };

  const cerrarModal = () => setMostrarModal(false);

  const handleReservaChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

  const handleConfirmarReserva = async (e) => {
    e.preventDefault();
    const { nombre, correo, telefono, fecha, fechaEntrega } = reserva;

    if (!usuario) {
      toast.error("Debes iniciar sesión para realizar una reserva.");
      return;
    }

    if (!nombre || !correo || !telefono || !fecha || !fechaEntrega) {
      toast.error("Completá todos los campos del formulario.");
      return;
    }

    if (new Date(fecha) >= new Date(fechaEntrega)) {
      toast.error("La fecha de retiro debe ser anterior a la de entrega.");
      return;
    }

    const response = await post("/carrito/anadirProducto", {
      userId: usuario.id,
      tipoProducto: "alquilerAuto",
      productoID: autoSeleccionado.id,
      nombreAsignado: nombre,
      telefonoAsignado: telefono,
      emailAsignado: correo,
      fechaInicio: fecha,
      fechaFin: fechaEntrega,
      cantPersonas: 1,
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
      }}
    >
      {!mostrarResultados && (
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
            placeholder="Seleccioná la fecha de retiro del vehiculo"
            onFocus={(e) => e.target.type = "date"}
            onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
            value={busqueda.entrada}
            onChange={(e) => setBusqueda({ ...busqueda, entrada: e.target.value })}
          />

          <input
            type="text"
            name="salida"
            placeholder="Seleccioná la fecha de entrega del vehiculo"
            onFocus={(e) => e.target.type = "date"}
            onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
            value={busqueda.salida}
            onChange={(e) => setBusqueda({ ...busqueda, salida: e.target.value })}
          />

          <button type="submit">Buscar</button>
        </form>
      )}

      {/* ... resto del código sin cambios ... */}

      {mostrarModal && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modalAlojamientos" onClick={(e) => e.stopPropagation()}>
            <h3>Reservar {autoSeleccionado.nombre}</h3>
            <form onSubmit={handleConfirmarReserva}>
              <input type="text" name="nombre" placeholder="Nombre completo" value={reserva.nombre} onChange={handleReservaChange} />
              <input type="email" name="correo" placeholder="Correo electrónico" value={reserva.correo} onChange={handleReservaChange} />
              <input type="tel" name="telefono" placeholder="Teléfono" value={reserva.telefono} onChange={handleReservaChange} />
              <input type="date" name="fecha" placeholder="Seleccioná la fecha de retiro" value={reserva.fecha} onChange={handleReservaChange} />
              <input type="date" name="fechaEntrega" placeholder="Seleccioná la fecha de entrega" value={reserva.fechaEntrega} onChange={handleReservaChange} />
              <button type="submit">Confirmar reserva</button>
              <button onClick={cerrarModal} className="cerrarModalAlojamientos">Cancelar</button>
            </form>
          </div>
        </div>
      )}

      {mostrarMensajeFavorito && <div className="mensaje-favorito-flotante">{mensajeFavorito}</div>}
    </div>
  );
}
