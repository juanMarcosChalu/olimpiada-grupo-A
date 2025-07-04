import React, { useState, useEffect } from "react";
import styles from "../../../styles/SectionCarrito.module.css";
import { useAuth } from "../../../hooks/useAuth";
import image_of_paris from "../../../assets/paris.jpg";
import image_of_captur from "../../../assets/captur.jpg";
import { toast } from "sonner";

function PagoMercadoPago({ productos }) {
  const [error, setError] = useState(null);

  const iniciarPago = async () => {
    try {
      const response = await fetch(`/mercadopago/create_preference`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productos),
      });

      if (!response.ok) {
        throw new Error("Error al crear la preferencia");
      }

      const data = await response.json();
      window.location.href = data.init_point;
    } catch (err) {
      console.error("Error al iniciar el pago:", err);
      setError("No se pudo iniciar el pago. Intente más tarde.");
    }
  };

  return (
    <>
      <button
        className={styles.botonCompra}
        disabled={productos.length === 0}
        onClick={iniciarPago}
      >
        Pagar con Mercado Pago
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

function SectionsCarrito() {
  const { usuario } = useAuth();
  const [servicios, setServicios] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [servicioEditando, setServicioEditando] = useState(null);
  const [loading, setLoading] = useState(true);

  const calcularDias = (inicio, fin) => {
    const start = new Date(inicio);
    const end = new Date(fin);
    const diff = end - start;
    const dias = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    return isNaN(dias) ? 1 : dias;
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };

  const actualizarServicios = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/carrito/obtenerProductos/${usuario.id}`);

      if (!response.ok) {
        throw new Error("Error al obtener los productos del carrito");
      }

      const data = await response.json();
      const serviciosProcesados = await Promise.all(
        data.map(async (producto) => {
          let imagenSrc = null;

          if (producto.tipoProducto === "paquete") {
            const primeraImagen = producto.producto_info.imagenes[0];

            if (primeraImagen?.imagen) {
              if (typeof primeraImagen.imagen === "string") {
                imagenSrc = normalizarBase64(primeraImagen.imagen);
              } else if (primeraImagen.imagen instanceof Blob) {
                imagenSrc = await blobToBase64(primeraImagen.imagen);
              }
            }
          }
          if (producto.tipoProducto === "alquilerAuto") {
            const primeraImagen = producto.producto_info.imagen_principal;
            if (primeraImagen?.imagen) {
              if (typeof primeraImagen.imagen === "string") {
                imagenSrc = normalizarBase64(primeraImagen.imagen);
              } else if (primeraImagen.imagen instanceof Blob) {
                imagenSrc = await blobToBase64(primeraImagen.imagen);
              }
            }
          }

          const fechaInicioFormateada = new Date(producto.fechaInicio).toLocaleDateString("es-AR");
          const fechaFinFormateada = new Date(producto.fechaFin).toLocaleDateString("es-AR");

          if (isNaN(new Date(producto.fechaFin))) {
            producto.fechaFin = producto.fechaInicio;
          }
          if (isNaN(new Date(producto.fechaInicio))) {
            producto.fechaInicio = new Date().toISOString().split("T")[0];
          }

          producto.fechaInicio = new Date(producto.fechaInicio).toISOString().split("T")[0];
          producto.fechaFin = new Date(producto.fechaFin).toISOString().split("T")[0];

          const servicioBase = {
            id: producto.id,
            idProducto: producto.productoID,
            nombre: producto.nombreAsignado,
            ubicacion: producto.ubicacion,
            fechaInicio: producto.fechaInicio,
            fechaFin: fechaInicioFormateada,
            precioPorDia: fechaFinFormateada,
            dias: calcularDias(producto.fechaInicio, producto.fechaFin),
          };

          switch (producto.tipoProducto) {
            case "paquete":
              if (typeof producto.producto_info.precio === "string") {
                producto.producto_info.precio = parseFloat(
                  producto.producto_info.precio.replace(/[^0-9-]+/g, "")
                );
              }
              return {
                ...servicioBase,
                categoria: "Paquete turístico",
                personas: producto.cantPersonas || 1,
                imagenSrc: imagenSrc || image_of_paris,
                precioPorDia: producto.producto_info.precio,
              };

            case "vuelo":
              if (typeof producto.producto_info.duracion === "string") {
                const partes = producto.producto_info.duracion.split(":");
                if (partes.length === 3) {
                  producto.producto_info.duracion = `${partes[0]}:${partes[1]}`;
                } else {
                  producto.producto_info.duracion = "00:00";
                }
              }

              return {
                ...servicioBase,
                categoria: "Vuelo",
                dias: 1,
                numeroVuelo: producto.numeroVuelo,
                horaSalida: producto.producto_info.duracion,
                horaLlegada: producto.horaLlegada,
                aeropuertoOrigen: producto.producto_info.aerolinea,
                aeropuertoDestino: producto.producto_info.aerolinea,
                clase: producto.clase || "Económica",
                precioPorDia: producto.producto_info.precio,
                personas: producto.cantPersonas || 1,
                escalas: producto.escalas || 0,
              };

            case "alquilerAuto":
              return {
                ...servicioBase,
                categoria: "Alquiler de auto",
                imagenSrc: imagenSrc || image_of_captur,
                precioPorDia: producto.producto_info.precio,
              };

            case "asistenciaViajero":
              return {
                ...servicioBase,
                categoria: "Asistencia al viajero",
                beneficios: producto.beneficios || [],
              };

            default:
              return null;
          }
        })
      );

      setServicios(serviciosProcesados.filter(Boolean));
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (usuario?.id) {
      actualizarServicios();
    }
  }, [usuario]);

  const abrirModal = (servicio) => {
    setServicioEditando({ ...servicio });
    setModalAbierto(true);
  };


useEffect(() => {
  //verificar user
  if (!usuario || !usuario.id) {
    toast.error("Debes iniciar sesión para ver tu carrito");
   
  } else {
    // Cargar servicios al montar el componente
    toast.success("Bienvenido al carrito");
  }
},[])

  const normalizarBase64 = (base64Str) => {
    const base64Limpio = base64Str.replace(/^base64:type\d+:/, "");

    if (base64Limpio.startsWith("data:image")) {
      return base64Limpio;
    }

    return `data:image/jpeg;base64,${base64Limpio}`;
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setServicioEditando(null);
  };

  const handleFechaChange = (campo, valor) => {
    const nuevoServicio = {
      ...servicioEditando,
      [campo]: valor,
      dias:
        servicioEditando.fechaInicio && servicioEditando.fechaFin
          ? calcularDias(servicioEditando.fechaInicio, servicioEditando.fechaFin)
          : servicioEditando.dias,
    };
    setServicioEditando(nuevoServicio);
  };

  const guardarCambios = async () => {
    if (!servicioEditando) return;

    const normalizarFecha = (fecha) => {
      if (!fecha) return null;
      if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        return fecha;
      }
      const dateObj = new Date(fecha);
      if (isNaN(dateObj.getTime())) {
        throw new Error("Formato de fecha inválido");
      }
      return dateObj.toISOString().split("T")[0];
    };

    try {
      const fechaInicioISO = normalizarFecha(servicioEditando.fechaInicio);
      const fechaFinISO = normalizarFecha(servicioEditando.fechaFin);

      if (!fechaInicioISO || !fechaFinISO) {
        throw new Error("Fechas inválidas");
      }

      const response = await fetch(
        `${BASE_URL}/carrito/editarFechas/${servicioEditando.id}/${usuario.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fechaInicio: fechaInicioISO,
            fechaFin: fechaFinISO,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al guardar");
      }

      setServicios((prev) =>
        prev.map((s) =>
          s.id === servicioEditando.id
            ? {
                ...s,
                fechaInicio: fechaInicioISO,
                fechaFin: fechaFinISO,
                dias: calcularDias(fechaInicioISO, fechaFinISO),
              }
            : s
        )
      );

      toast.success("Cambios guardados");
      cerrarModal();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  const quitarServicio = (id) => {
    setServicios((prev) => prev.filter((s) => s.id !== id));
    fetch(`/carrito/eliminarProducto/${id}/${usuario.id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        toast.success("Servicio eliminado");
      })
      .catch((error) => {
        toast.error("Error al eliminar el servicio");
      });
  };

  const productosParaPago = servicios.map((servicio) => ({
    title: servicio.nombre,
    quantity: servicio.personas || 1,
    unit_price: servicio.precioPorDia * servicio.dias,
  }));

  const subtotal = servicios.reduce(
    (acc, s) => acc + s.precioPorDia * s.dias * (s.personas || 1),
    0
  );
  const iva = subtotal * 0.21;
  const ingresosBrutos = subtotal * 0.023;
  const total = subtotal + iva + ingresosBrutos;

  if (loading) {
    return (
      <div className={styles.cargando}>
        {!usuario ? 'Debes de iniciar sesión para usar el carrito' : 'Cargando productos...'}
      </div>
    );
  }


  return (
    <>
      <section className={styles.carritoSection}>
        <div className={styles.serviciosContainer}>
          {servicios.length === 0 ? (
            <p className={styles.sinServicios}>No hay servicios agregados.</p>
          ) : (
            servicios.map((servicio) => (
              <article
                key={servicio.id}
                className={`${
                  styles.servicioCard
                } ${
                  servicio.categoria === "Vuelo" ||
                  servicio.categoria === "Asistencia al viajero"
                    ? styles.vueloCard
                    : ""
                }`}
              >
                <div className={styles.imagenContainer}>
                  {servicio.imagenSrc ? (
                    <img
                      src={servicio.imagenSrc}
                      alt={servicio.nombre}
                      className={styles.imagenServicio}
                    />
                  ) : servicio.categoria === "Vuelo" ? (
                    <div>✈️</div>
                  ) : (
                    <div>🚑</div>
                  )}
                </div>

                <div className={styles.infoServicio}>
                  <h3 className={styles.nombre} style={{ fontWeight: "700" }}>
                    {servicio.categoria}
                  </h3>
                  <p className={styles.categoria}>{servicio.nombre}</p>
                  <p className={styles.ubicacion}>📍 {servicio.ubicacion}</p>
                  <p className={styles.fechas}>
                    📅 {servicio.fechaInicio} - {servicio.fechaFin}
                    {!["Vuelo", "Asistencia al viajero"].includes(
                      servicio.categoria
                    ) && (
                      <>
                        {" "}
                        ({servicio.dias} {servicio.dias > 1 ? "días" : "día"})
                      </>
                    )}
                  </p>

                  {servicio.personas !== undefined && (
                    <p className={styles.personas}>
                      👥 {servicio.personas} persona
                      {servicio.personas > 1 ? "s" : ""}
                    </p>
                  )}

                  {servicio.categoria === "Vuelo" && (
                    <>
                      <p className={styles.horarios}>
                        🕗 {servicio.horaSalida} - {servicio.horaLlegada}
                      </p>
                      <p className={styles.aeropuertos}>
                        🛫 {servicio.aeropuertoOrigen} → 🛬{" "}
                        {servicio.aeropuertoDestino}
                      </p>
                      <p className={styles.clase}>Clase: {servicio.clase}</p>
                      <p className={styles.escalas}>Escalas: {servicio.escalas}</p>
                    </>
                  )}

                  {servicio.categoria === "Asistencia al viajero" && (
                    <ul className={styles.listaBeneficios}>
                      {servicio.beneficios?.map((b, index) => (
                        <li key={index}>✅ {b}</li>
                      ))}
                    </ul>
                  )}

                  {servicio.categoria !== "Vuelo" && (
                    <>
                      <p className={styles.precio}>
                        Precio x día: ${servicio.precioPorDia}
                      </p>
                      <p className={styles.totalServicio}>
                        Total: $
                        {(servicio.precioPorDia *
                          servicio.dias *
                          (servicio.personas || 1)
                        ).toLocaleString()}
                      </p>
                    </>
                  )}

                  <div className={styles.botonesServicio}>
                    <button
                      className={styles.btnQuitar}
                      onClick={() => quitarServicio(servicio.id)}
                    >
                      Quitar
                    </button>
                    {servicio.categoria !== "Vuelo" && (
                      <button
                        className={styles.btnEditar}
                        onClick={() => abrirModal(servicio)}
                      >
                        Editar
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <aside className={styles.resumenContainer}>
          <h2>Resumen</h2>
          <p>Subtotal: ${subtotal.toLocaleString()}</p>
          <p>IVA (21%): ${iva.toLocaleString()}</p>
          <p>Ingresos Brutos (2.3%): ${ingresosBrutos.toLocaleString()}</p>
          <p className={styles.totalFinal}>Total: ${total.toLocaleString()}</p>
          <PagoMercadoPago productos={productosParaPago} />
        </aside>
      </section>

      {modalAbierto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Editar servicio</h3>
            <label>
              Fecha Inicio
              <input
                type="date"
                value={servicioEditando?.fechaInicio || ""}
                onChange={(e) => handleFechaChange("fechaInicio", e.target.value)}
              />
            </label>
            <label>
              Fecha Fin
              <input
                type="date"
                value={servicioEditando?.fechaFin || ""}
                onChange={(e) => handleFechaChange("fechaFin", e.target.value)}
              />
            </label>
            <div className={styles.modalBotones}>
              <button className={styles.btnGuardar} onClick={guardarCambios}>
                Guardar
              </button>
              <button className={styles.btnCancelar} onClick={cerrarModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SectionsCarrito;
