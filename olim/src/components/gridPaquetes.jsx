import React, { useEffect, useState } from 'react';
import CardPaquetes from './CardPaquetes'; // Asegurate de que esté bien importado
import '../styles/GridPaquetes.css'; // Puedes crear este archivo

function GridPaquetes() {
  const [paquetes, setPaquetes] = useState([]);

  // Simulación de fetch
  useEffect(() => {
    setTimeout(() => {
      const dataSimulada = [
        {
          titulo: "Viaje a Disney",
          lista: ["Vuelo incluido", "Hotel", "Parques"],
          precio: "Desde $890 USD",
          imagenSrc: "/assets/disney.jpg",
          fondo: "#e0f7fa"
        },
        {
          titulo: "Europa Clásica",
          lista: ["Tour guiado", "Desayuno", "Crucero"],
          precio: "Desde $1.200 USD",
          imagenSrc: "/assets/europa.jpg",
          fondo: "#fce4ec"
        },
        {
          titulo: "Caribe Relax",
          lista: ["All inclusive", "Actividades acuáticas", "Shows"],
          precio: "Desde $750 USD",
          imagenSrc: "/assets/caribe.jpg",
          fondo: "#fff3e0"
        },
        {
          titulo: "Aventura en Perú",
          lista: ["Machu Picchu", "Guía", "Transporte"],
          precio: "Desde $600 USD",
          imagenSrc: "/assets/peru.jpg",
          fondo: "#ede7f6"
        },
        {
          titulo: "Safari en África",
          lista: ["Reserva natural", "Hospedaje", "Excursiones"],
          precio: "Desde $1.500 USD",
          imagenSrc: "/assets/africa.jpg",
          fondo: "#f3e5f5"
        },
        {
          titulo: "Nieve en Suiza",
          lista: ["Esquí", "Montañas", "Hotel 4*"],
          precio: "Desde $1.000 USD",
          imagenSrc: "/assets/suiza.jpg",
          fondo: "#e1f5fe"
        }
      ];
      setPaquetes(dataSimulada);
    }, 1000);
  }, []);

  return (
    <div className="grid-paquetes">
      {paquetes.map((paquete, index) => (
        <CardPaquetes key={index} {...paquete} />
      ))}
    </div>
  );
}

export default GridPaquetes;
