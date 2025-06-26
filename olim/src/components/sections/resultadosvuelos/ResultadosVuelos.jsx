import React from "react";
import { useLocation } from "react-router-dom";
import CardVuelo from "../../UI/CardVuelo/CardVuelo";
import "../../../styles/ResultadosVuelos.css";

export default function ResultadosVuelos() {
  const location = useLocation();
  const datos = location.state || {
    origen: "origen",
    destino: "destino",
    fechas: "fecha",
    pasajeros: "pasajeros",
  };

  return (
    <div className="resultados-vuelos-container">
      <h2 className="titulo">
        Vuelos de {datos.origen} a {datos.destino} el {datos.fechas} para {datos.pasajeros} pasajero{datos.pasajeros !== "1" ? "s" : ""}
      </h2>

      <div className="grid-vuelos">
        <CardVuelo />
        <CardVuelo />
        <CardVuelo />
        {/* Acá podrías mapear desde un array si querés */}
      </div>
    </div>
  );
}
