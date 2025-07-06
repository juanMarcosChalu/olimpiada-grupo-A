import styles from "../../../styles/SectionNotificaciones.module.css";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

function SectionNotificaciones() {
  const [notificaciones, setNotificaciones] = useState([
    {
      id: 1,
      titulo: "Tu pedido fue confirmado con éxito",
      fecha: "15 jun 2025, 14:30",
      mensaje:
        "Gracias por comprar el paquete Santorini. Paquete para 2 personas · 7 noches · vuelo + hotel incluido · Precio: $2.200.200 ARS",
      leida: false,
    },
    {
      id: 2,
      titulo: "Recordatorio: Actualiza tus datos personales",
      fecha: "14 jun 2025, 10:00",
      mensaje:
        "Por favor, revisa y actualiza tus datos personales para continuar con el proceso de reserva sin inconvenientes.",
      leida: false,
    },
  ]);

  const marcarComoLeido = (id) => {
    setNotificaciones((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, leida: true } : n
      )
    );
  };

  const eliminarNotificacion = (id) => {
    setNotificaciones((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <section className={styles.sectionNotificaciones}>
      <div className={styles.notificacionesContainerFlex}>
        {notificaciones.length === 0 ? (
          <h1 className={styles.noNotificacionesmessage}>
            No tienes más notificaciones
          </h1>
        ) : (
          notificaciones.map((n) => (
            <article
              key={n.id}
              className={styles.notificaciones}
              style={{ opacity: n.leida ? 0.6 : 1 }}
            >
              <header className={styles.notificacionesHeader}>
                <h1>{n.titulo}</h1>
                <p className={styles.date}>{n.fecha}</p>
              </header>
              <p className={styles.notificacionesInfo}>{n.mensaje}</p>
              <footer className={styles.notificacionesButtons}>
                {!n.leida && (
                  <button onClick={() => marcarComoLeido(n.id)}>
                    Marcar como leído
                  </button>
                )}
                <button onClick={() => eliminarNotificacion(n.id)}>
                  Eliminar <FaTrash />
                </button>
              </footer>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default SectionNotificaciones;
