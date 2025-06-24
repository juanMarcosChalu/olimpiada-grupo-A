import React, { useState } from "react";
import "../../../styles/Alojamientos.css";

export default function Alojamientos() {
  const [form, setForm] = useState({
    huespedes: '',
    entrada: '',
    salida: '',
    nombre: '',
    correo: '',
    telefono: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.huespedes ||
      !form.entrada ||
      !form.salida ||
      !form.nombre ||
      !form.correo ||
      !form.telefono
    ) {
      setMessage("Por favor, completa todos los campos.");
      return;
    }

    setMessage("¡Reserva realizada con éxito! Te contactaremos pronto.");

    // Aquí podrías enviar los datos a un backend o API

    setForm({
      huespedes: '',
      entrada: '',
      salida: '',
      nombre: '',
      correo: '',
      telefono: ''
    });
  };

  // Datos simulados para mostrar tarjetas de alojamientos
  const alojamientosData = [
    {
      id: 1,
      nombre: "Cabaña en la montaña",
      descripcion: "Un lugar cálido con vistas increíbles.",
      precio: "$120 por noche"
    },
    {
      id: 2,
      nombre: "Departamento céntrico",
      descripcion: "Cómodo y cerca de todo.",
      precio: "$90 por noche"
    },
    {
      id: 3,
      nombre: "Hostal económico",
      descripcion: "Ideal para viajeros con presupuesto limitado.",
      precio: "$50 por noche"
    }
  ];

  return (
    <div className="alojamiento-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <h3>Completá tu reserva</h3>
        <select name="huespedes" value={form.huespedes} onChange={handleChange}>
          <option value="">Cantidad de huéspedes</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <input type="date" name="entrada" value={form.entrada} onChange={handleChange} />
        <input type="date" name="salida" value={form.salida} onChange={handleChange} />
        <input type="text" name="nombre" placeholder="Nombre y apellido" value={form.nombre} onChange={handleChange} />
        <input type="email" name="correo" placeholder="Correo electrónico" value={form.correo} onChange={handleChange} />
        <input type="tel" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
        <button type="submit">Reservar</button>
        {message && <p className="form-message">{message}</p>}
      </form>

      <h3 style={{ marginTop: "2rem", color: "#3a2e25" }}>Alojamientos disponibles</h3>
      <div className="grid-alojamientos">
        {alojamientosData.map(a => (
          <div key={a.id} className="card">
            <h4>{a.nombre}</h4>
            <p>{a.descripcion}</p>
            <p><strong>{a.precio}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
}
