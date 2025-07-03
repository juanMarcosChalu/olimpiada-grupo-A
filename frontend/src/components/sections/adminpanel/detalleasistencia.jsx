import React, { useState } from 'react';
import "../../../styles/detalleasistencia.css";

const asistenciasMock = [
  {
    id: 1,
    nombreUsuario: "Martina Gutierrez",
    email: "martinagutinf1@gmail.com",
    telefonos: ["2281 393902"],
    tipoPlan: "Premium",
    destino: "Brasil, Rio de Janeiro",
    precio: 50000,
    estado: "Activa",
    total: 50000,
  },
  {
    id: 2,
    nombreUsuario: "Juan Pérez",
    email: "juanp@mail.com",
    telefonos: ["1122334455", "6677889900"],
    tipoPlan: "Básico",
    destino: "Chile, Santiago",
    precio: 20000,
    estado: "Expirada",
    total: 20000,
  },
  {
    id: 3,
    nombreUsuario: "Ana López",
    email: "ana.lopez@mail.com",
    telefonos: ["4455667788"],
    tipoPlan: "Estándar",
    destino: "Uruguay, Montevideo",
    precio: 30000,
    estado: "Pendiente de pago",
    total: 30000,
  },
  {
    id: 4,
    nombreUsuario: "Carlos Méndez",
    email: "carlosm@mail.com",
    telefonos: ["2211223344"],
    tipoPlan: "Premium",
    destino: "Paraguay, Asunción",
    precio: 55000,
    estado: "Activa",
    total: 55000,
  },
  {
    id: 5,
    nombreUsuario: "Lucía García",
    email: "lucia.garcia@mail.com",
    telefonos: ["9988776655"],
    tipoPlan: "Básico",
    destino: "Bolivia, La Paz",
    precio: 18000,
    estado: "Expirada",
    total: 18000,
  },
  {
    id: 6,
    nombreUsuario: "Marcos Díaz",
    email: "marcosd@mail.com",
    telefonos: ["6677889900"],
    tipoPlan: "Estándar",
    destino: "Argentina, Buenos Aires",
    precio: 32000,
    estado: "Activa",
    total: 32000,
  },
];

function DetalleAsistencia() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('Todos');
  const [filterPlan, setFilterPlan] = useState('Todos');

  const estados = ['Todos', 'Activa', 'Expirada', 'Pendiente de pago'];
  const planes = ['Todos', 'Básico', 'Estándar', 'Premium'];

  const filtrarAsistencias = asistenciasMock.filter((asistencia) => {
    const nombreMatch = asistencia.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase());
    const estadoMatch = filterEstado === 'Todos' || asistencia.estado === filterEstado;
    const planMatch = filterPlan === 'Todos' || asistencia.tipoPlan === filterPlan;

    return nombreMatch && estadoMatch && planMatch;
  });

  return (
    <div className="detalle-container" style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ color: '#776b5d', marginBottom: '1.5rem', textAlign: 'center' }}>Asistencias al Viajero Admin</h2>

      <div className="filters" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          aria-label="Buscar por nombre"
          style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc', flex: '1 1 200px' }}
        />

        <select
          value={filterEstado}
          onChange={e => setFilterEstado(e.target.value)}
          aria-label="Filtrar por estado"
          style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc' }}
        >
          {estados.map(estado => (
            <option key={estado} value={estado}>{estado}</option>
          ))}
        </select>

        <select
          value={filterPlan}
          onChange={e => setFilterPlan(e.target.value)}
          aria-label="Filtrar por plan"
          style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc' }}
        >
          {planes.map(plan => (
            <option key={plan} value={plan}>{plan}</option>
          ))}
        </select>
      </div>

      {filtrarAsistencias.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#776b5d' }}>No se encontraron asistencias con esos filtros.</p>
      ) : (
        filtrarAsistencias.map(asistencia => (
          <div key={asistencia.id} className="card-asistencia" style={{
            border: '1px solid #ccc',
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            boxShadow: '0 0 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#776b5d', marginBottom: 8 }}>{asistencia.nombreUsuario}</h3>
            <p><strong>Email:</strong> {asistencia.email}</p>
            <p><strong>Teléfonos:</strong> {asistencia.telefonos.join(', ')}</p>
            <p><strong>Tipo de plan:</strong> {asistencia.tipoPlan}</p>
            <p><strong>Destino:</strong> {asistencia.destino}</p>
            <p><strong>Precio abonado:</strong> {asistencia.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
            <p><strong>Estado:</strong> {asistencia.estado}</p>
            <p><strong>Total de la asistencia:</strong> {asistencia.total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default DetalleAsistencia;
