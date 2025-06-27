import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CardPaquetes from '../../UI/CardPaquetes';
import '../../../styles/GridPaquetes.css';

import image_of_paris from '../../../assets/paris.jpg';
import image_of_santorini from '../../../assets/santorini.jpg';
import image_of_kioto from '../../../assets/kioto.jpg';
import image_of_venecia from '../../../assets/venecia.jpeg';
import image_of_bali from '../../../assets/bali.jpg';
import image_of_praga from '../../../assets/praga.jpg';



function GridPaquetes(tipoPaquete) {
  const [paquetes, setPaquetes] = useState([]);
  const [modalAbierta, setModalAbierta] = useState(false);
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const dataSimulada = [
      
      {
        tipo: "romantico",
        titulo: "París, Francia – 5 días / 4 noches",
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

      
    ];

    dataSimulada.forEach(element => {
      if (element.tipo === "romantico") {
        element.fondo = "#E3B4B4";
      } else if (element.tipo === "familiar") {
        element.fondo = "#EDC3A4";
      } else if (element.tipo === "aventurero") {
        element.fondo = "#D28A82";
      } else if (element.tipo === "naturaleza") {
        element.fondo = "#B1C387";
      } else if (element.tipo === "relax") {
        element.fondo = "#AFC1C4";
      } else if (element.tipo === "cultu2ral") {
        element.fondo = "#B88C84";
      }

    });

    setPaquetes(dataSimulada);
  }, []);

 

  const abrirModal = (paquete) => {
    setPaqueteSeleccionado(paquete);
    setModalAbierta(true);
  };

  const cerrarModal = () => {
    setModalAbierta(false);
    setPaqueteSeleccionado(null);
  };

  return (
    <>
      <section id="romanticos">
        <div className="grid-paquetes">
          {paquetes.filter(p => p.tipo === "romantico").map((paquete, index) => (
            <CardPaquetes key={index} {...paquete} onVerMas={() => abrirModal(paquete)} />
          ))}
        </div>
      </section>

      <section id="familiares">
        <div className="grid-paquetes">
          {paquetes.filter(p => p.tipo === "familiar").map((paquete, index) => (
            <CardPaquetes key={index} {...paquete} onVerMas={() => abrirModal(paquete)} />
          ))}
        </div>
      </section>

      <section id="aventureros">
        <div className="grid-paquetes">
          {paquetes.filter(p => p.tipo === "aventurero").map((paquete, index) => (
            <CardPaquetes key={index} {...paquete} onVerMas={() => abrirModal(paquete)} />
          ))}
        </div>
      </section>

      <section id="naturaleza">
        <div className="grid-paquetes">
          {paquetes.filter(p => p.tipo === "naturaleza").map((paquete, index) => (
            <CardPaquetes key={index} {...paquete} onVerMas={() => abrirModal(paquete)} />
          ))}
        </div>
      </section>

      <section id="relax">
        <div className="grid-paquetes">
          {paquetes.filter(p => p.tipo === "relax").map((paquete, index) => (
            <CardPaquetes key={index} {...paquete} onVerMas={() => abrirModal(paquete)} />
          ))}
        </div>
      </section>

      <section id="culturales">
        <div className="grid-paquetes">
          {paquetes.filter(p => p.tipo === "cultural").map((paquete, index) => (
            <CardPaquetes key={index} {...paquete} onVerMas={() => abrirModal(paquete)} />
          ))}
        </div>
      </section>





      {modalAbierta && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={cerrarModal}>&times;</span>
            <h1>Personaliza tu paquete</h1>
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
                  <label htmlFor="entrada">Fecha de ida:</label>
                  <input type="date" id="entrada" name="entrada" />
                </div>
                <div>
                  <label htmlFor="salida">Fecha de vuelta:</label>
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
    </>
  );
}

export default GridPaquetes;
