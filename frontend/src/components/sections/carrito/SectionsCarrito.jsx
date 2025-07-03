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
      const response = await fetch("http://localhost:3000/mercadopago/create_preference", {
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
      const response = await fetch(`http://localhost:3000/carrito/obtenerProductos/${usuario.id}`);
      if (!response.ok) {
        throw new Error("Error al obtener los productos del carrito");
      }

      const data = await response.json();
      const serviciosProcesados = await Promise.all(
        data.map(async (producto) => {
        let imagenSrc = null;

          // Procesamiento de imágenes para paquetes
          if (producto.tipoProducto === "paquete") {
            const primeraImagen = producto.producto_info.imagenes[0];
           

            if (primeraImagen?.imagen) {
              if (typeof primeraImagen.imagen === 'string') {
                // Caso 1: Es un string Base64 (posiblemente mal formateado)
                imagenSrc = normalizarBase64(primeraImagen.imagen);
              } else if (primeraImagen.imagen instanceof Blob) {
                // Caso 2: Es un Blob (lo convertimos)
                imagenSrc = await blobToBase64(primeraImagen.imagen);
              }
            }

          }
          if (producto.tipoProducto === "alquilerAuto") {
            console.log(producto);
            
            console.log(producto.producto_info);
            const primeraImagen = producto.producto_info.imagen_principal;
            if (primeraImagen?.imagen) {
              if (typeof primeraImagen.imagen === 'string') {
                // Caso 1: Es un string Base64 (posiblemente mal formateado)
                imagenSrc = normalizarBase64(primeraImagen.imagen);
              } else if (primeraImagen.imagen instanceof Blob) {
                // Caso 2: Es un Blob (lo convertimos)
                imagenSrc = await blobToBase64(primeraImagen.imagen);
              }
            }
            
          }

          //convertir fecha de inicio y fin a formato dd/mm/aa, date y no date time
          const fechaInicioFormateada = new Date(producto.fechaInicio).toLocaleDateString("es-AR");
          const fechaFinFormateada = new Date(producto.fechaFin).toLocaleDateString("es-AR");
          // Si la fecha de fin es inválida, usar la fecha de inicio
          if (isNaN(new Date(producto.fechaFin))) {
            producto.fechaFin = producto.fechaInicio;
          }
          // Si la fecha de inicio es inválida, usar la fecha actual
          if (isNaN(new Date(producto.fechaInicio))) {
            producto.fechaInicio = new Date().toISOString().split("T")[0];
          }
          // Asegurarse de que las fechas estén en formato correcto
          producto.fechaInicio = new Date(producto.fechaInicio).toISOString().split("T")[0];
          producto.fechaFin = new Date(producto.fechaFin).toISOString().split("T")[0];



        
          // Estructura base común
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

          // Tipo específico de producto
          switch (producto.tipoProducto) {
            case "paquete":
 
              if (typeof producto.producto_info.precio === 'string') {
                producto.producto_info.precio = parseFloat(producto.producto_info.precio.replace(/[^0-9-]+/g, ""));
              }
              return {
                ...servicioBase,
                categoria: "Paquete turístico",
                personas: producto.cantPersonas || 1,
                imagenSrc: imagenSrc || image_of_paris,
                precioPorDia: producto.producto_info.precio,
              };

            case "vuelo":
              console.log(producto);
              //corregir la duracion del vuelo a formato hh:mm
              if (typeof producto.producto_info.duracion === 'string') {
                const partes = producto.producto_info.duracion.split(":");
                if (partes.length === 3) {
                  producto.producto_info.duracion = `${partes[0]}:${partes[1]}`;
                } else {
                  producto.producto_info.duracion = "00:00"; // Valor por defecto si no es válido
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

                
                // Aquí podrías agregar más campos específicos del vuelo
                //lo que tiene vuelo:  'id', v.id,
                // 'origen', v.origen_ida,
                // 'destino', v.destino_ida,
                // 'fecha_salida', v.fecha_ida,
                // 'fecha_llegada', v.fecha_vuelta,
                // 'aerolinea', v.aerolinea,
                // 'precio', v.precio,
                // 'duracion', v.duracion_ida
                
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

  const normalizarBase64 = (base64Str) => {
    // Elimina metadatos incorrectos como "base64:type251:"
    const base64Limpio = base64Str.replace(/^base64:type\d+:/, '');

    // Si ya incluye el prefijo "data:image/...", lo devolvemos tal cual
    if (base64Limpio.startsWith('data:image')) {
      return base64Limpio;
    }

    // Si es solo el Base64 puro, le añadimos el prefijo para imágenes PNG (o JPEG)
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
      dias: servicioEditando.fechaInicio && servicioEditando.fechaFin
        ? calcularDias(servicioEditando.fechaInicio, servicioEditando.fechaFin)
        : servicioEditando.dias,
    };
    setServicioEditando(nuevoServicio);
  };

 const guardarCambios = async () => {
  if (!servicioEditando) return;

  // Función para normalizar cualquier formato a YYYY-MM-DD
  const normalizarFecha = (fecha) => {
    if (!fecha) return null;
    
    // Si ya está en formato ISO (input type="date" en inglés)
    if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      return fecha;
    }
    
    // Para formatos locales (ej: DD/MM/YYYY)
    const dateObj = new Date(fecha);
    if (isNaN(dateObj.getTime())) {
      throw new Error('Formato de fecha inválido');
    }
    
    return dateObj.toISOString().split('T')[0];
  };

  try {
    // Normalizar fechas
    const fechaInicioISO = normalizarFecha(servicioEditando.fechaInicio);
    const fechaFinISO = normalizarFecha(servicioEditando.fechaFin);

    if (!fechaInicioISO || !fechaFinISO) {
      throw new Error('Fechas inválidas');
    }

    const response = await fetch(
      `http://localhost:3000/carrito/editarFechas/${servicioEditando.id}/${usuario.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fechaInicio: fechaInicioISO,
          fechaFin: fechaFinISO
        }),
        credentials: "include"
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al guardar");
    }

    // Actualizar estado
    setServicios(prev => prev.map(s => 
      s.id === servicioEditando.id ? { 
        ...s, 
        fechaInicio: fechaInicioISO,
        fechaFin: fechaFinISO,
        dias: calcularDias(fechaInicioISO, fechaFinISO)
      } : s
    ));

    toast.success("Cambios guardados");
    cerrarModal();
  } catch (error) {
    console.error("Error:", error);
    toast.error(error.message);
  }
};

  const quitarServicio = (id) => {
    setServicios(prev => prev.filter(s => s.id !== id));
    // Aquí podrías hacer una llamada al backend para eliminar el servicio del carrito
    fetch(`http://localhost:3000/carrito/eliminarProducto/${id}/${usuario.id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(response => {
        
        return response.json();
      })
      .then(data => {
        toast.succes("Servicio eliminado:", data);
      })
      .catch(error => {
        toast("servicio Eliminado:");
      });
  };

  const productosParaPago = servicios.map(servicio => ({
    title: servicio.nombre,
    quantity: servicio.personas || 1,
    unit_price: servicio.precioPorDia * servicio.dias,
  }));

  const subtotal = servicios.reduce((acc, s) => acc + s.precioPorDia * s.dias * (s.personas || 1), 0);
  const iva = subtotal * 0.21;
  const ingresosBrutos = subtotal * 0.023;
  const total = subtotal + iva + ingresosBrutos;

  if (loading) {
    return <div className={styles.cargando}>Cargando productos...</div>;
  }

  return (
    <>
      <section className={styles.carritoSection}>
        <div className={styles.serviciosContainer}>
          {servicios.length === 0 ? (
            <p className={styles.sinServicios}>No hay servicios agregados.</p>
          ) : (
            servicios.map(servicio => (
              <article
                key={servicio.id}
                className={`${styles.servicioCard} ${servicio.categoria === "Vuelo" || servicio.categoria === "Asistencia al viajero"
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
                    {!["Vuelo", "Asistencia al viajero"].includes(servicio.categoria) && (
                      <> ({servicio.dias} {
                        servicio.dias > 1 ? "días" : "día"}
                      )</>
                    )}
                  </p>

                  {servicio.personas !== undefined && (
                    <p className={styles.personas}>
                      👥 {servicio.personas} persona{servicio.personas > 1 ? "s" : ""}
                    </p>
                  )}

                  {servicio.categoria === "Vuelo" && (
                    <>
                      <p className={styles.horarios}>
                        🕗 {servicio.horaSalida} - {servicio.horaLlegada}
                      </p>
                      <p className={styles.aeropuertos}>
                        🛫 {servicio.aeropuertoOrigen} → 🛬 {servicio.aeropuertoDestino}
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
                        {(servicio.precioPorDia * servicio.dias * (servicio.personas || 1))
                          .toLocaleString()}
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