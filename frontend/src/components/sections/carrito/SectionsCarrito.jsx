import React, { useState } from "react"; 
import styles from "../../../styles/SectionCarrito.module.css";

import image_of_paris from "../../../assets/paris.jpg";
import image_of_captur from "../../../assets/captur.jpg";

function SectionsCarrito() {
  const [servicios, setServicios] = useState([
    {
      id: 1,
      categoria: "Alquiler de auto",
      nombre: "Renault Captur",
      ubicacion: "Río de Janeiro",
      fechaInicio: "2025-07-15",
      fechaFin: "2025-07-20",
      dias: 5,
      precioPorDia: 44000,
      imagenSrc: image_of_captur,
    },
    
    {
      id: 2,
      categoria: "Paquete turístico",
      nombre: "París, Francia",
      ubicacion: "París",
      fechaInicio: "2025-08-10",
      fechaFin: "2025-08-15",
      dias: 5,
      precioPorDia: 240000,
      imagenSrc: image_of_paris,
      personas: 2, 
    },
  ]);

  const [mostrarPago, setMostrarPago] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [servicioEditando, setServicioEditando] = useState(null);

  const abrirModal = (servicio) => {
    setServicioEditando({ ...servicio });
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setServicioEditando(null);
  };

  // Esta función actualiza la fecha y recalcula días automáticamente
  const handleFechaChange = (campo, valor) => {
    const nuevoServicio = {
      ...servicioEditando,
      [campo]: valor,
    };

    if (nuevoServicio.fechaInicio && nuevoServicio.fechaFin) {
      const inicio = new Date(nuevoServicio.fechaInicio);
      const fin = new Date(nuevoServicio.fechaFin);
      const diffTime = fin - inicio;
      const diffDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      nuevoServicio.dias = diffDias > 0 ? diffDias : 1;
    }

    setServicioEditando(nuevoServicio);
  };

  const guardarCambios = () => {
    if (!servicioEditando) return;
    const actualizado = { ...servicioEditando };

    setServicios((prev) =>
      prev.map((s) => (s.id === actualizado.id ? actualizado : s))
    );
    cerrarModal();
  };

  const quitarServicio = (id) => {
    setServicios(servicios.filter((s) => s.id !== id));
  };

  const subtotal = servicios.reduce(
    (acc, s) => acc + s.precioPorDia * s.dias,
    0
  );
  const iva = subtotal * 0.21;
  const ingresosBrutos = subtotal * 0.023;
  const total = subtotal + iva + ingresosBrutos;

  return (
    <>
      <section className={styles.carritoSection}>
        <div className={styles.serviciosContainer}>
          {servicios.length === 0 ? (
            <p className={styles.sinServicios}>No hay servicios agregados.</p>
          ) : (
            servicios.map((servicio) => (
              
              <article key={servicio.id} className={styles.servicioCard}>
                {console.log(servicio)}
                <div className={styles.imagenContainer}>
                  <img
                    src={servicio.imagenSrc}
                    alt={servicio.nombre}
                    className={styles.imagenServicio}
                  />
                </div>
                <div className={styles.infoServicio}>
                  <h3 className={styles.categoria}>{servicio.categoria}</h3>
                  <p className={styles.nombre}>{servicio.nombre}</p>
                  <p className={styles.ubicacion}>📍 {servicio.ubicacion}</p>
                  <p className={styles.fechas}>
                    📅 {servicio.fechaInicio} - {servicio.fechaFin} ({servicio.dias}{" "}
                    días)
                  </p>
                  {servicio.personas !== undefined && (
                    <p className={styles.personas}>
                      👥 {servicio.personas} persona
                      {servicio.personas > 1 ? "s" : ""}
                    </p>
                  )}
                  <p className={styles.precio}>
                    💲 {servicio.precioPorDia.toLocaleString()} ARS x día
                  </p>
                  <p className={styles.totalServicio}>
                    Total:{" "}
                    <strong>
                      ${(servicio.precioPorDia * servicio.dias).toLocaleString()} ARS
                    </strong>
                  </p>
                  <div className={styles.botonesServicio}>
                    <button
                      className={styles.btnQuitar}
                      onClick={() => quitarServicio(servicio.id)}
                    >
                      Quitar
                    </button>
                    <button
                      className={styles.btnEditar}
                      onClick={() => abrirModal(servicio)}
                    >
                      Editar
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <aside className={styles.resumenContainer}>
          <h2>Resumen Final</h2>

          {/* Resumen SIEMPRE visible */}
          <p>Subtotal: ${subtotal.toLocaleString()} ARS</p>
          <p>IVA 21%: ${iva.toLocaleString()}</p>
          <p>Ingresos Brutos 2.3%: ${ingresosBrutos.toLocaleString()}</p>
          <p className={styles.totalFinal}>
            Total: <strong>${total.toLocaleString()} ARS</strong>
          </p>

          {/* Métodos de pago que aparecen solo al hacer click */}
          {mostrarPago && (
            <section className={styles.metodosPago}>
              <h3>Elegí tu forma de pago</h3>
              <button
                className={styles.btnMercadoPago}
                onClick={() => alert("Integración con Mercado Pago")}
              >
                Pagar con Mercado Pago
              </button>
            </section>
          )}

          <button
            className={styles.botonCompra}
            onClick={() => setMostrarPago(!mostrarPago)}
            disabled={servicios.length === 0}
          >
            {mostrarPago ? "Cancelar" : "Realizar compra"}
          </button>
        </aside>
      </section>

      {modalAbierto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Editar Servicio</h3>

            <label>
              Nombre:
              <input
                type="text"
                value={servicioEditando.nombre}
                onChange={(e) =>
                  setServicioEditando({
                    ...servicioEditando,
                    nombre: e.target.value,
                  })
                }
              />
            </label>

            <label>
              Fecha inicio:
              <input
                type="date"
                value={servicioEditando.fechaInicio}
                onChange={(e) => handleFechaChange("fechaInicio", e.target.value)}
              />
            </label>

            <label>
              Fecha fin:
              <input
                type="date"
                value={servicioEditando.fechaFin}
                onChange={(e) => handleFechaChange("fechaFin", e.target.value)}
              />
            </label>

            {(servicioEditando.categoria === "Vuelo" ||
              servicioEditando.categoria === "Paquete turístico") && (
              <label>
                Cantidad de personas:
                <input
                  type="number"
                  min="1"
                  value={servicioEditando.personas || 1}
                  onChange={(e) =>
                    setServicioEditando({
                      ...servicioEditando,
                      personas: Math.max(1, Number(e.target.value)),
                    })
                  }
                />
              </label>
            )}

            <div className={styles.modalBotones}>
              <button onClick={guardarCambios} className={styles.btnGuardar}>
                Guardar
              </button>
              <button onClick={cerrarModal} className={styles.btnCancelar}>
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
