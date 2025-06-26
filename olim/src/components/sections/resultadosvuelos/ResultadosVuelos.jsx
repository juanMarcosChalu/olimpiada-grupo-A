import React, { useState } from "react";
import CardVuelo from "../../UI/CardVuelo/CardVuelo";
import "../../../styles/ResultadosVuelos.css";

export default function ResultadosVuelos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [filtros, setFiltros] = useState({
    precioMin: '',
    precioMax: '',
    escalas: 'cualquiera',
  });

  const vuelos = [
    { aerolinea: "Aerolíneas Argentinas", precioARS: 32000 },
    { aerolinea: "Flybondi", precioARS: 24000 },
    { aerolinea: "LATAM Airlines", precioARS: 35000 },
    { aerolinea: "Sky Airline", precioARS: 22000 },
    { aerolinea: "JetSMART", precioARS: 26000 },
    { aerolinea: "LATAM Airlines", precioARS: 29000 },
  ];

  const abrirModal = () => setModalOpen(true);
  const cerrarModal = () => setModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const aplicarFiltros = () => {
    // Aquí podés agregar lógica para filtrar vuelos según filtros
    // Por ahora solo cierra la ventana modal
    cerrarModal();
  };

  return (
    <div className="resultados-vuelos-container">
      <div className="barra-superior">
        <div className="opciones">
          <button className="filtro" onClick={abrirModal}>Filtros</button>
        </div>
      </div>

      <div className="grid-vuelos" id="grid-vuelos">
        {vuelos.map((vuelo, index) => (
          <CardVuelo
            key={index}
            aerolinea={vuelo.aerolinea}
            precio={`ARS ${vuelo.precioARS.toLocaleString()}`}
          />
        ))}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Filtros</h3>
            <label htmlFor="precioMin">Precio mínimo (ARS)</label>
            <input
              type="number"
              id="precioMin"
              name="precioMin"
              value={filtros.precioMin}
              onChange={handleInputChange}
              min="0"
              placeholder="Ej: 20000"
            />
            <label htmlFor="precioMax">Precio máximo (ARS)</label>
            <input
              type="number"
              id="precioMax"
              name="precioMax"
              value={filtros.precioMax}
              onChange={handleInputChange}
              min="0"
              placeholder="Ej: 35000"
            />
            <label htmlFor="escalas">Escalas</label>
            <select
              id="escalas"
              name="escalas"
              value={filtros.escalas}
              onChange={handleInputChange}
            >
              <option value="cualquiera">Cualquiera</option>
              <option value="directo">Directo</option>
              <option value="1">1 escala</option>
              <option value="2">2 o más escalas</option>
            </select>

            <div className="modal-buttons">
              <button onClick={cerrarModal}>Cancelar</button>
              <button onClick={aplicarFiltros}>Aplicar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
