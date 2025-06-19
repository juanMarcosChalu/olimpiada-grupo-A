import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CardPaquetes from '../../UI/CardPaquetes';
import '../../../styles/GridPaquetes.css';

import image_of_paris from '../../../../src/assets/paris.jpg';
import image_of_santorini from '../../../../src/assets/santorini.jpg';
import image_of_kioto from '../../../../src/assets/kioto.jpg';
import image_of_venecia from '../../../../src/assets/venecia.jpeg';
import image_of_bali from '../../../../src/assets/bali.jpg';
import image_of_praga from '../../../../src/assets/praga.jpg';

import image_disney from '../../../../src/assets/disney.jpg';
import image_riviera from '../../../../src/assets/rivieramaya.jpg';
import image_universal from '../../../../src/assets/universal.jpg';
import image_sandiego from '../../../../src/assets/sandiego.jpg';
import image_londres from '../../../../src/assets/londres.jpg';
import image_bari from '../../../../src/assets/bariloche.jpg';

function GridPaquetes() {
  const [paquetes, setPaquetes] = useState([]);
  const [modalAbierta, setModalAbierta] = useState(false);
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState(null);

  const location = useLocation();

  useEffect(() => {
  const dataSimulada = [
    // Románticos
    {
      tipo: "romantico",
      titulo: "París, Francia – 5 días",
      precio: "$1.200.000 ARS (Con vuelo)",
      imagenSrc: image_of_paris,
      resumen: "🏨 Hotel + museo + cena",
      detalleServicios: [
        "Hotel Boutique",
        "Vuelos ida y vuelta",
        "Traslados aeropuerto-hotel",
        "Cena romántica en terraza",
        "Paseo en barco"
      ]
    },
    {
      tipo: "romantico",
      titulo: "Santorini, Grecia – 6 días",
      precio: "$1.150.000 ARS (Con vuelo)",
      imagenSrc: image_of_santorini,
      resumen: "🏨 Hotel + traslado + cena",
      detalleServicios: [
        "Hotel frente al mar",
        "Traslado privado",
        "Cena tradicional griega",
        "Tour en catamarán"
      ]
    },
    {
      tipo: "romantico",
      titulo: "Kioto, Japón - 7 días",
      precio: "$1.300.000 ARS (Con vuelo)",
      imagenSrc: image_of_kioto,
      resumen: "🏨 Hotel + guía + desayuno",
      detalleServicios: [
        "Hotel tradicional japonés",
        "Guía turístico bilingüe",
        "Desayuno incluido",
        "Visita a templos históricos"
      ]
    },
    {
      tipo: "romantico",
      titulo: "Venecia, Italia · 5 días",
      precio: "$1.100.000 ARS (Con vuelo)",
      imagenSrc: image_of_venecia,
      resumen: "🏨 Hotel + góndola + 🍝 cena",
      detalleServicios: [
        "Hotel céntrico",
        "Paseo en góndola",
        "Cena italiana auténtica",
        "Tour por plazas históricas"
      ]
    },
    {
      tipo: "romantico",
      titulo: "Bali, Indonesia - 7 días",
      precio: "$1.250.000 ARS (Con vuelo)",
      imagenSrc: image_of_bali,
      resumen: "🏨 Hotel + 🚐 Traslados + ☕",
      detalleServicios: [
        "Resort con piscina",
        "Traslados aeropuerto-resort",
        "Tours culturales",
        "Clase de yoga y meditación"
      ]
    },
    {
      tipo: "romantico",
      titulo: "Praga - 6 días",
      precio: "$980.000 ARS (Con vuelo)",
      imagenSrc: image_of_praga,
      resumen: "🏨 Hotel + 🏰 City tour + ☕",
      detalleServicios: [
        "Hotel boutique",
        "Tour guiado por la ciudad",
        "Desayuno incluido",
        "Visita a castillos"
      ]
    },

    // Familiares
    {
      tipo: "familiar",
      titulo: "Disney Orlando — 6 días",
      precio: "$820.000 ARS (Con vuelo)",
      imagenSrc: image_disney,
      resumen: "🏨 Hotel + 🎟️ Entradas parques",
      detalleServicios: [
        "Hotel en resort",
        "Entradas a parques temáticos",
        "Traslados incluidos",
        "Actividades para niños"
      ]
    },
    {
      tipo: "familiar",
      titulo: "Riviera Maya — 7 días",
      precio: "$760.000 ARS (Con vuelo)",
      imagenSrc: image_riviera,
      resumen: "🏖️ Playa + 🍹 All inclusive",
      detalleServicios: [
        "Resort frente al mar",
        "Todo incluido",
        "Excursiones a ruinas",
        "Actividades familiares"
      ]
    },
    {
      tipo: "familiar",
      titulo: "Universal Studios — 5 días",
      precio: "$700.000 ARS (Con vuelo)",
      imagenSrc: image_universal,
      resumen: "🏨 Hotel + 🎟️ Entradas",
      detalleServicios: [
        "Hotel céntrico",
        "Entradas a parque Universal",
        "Shows y atracciones",
        "Actividades para niños"
      ]
    },
    {
      tipo: "familiar",
      titulo: "San Diego, CA — 5 días",
      precio: "$700.000 ARS (Con vuelo)",
      imagenSrc: image_sandiego,
      resumen: "🏨 Hotel + 🐠 Acuario y zoo",
      detalleServicios: [
        "Hotel familiar",
        "Visita al zoológico",
        "Visita al acuario",
        "Tours guiados"
      ]
    },
    {
      tipo: "familiar",
      titulo: "Londres — 6 días",
      precio: "$1.100.000 ARS (Con vuelo)",
      imagenSrc: image_londres,
      resumen: "🏨 Hotel + 🏰 City tour + ☕",
      detalleServicios: [
        "Hotel céntrico",
        "City tour guiado",
        "Museos y atracciones",
        "Actividades culturales"
      ]
    },
    {
      tipo: "familiar",
      titulo: "Bariloche — 5 días",
      precio: "$510.000 ARS (Con vuelo)",
      imagenSrc: image_bari,
      resumen: "✈️ Vuelos + 🛶 Excursiones",
      detalleServicios: [
        "Vuelos ida y vuelta",
        "Excursiones en la naturaleza",
        "Actividades al aire libre",
        "Hospedaje en cabañas"
      ]
    }
  ];

    // Agregamos color de fondo según tipo
    dataSimulada.forEach(element => {
      if (element.tipo === "romantico") {
        element.fondo = "pink";
      } else if (element.tipo === "familiar") {
        element.fondo = "#000000";
      }
    });

    setPaquetes(dataSimulada);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 0);
      }
    }
  }, [location]);

  const abrirModal = (paquete) => {
    setPaqueteSeleccionado(paquete);
    setModalAbierta(true);
  };

  const cerrarModal = () => {
    setModalAbierta(false);
    setPaqueteSeleccionado(null);
  };

  return (
    <section id="romanticos">
      <div className="grid-paquetes">
        {paquetes.map((paquete, index) => (
          <CardPaquetes
            key={index}
            {...paquete}
            onVerMas={() => abrirModal(paquete)}
          />
        ))}
      </div>

      {modalAbierta && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={cerrarModal}>&times;</span>
            <h1>Personalizar la página</h1>
            <h2>{paqueteSeleccionado.titulo}</h2>
            <div className='modal-content-info'>
              <div className='ModalImgContainer'>
                <img src={paqueteSeleccionado.imagenSrc} alt={paqueteSeleccionado.titulo} />
              </div>
              <div className='ModalTextContainer'>
                <h3>{paqueteSeleccionado.titulo}</h3>
                <ul className='ModalTextContainerResumen'>
                  {paqueteSeleccionado.detalleServicios.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <p className='precioModal'>{paqueteSeleccionado.precio} ARS por persona</p>
              </div>
            </div>
            <form>
              <div className='ModalFormInputs'>
                <div>
                  <label htmlFor="cantidad">Cantidad de personas:</label>
                  <input type="number" id="cantidad" name="cantidad" placeholder='0' />
                </div>
                <div>
                  <label htmlFor="entrada">Fecha de entrada:</label>
                  <input type="date" id="entrada" name="entrada" />
                </div>
                <div>
                  <label htmlFor="salida">Fecha de salida:</label>
                  <input type="date" id="salida" name="salida" />
                </div>
              </div>
              <p>Precio base por persona. Total con impuestos en el carrito</p>
              <div className='ModalFormButtons'>
                <button type="submit">Añadir al carrito</button>
                <button type="button" onClick={cerrarModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default GridPaquetes;
