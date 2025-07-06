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
  const { usuario, cargando,isLogin } = useAuth();
  const { data, loading, error } = useFetch('/alojamientos');
  const [alojamientos, setAlojamientos] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [alojamientoSeleccionado, setAlojamientoSeleccionado] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [descripcionesExpand, setDescripcionesExpand] = useState({});
  const { post, response } = usePost();
  const [mensajeFavorito, setMensajeFavorito] = useState("");
  const [mostrarMensajeFavorito, setMostrarMensajeFavorito] = useState(false);

  const [reserva, setReserva] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });
  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    const alojamientosProcesados = data.map(alojamiento => {
      // Verificar que exista el array de imágenes
      const imagenesValidas = Array.isArray(alojamiento.imagenes)
        ? alojamiento.imagenes
        : [];

      // Crear array de src válidos
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
    console.log(alojamientosProcesados);

  }, [data]);


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
   //comprobar fechas
    if (!reserva.fechaInicio || !reserva.fechaFin) {
      toast.error("Completá las fechas de inicio y fin.");
      return;
    }
    if (new Date(reserva.fechaInicio) >= new Date(reserva.fechaFin)) {
      toast.error("La fecha de inicio debe ser anterior a la fecha de fin.");
      return;
    }
    
    const response = await post("/carrito/anadirProducto", {
      userId:usuario.id,
      tipoProducto: "alojamiento",
      productoID: alojamientoSeleccionado.id,
      nombreAsignado: reserva.nombre,
      telefonoAsignado: reserva.telefono,
      emailAsignado: reserva.correo,
      fechaInicio: reserva.fechaInicio,
      fechaFin: reserva.fechaFin,
      cantPersonas:1,
    });

    if (response.error) {
      console.log("Error al confirmar la reserva."+error);
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
    <div
      className={`alojamiento-container ${mostrarResultados ? "sin-fondo" : "con-fondo"
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
            {alojamientos.map((a) => (
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
                    {a.imagenesSrc.map((img, index) => (
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
              <input type="date" name="fechaInicio" onChange={handleReservaChange} value={reserva.fechaInicio} />
              <input type="date" name="fechaFin" onChange={handleReservaChange} value={reserva.fechaFin} />
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
