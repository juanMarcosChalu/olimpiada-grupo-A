import React, { useEffect, useState } from 'react';
import CardPaquetes from './CardPaquetes'; // Asegurate de que esté bien importado
import '../styles/GridPaquetes.css'; // Puedes crear este archivo
import img2 from '../assets/madrid.jpg';
import HeaderPaquetes from "./HeaderPaquetes";
function GridPaquetes() {
  const [paquetes, setPaquetes] = useState([]);

  // Simulación de fetch
  useEffect(() => {
    setTimeout(() => {
      const dataSimulada = [
        {
          titulo: "Paris, Francia - 5 dias / 4 Noches",
          lista: ["Vuelo incluido", "Hotel", "Parques"],
          precio: "Desde $890 USD",
          imagenSrc: img2,
          fondo: "#c88c8c"
        },
        {
          titulo: "Europa Clásica",
          lista: ["Tour guiado", "Desayuno", "Crucero"],
          precio: "Desde $1.200 USD",
           imagenSrc: img2,
          fondo: "#c88c8c"
        },
        {
          titulo: "Caribe Relax",
          lista: ["All inclusive", "Actividades acuáticas", "Shows"],
          precio: "Desde $750 USD",
           imagenSrc: img2,
          fondo: "#d9a273"
        },
        {
          titulo: "Aventura en Perú",
          lista: ["Machu Picchu", "Guía", "Transporte"],
          precio: "Desde $600 USD",
           imagenSrc: img2,
          fondo: "#d9a273"
        },
        {
          titulo: "Safari en África",
          lista: ["Reserva natural", "Hospedaje", "Excursiones"],
          precio: "Desde $1.500 USD",
         imagenSrc: img2,
          fondo: "#d9a273"
        },
        {
          titulo: "Nieve en Suiza",
          lista: ["Esquí", "Montañas", "Hotel 4*"],
          precio: "Desde $1.000 USD",
          imagenSrc: img2,
          fondo: "#d9a273"
        }
      ];
      setPaquetes(dataSimulada);
    }, 1000);
  }, []);

  return (
    <section>
      <HeaderPaquetes></HeaderPaquetes>
    <div className="grid-paquetes">
      {console.log(paquetes)}
      {paquetes.map((paquete, index) => (
        <CardPaquetes key={index} {...paquete} />
      ))}
    </div>
    </section>
  );
}

export default GridPaquetes;
