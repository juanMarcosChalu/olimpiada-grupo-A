import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/admin.css";

function Admin() {
  return (
    <main className="options-grid">
      <div className="option-card">
        <h3>COMPRAS</h3>
        <p>Ver y gestionar las compras realizadas</p>
        <Link className="detail-btn" to="/admin/compras">Detalle</Link>
      </div>
      <div className="option-card">
        <h3>PAQUETES</h3>
        <p>Administrar los paquetes de los viajeros</p>
        <Link className="detail-btn" to="/admin/paquetes">Detalle</Link>
      </div>
      <div className="option-card">
        <h3>USUARIOS</h3>
        <p>Administrar la información de los usuarios</p>
        <Link className="detail-btn" to="/admin/usuarios">Detalle</Link>
      </div>
      <div className="option-card">
        <h3>ASISTENCIA AL VIAJERO</h3>
        <p>Gestionar las solicitudes de asistencias</p>
        <Link className="detail-btn" to="/admin/asistencia">Detalle</Link>
      </div>
    </main>
  );
}

export default Admin;

