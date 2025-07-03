import React, { useState } from "react";
import "../../../styles/paquetesadmin.css";

const paquetesMock = [
  {
    id: 1,
    tipo: "Romántico",
    destino: "Kioto, Japón - 7 días",
    descripcion: "Hotel + guía + desayuno",
    precio: "$1.300.000 ARS (Con vuelo)",
  },
  {
    id: 2,
    tipo: "Familiar",
    destino: "Disney Orlando — 6 días",
    descripcion: "Hotel + Entradas parques",
    precio: "$820.000 ARS (Con vuelo)",
  },
  {
    id: 3,
    tipo: "Aventurero",
    destino: "Riviera Maya — 7 días",
    descripcion: "Playa + All inclusive",
    precio: "$760.000 ARS (Con vuelo)",
  },
  {
    id: 4,
    tipo: "Relax",
    destino: "Bariloche — 5 días",
    descripcion: "Vuelos + Excursiones",
    precio: "$510.000 ARS (Con vuelo)",
  },
];

function PaquetesAdmin() {
  const [paquetes, setPaquetes] = useState(paquetesMock);
  const [editId, setEditId] = useState(null); // null = no edición
  const [formData, setFormData] = useState({
    tipo: "",
    destino: "",
    descripcion: "",
    precio: "",
  });
  const [mensaje, setMensaje] = useState(null);

  const abrirEditar = (paquete) => {
    setEditId(paquete.id);
    setFormData({
      tipo: paquete.tipo,
      destino: paquete.destino,
      descripcion: paquete.descripcion,
      precio: paquete.precio,
    });
    setMensaje(null);
  };

  const abrirAgregar = () => {
    setEditId("nuevo");
    setFormData({
      tipo: "",
      destino: "",
      descripcion: "",
      precio: "",
    });
    setMensaje(null);
  };

  const cerrarEditar = () => {
    setEditId(null);
    setMensaje(null);
  };

  const handleCambio = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const guardarCambios = () => {
    // Validar que no haya campos vacíos
    if (
      !formData.tipo.trim() ||
      !formData.destino.trim() ||
      !formData.descripcion.trim() ||
      !formData.precio.trim()
    ) {
      setMensaje({ tipo: "error", texto: "Todos los campos son obligatorios." });
      return;
    }

    if (editId === "nuevo") {
      // Agregar nuevo paquete
      const nuevoPaquete = {
        id: paquetes.length > 0 ? Math.max(...paquetes.map(p => p.id)) + 1 : 1,
        ...formData,
      };
      setPaquetes(prev => [...prev, nuevoPaquete]);
      setMensaje({ tipo: "exito", texto: "Paquete agregado correctamente." });
    } else {
      // Editar paquete existente
      setPaquetes(prev =>
        prev.map(p => (p.id === editId ? { ...p, ...formData } : p))
      );
      setMensaje({ tipo: "exito", texto: "Paquete actualizado correctamente." });
    }

    // Cerrar modal luego de mostrar mensaje 1s
    setTimeout(() => {
      cerrarEditar();
    }, 1000);
  };

  return (
    <div className="paquetes-admin-container">
      <h2>Gestión de Paquetes</h2>

      <button
        className="btn-agregar"
        onClick={abrirAgregar}
        aria-label="Agregar nuevo paquete"
      >
        Agregar nuevo paquete
      </button>

      <div className="paquetes-grid">
        {paquetes.map((p) => (
          <div key={p.id} className="paquete-card">
            <h4>{p.tipo}</h4>
            <p><strong>{p.destino}</strong></p>
            <p>{p.descripcion}</p>
            <p className="precio">{p.precio}</p>
            <button
              className="btn-personalizar"
              onClick={() => abrirEditar(p)}
              aria-label={`Editar paquete ${p.destino}`}
            >
              Editar
            </button>
          </div>
        ))}
      </div>

      {editId !== null && (
        <div
          className="modal-overlay"
          onClick={cerrarEditar}
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-titulo"
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="modal-titulo">
              {editId === "nuevo" ? "Agregar Paquete" : "Editar Paquete"}
            </h3>

            <label htmlFor="tipo">Tipo de paquete</label>
            <input
              id="tipo"
              name="tipo"
              type="text"
              value={formData.tipo}
              onChange={handleCambio}
              autoFocus
            />

            <label htmlFor="destino">Destino y duración</label>
            <input
              id="destino"
              name="destino"
              type="text"
              value={formData.destino}
              onChange={handleCambio}
            />

            <label htmlFor="descripcion">Descripción</label>
            <input
              id="descripcion"
              name="descripcion"
              type="text"
              value={formData.descripcion}
              onChange={handleCambio}
            />

            <label htmlFor="precio">Precio</label>
            <input
              id="precio"
              name="precio"
              type="text"
              value={formData.precio}
              onChange={handleCambio}
            />

            {mensaje && (
              <p
                className={
                  mensaje.tipo === "error" ? "mensaje-error" : "mensaje-exito"
                }
                role="alert"
              >
                {mensaje.texto}
              </p>
            )}

            <div className="modal-buttons">
              <button className="btn-guardar" onClick={guardarCambios}>
                {editId === "nuevo" ? "Agregar" : "Guardar"}
              </button>
              <button className="btn-cancelar" onClick={cerrarEditar}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaquetesAdmin;
