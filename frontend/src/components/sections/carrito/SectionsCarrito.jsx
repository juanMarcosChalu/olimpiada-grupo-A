import React, { useState } from "react";
import styles from "../../../styles/SectionCarrito.module.css";

import image_of_paris from "../../../assets/paris.jpg";
import image_of_captur from "../../../assets/captur.jpg";

function PagoMercadoPago({ productos }) {
  const [error, setError] = useState(null);

  const iniciarPago = async () => {
    try {
      const response = await fetch("http://localhost:3001/create_preference", {
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
  const calcularDias = (inicio, fin) => {
    const start = new Date(inicio);
    const end = new Date(fin);
    const diff = end - start;
    const dias = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    return isNaN(dias) ? 1 : dias;
  };

  const [servicios, setServicios] = useState([
    {
      id: 1,
      categoria: "Alquiler de auto",
      nombre: "Renault Captur",
      ubicacion: "Río de Janeiro",
      fechaInicio: "2025-07-15",
      fechaFin: "2025-07-20",
      dias: calcularDias("2025-07-15", "2025-07-20"),
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
      dias: calcularDias("2025-08-10", "2025-08-15"),
      precioPorDia: 240000,
      imagenSrc: image_of_paris,
      personas: 2,
    },
    {
      id: 3,
      categoria: "Vuelo",
      nombre: "Buenos Aires - Madrid",
      ubicacion: "Madrid",
      fechaInicio: "2025-09-01",
      fechaFin: "2025-09-01",
      dias: 1,
      precioPorDia: 150000,
      numeroVuelo: "AR1234",
      horaSalida: "08:00",
      horaLlegada: "22:00",
      aeropuertoOrigen: "AEP",
      aeropuertoDestino: "MAD",
      clase: "Económica",
      escalas: 0,
    },
    {
      id: 4,
      categoria: "Asistencia al viajero",
      nombre: "Plan Estándar",
      ubicacion: "Cobertura internacional",
      fechaInicio: "2025-07-15",
      fechaFin: "2025-07-22",
      dias: calcularDias("2025-07-15", "2025-07-22"),
      precioPorDia: 100000,
      beneficios: [
        "Atención médica hasta 10.000.000 ARG",
        "Hospitalización y medicación",
        "Asistencia legal",
        "Equipaje hasta 500.000 ARG",
        "No incluye protección de móviles",
      ],
    },
  ]);

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

  const handleFechaChange = (campo, valor) => {
    const nuevoServicio = {
      ...servicioEditando,
      [campo]: valor,
    };

    if (nuevoServicio.fechaInicio && nuevoServicio.fechaFin) {
      nuevoServicio.dias = calcularDias(
        nuevoServicio.fechaInicio,
        nuevoServicio.fechaFin
      );
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

  // Preparar productos para MercadoPago (el body que envía el front al backend)
  const productosParaPago = servicios.map((servicio) => ({
    title: servicio.nombre,
    quantity: servicio.personas || 1,
    unit_price: servicio.precioPorDia * servicio.dias,
  }));

  const subtotal = servicios.reduce((acc, s) => {
    const cantidadPersonas = s.personas || 1;
    return acc + s.precioPorDia * s.dias * cantidadPersonas;
  }, 0);

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
              <article
                key={servicio.id}
                className={`${styles.servicioCard} ${
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
                    {servicio.categoria !== "Vuelo" &&
                      servicio.categoria !== "Asistencia al viajero" && (
                        <> ({servicio.dias} días)</>
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
                        Precio x día: ${servicio.precioPorDia.toLocaleString()}
                      </p>
                      <p className={styles.totalServicio}>
                        Total: $
                        {(
                          servicio.precioPorDia *
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
                value={servicioEditando.fechaInicio}
                onChange={(e) => handleFechaChange("fechaInicio", e.target.value)}
              />
            </label>

            <label>
              Fecha Fin
              <input
                type="date"
                value={servicioEditando.fechaFin}
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
