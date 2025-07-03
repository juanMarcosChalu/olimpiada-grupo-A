import React, { useState, useEffect } from 'react';
import "../../../styles/usuariosadmin.css";

const usuariosMock = [
  { id: 1, nombre: "Lucía Pérez", email: "lucia@mail.com", estado: "Activo", motivoSuspension: "", diasSuspension: 0 },
  { id: 2, nombre: "Martín Gómez", email: "martin@mail.com", estado: "Activo", motivoSuspension: "", diasSuspension: 0 },
  { id: 3, nombre: "Ana Ruiz", email: "ana@mail.com", estado: "Suspendido", motivoSuspension: "Incumplimiento de normas", diasSuspension: 45 },
];

const motivosYdias = [
  { motivo: "Incumplimiento de normas", dias: 45 },
  { motivo: "Lenguaje inapropiado", dias: 15 },
  { motivo: "Falsificación de datos", dias: 60 },
  { motivo: "Uso indebido de la plataforma", dias: 30 },
  { motivo: "Inactividad prolongada", dias: 20 }
];

function formatDuracion(dias) {
  if (!dias || dias <= 0) return "Sin suspensión";
  if (dias < 30) return `${dias} día${dias > 1 ? 's' : ''}`;

  const meses = Math.floor(dias / 30);
  const diasRestantes = dias % 30;
  let resultado = `${meses} mes${meses > 1 ? 'es' : ''}`;
  if (diasRestantes > 0) {
    resultado += ` y ${diasRestantes} día${diasRestantes > 1 ? 's' : ''}`;
  }
  return resultado;
}

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState(usuariosMock);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const toggleSuspender = (id) => {
    setUsuarios(usuarios.map(user => {
      if (user.id === id) {
        if (user.estado === "Activo") {
          const random = motivosYdias[Math.floor(Math.random() * motivosYdias.length)];
          return {
            ...user,
            estado: "Suspendido",
            motivoSuspension: random.motivo,
            diasSuspension: random.dias,
          };
        } else {
          return {
            ...user,
            estado: "Activo",
            motivoSuspension: "",
            diasSuspension: 0,
          };
        }
      }
      return user;
    }));
    setUsuarioSeleccionado(null);
  };

  const handleVerInfo = (user) => {
    setUsuarioSeleccionado(user);
  };

  const cerrarModal = () => {
    setUsuarioSeleccionado(null);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") cerrarModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="usuarios-container">
      <h2>Administración de Usuarios</h2>
      <table className="usuarios-table" aria-label="Tabla de usuarios">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user.id} className={user.estado === "Suspendido" ? "suspendido" : ""} tabIndex={0}>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>{user.estado}</td>
              <td>
                <button onClick={() => handleVerInfo(user)} className="verinfo-btn">
                  Ver Información
                </button>
                <button
                  className={user.estado === "Activo" ? "suspender-btn" : "activar-btn"}
                  onClick={() => toggleSuspender(user.id)}
                >
                  {user.estado === "Activo" ? "Suspender" : "Activar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {usuarioSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 id="modal-title">Información del Usuario</h3>
            <p><strong>Nombre:</strong> {usuarioSeleccionado.nombre}</p>
            <p><strong>Email:</strong> {usuarioSeleccionado.email}</p>
            <p><strong>Estado:</strong> {usuarioSeleccionado.estado}</p>
            {usuarioSeleccionado.estado === "Suspendido" && (
              <>
                <p><strong>Motivo de suspensión:</strong> {usuarioSeleccionado.motivoSuspension}</p>
                <p><strong>Duración de la suspensión:</strong> {formatDuracion(usuarioSeleccionado.diasSuspension)}</p>
              </>
            )}
            <button onClick={cerrarModal} className="cerrar-btn">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsuariosAdmin;
