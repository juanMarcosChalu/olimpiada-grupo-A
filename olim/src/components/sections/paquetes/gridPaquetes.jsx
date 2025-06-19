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

import image_disney from '../../../assets/disney.jpg';
import image_riviera from '../../../assets/rivieramaya.jpg';
import image_universal from '../../../assets/universal.jpg';
import image_sandiego from '../../../assets/sandiego.jpg';
import image_londres from '../../../assets/londres.jpg';
import image_bari from '../../../assets/bariloche.jpg';

import image_chiapas from '../../../assets/chiapas.jpg';
import image_calafate from '../../../assets/calafate.jpg';
import image_canoncobre from '../../../assets/cañon.jpeg';
import image_alpes from '../../../assets/alpes.jpg';
import image_acatenango from '../../../assets/volcan.jpg';
import image_islandia from '../../../assets/islandia.jpg';

import image_valledeuco from '../../../assets/valledeuco.jpg';
import image_ibera from '../../../assets/ibera.jpeg';
import image_paine from '../../../assets/torresdelpaine.jpg';
import image_siankaan from '../../../assets/siankaan.jpeg';
import image_amazonas from '../../../assets/amazonas.jpg';
import image_fiordos from '../../../assets/fiordos.jpg';

import image_ubud from '../../../assets/ubud.jpg';
import image_maldivas from '../../../assets/maldivas.jpg';
import image_arenal from '../../../assets/arenal.jpeg';
import image_lagunas from '../../../assets/lagunasislandia.jpg';
import image_sanmiguel from '../../../assets/sanmiguel.jpg';
import image_tulum from '../../../assets/tulum.jpg';

import image_marrakech from '../../../assets/marrakech.jpg';
import image_roma from '../../../assets/roma.jpg';
import image_machuPicchu from '../../../assets/machuPicchu.jpg';
import image_edimburgo from '../../../assets/edimburgo.jpg';
import image_valledelloira from '../../../assets/valledelloira.jpg';
import image_elcairo from '../../../assets/elcairo.jpeg';


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
        titulo: "Universal — 5 días",
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
      },

      // Aventureros
      {
        tipo: "aventurero",
        titulo: "Cañón del Cobre— 6 días",
        precio: "$750.000 ARS (Con vuelo)",
        imagenSrc: image_chiapas,
        resumen: "🏨 Hotel + 🌊 Cascadas",
        detalleServicios: [
          "Hotel ecológico",
          "Excursiones a cascadas",
          "Guía de naturaleza",
          "Comidas típicas"
        ]
      },
      {
        tipo: "aventurero",
        titulo: "El Calafate, ARG — 5 días",
        precio: "$480.000 ARS (Con vuelo)",
        imagenSrc: image_calafate,
        resumen: "🏨 Hotel + 🧊 Excursiones",
        detalleServicios: [
          "Hotel con vista al glaciar",
          "Trekking sobre hielo",
          "Guía en parque nacional",
          "Traslados incluidos"
        ]
      },
      {
        tipo: "aventurero",
        titulo: "Cañón del Cobre, MX — 6 días",
        precio: "$790.000 ARS (Con vuelo)",
        imagenSrc: image_canoncobre,
        resumen: "🚂 Tren Chepe + 🏞️ Miradores",
        detalleServicios: [
          "Pasaje en tren panorámico",
          "Alojamiento en cabañas",
          "Recorridos por miradores",
          "Cenas regionales"
        ]
      },
      {
        tipo: "aventurero",
        titulo: "Alpes Suizos, Suiza — 7 días",
        precio: "$2.100.000 ARS (Con vuelo)",
        imagenSrc: image_alpes,
        resumen: "🛤️ Ruta panorámica + 🍽️ Cena",
        detalleServicios: [
          "Tren panorámico Glacier Express",
          "Hotel en montaña",
          "Cena gourmet suiza",
          "Excursión a los picos nevados"
        ]
      },
      {
        tipo: "aventurero",
        titulo: "Acatenango, GUA — 4 días",
        precio: "$420.000 ARS (Con vuelo)",
        imagenSrc: image_acatenango,
        resumen: "🗻 Ascenso + 🍽️ Cena",
        detalleServicios: [
          "Ascenso al volcán con guía",
          "Campamento base",
          "Cena y fogón",
          "Desayuno con vista al amanecer"
        ]
      },
      {
        tipo: "aventurero",
        titulo: "Islandia Aventura — 7 días",
        precio: "$1.950.000 ARS (Con vuelo)",
        imagenSrc: image_islandia,
        resumen: "🌋 Geysers + 🧊 Laguna glaciar",
        detalleServicios: [
          "Recorrido por la Ring Road",
          "Guía en español",
          "Hotel con desayuno",
          "Excursión a glaciares y volcanes"
        ]
      },

     {
  tipo: "naturaleza",
  titulo: "Valle de Uco, MZA — 4 días",
  precio: "$390.000 ARS (Con vuelo)",
  imagenSrc: image_valledeuco,
  resumen: "📽️ Videos + 🏔️ Montañas",
  detalleServicios: [
    "Hotel de montaña",
    "Excursiones a bodegas",
    "Trekking en la cordillera",
    "Guía local especializado"
  ]
},
{
  tipo: "naturaleza",
  titulo: "Iberá, Corrientes — 4 días",
  precio: "$370.000 ARS (Con vuelo)",
  imagenSrc: image_ibera,
  resumen: "🔭 Avistaje + 🛶 Canoa",
  detalleServicios: [
    "Hospedaje rural",
    "Safari fotográfico",
    "Recorridos en canoa",
    "Avistaje de fauna autóctona"
  ]
},
{
  tipo: "naturaleza",
  titulo: "Torres del Paine, CHI — 5 días",
  precio: "$720.000 ARS (Con vuelo)",
  imagenSrc: image_paine,
  resumen: "🥾 Trekking + 🏞️ Miradores",
  detalleServicios: [
    "Refugio en el parque",
    "Caminatas guiadas",
    "Miradores panorámicos",
    "Traslados desde Punta Arenas"
  ]
},
{
  tipo: "naturaleza",
  titulo: "Sian Ka'an, MEX — 5 días",
  precio: "$750.000 ARS (Con vuelo)",
  imagenSrc: image_siankaan,
  resumen: "🏝️ Eco-tour + 🐠 Fauna",
  detalleServicios: [
    "Eco-hotel",
    "Navegación en lagunas",
    "Snorkel con guía",
    "Avistaje de delfines y aves"
  ]
},
{
  tipo: "naturaleza",
  titulo: "Amazonas, Perú – 6 días",
  precio: "$890.000 ARS (Con vuelo)",
  imagenSrc: image_amazonas,
  resumen: "🌴 Fauna + 🛶 Paseo río",
  detalleServicios: [
    "Lodge en la selva",
    "Excursiones fluviales",
    "Guías naturalistas",
    "Visita a comunidades locales"
  ]
},
{
  tipo: "naturaleza",
  titulo: "Fiordos, Noruega — 7 días", 
  precio: "$2.200.000 ARS (Con vuelo)",
  imagenSrc: image_fiordos,
  resumen: "🛳️ Navegación + ❄️ Excursión",
  detalleServicios: [
    "Hotel con vista al fiordo",
    "Crucero entre fiordos",
    "Excursión a glaciares",
    "Guía en español"
  ]
},

{
  tipo: "relax",
  titulo: "Ubud, Bali — 6 días",
  precio: "$1.250.000 ARS (Con vuelo)",
  imagenSrc: image_ubud,
  resumen: "🌾 Arrozales + 🧘 Spa + 🍽️ Cena",
  detalleServicios: [
    "Resort entre arrozales",
    "Sesión de spa y masajes",
    "Cena gourmet balinesa",
    "Clases de yoga al amanecer"
  ]
},
{
  tipo: "relax",
  titulo: "Islas Maldivas — 7 días",
  precio: "$2.400.000 ARS (Con vuelo)",
  imagenSrc: image_maldivas,
  resumen: "🏝️ Isla privada + 🧘 Masajes",
  detalleServicios: [
    "Villa sobre el agua",
    "Masajes en la playa",
    "Desayuno flotante",
    "Atardeceres en catamarán"
  ]
},
{
  tipo: "relax",
  titulo: "Arenal, Costa Rica — 6 días",
  precio: "$810.000 ARS (Con vuelo)",
  imagenSrc: image_arenal,
  resumen: "🌋 Termas + 🏨 Hotel en selva",
  detalleServicios: [
    "Hotel inmerso en la selva",
    "Baños termales naturales",
    "Masajes relajantes",
    "Comidas saludables"
  ]
},
{
  tipo: "relax",
  titulo: "Lagunas de Islandia — 5 días",
  precio: "$1.850.000 ARS (Con vuelo)",
  imagenSrc: image_lagunas,
  resumen: "💧 Blue Lagoon + 🧴 Spa",
  detalleServicios: [
    "Entrada a Blue Lagoon",
    "Spa termal completo",
    "Alojamiento en hotel nórdico",
    "Avistaje de auroras boreales"
  ]
},
{
  tipo: "relax",
  titulo: "San Miguel, México — 5 días",
  precio: "$680.000 ARS (Con vuelo)",
  imagenSrc: image_sanmiguel,
  resumen: "🧖‍♀️ Termas + 🏨 Hotel colonial",
  detalleServicios: [
    "Hotel boutique colonial",
    "Termas naturales",
    "Terapias holísticas",
    "Caminatas relajantes"
  ]
},
{
  tipo: "relax",
  titulo: "Tulum, México — 6 días",
  precio: "$740.000 ARS (Con vuelo)",
  imagenSrc: image_tulum,
  resumen: "🏖️ Playa + 🧘 Spa + 🍹 Hotel",
  detalleServicios: [
    "Resort frente al mar",
    "Spa holístico y yoga",
    "Cocktails en la playa",
    "Excursión a cenotes"
  ]
},

  {
    tipo: "cultural",
    titulo: "Marrakech, MAR — 6 días",
    precio: "$910.000 ARS (Con vuelo)",
    imagenSrc: image_marrakech,
    resumen: "🕌 Medinas + 🛍️ Mercados",
    detalleServicios: [
      "Tours por medinas históricas",
      "Visita a mercados tradicionales",
      "Cena en restaurante local",
    ],
  },
  {
    tipo: "cultural",
    titulo: "Roma, Italia — 5 días",
    precio: "$870.000 ARS (Con vuelo)",
    imagenSrc: image_roma,
    resumen: "🏛️ Ruinas + 🍝 Gastronomía",
    detalleServicios: [
      "Visita al Coliseo",
      "Tour gastronómico por la ciudad",
      "Museos y galerías incluidas",
    ],
  },
  {
    tipo: "cultural",
    titulo: "Machu Picchu, Perú — 5 días",
    precio: "$930.000 ARS (Con vuelo)",
    imagenSrc: image_machuPicchu,
    resumen: "🏞️ Ruinas + 🥾 Trekking",
    detalleServicios: [
      "Entrada y guía oficial a Machu Picchu",
      "Trekking acompañado",
      "Hospedaje incluido",
    ],
  },
  {
    tipo: "cultural",
    titulo: "Edimburgo, Escocia — 5 días",
    precio: "$950.000 ARS (Con vuelo)",
    imagenSrc: image_edimburgo,
    resumen: "🏰 Castillos + 🎭 Festivales",
    detalleServicios: [
      "Visitas a castillos históricos",
      "Entradas a festivales culturales",
      "Tour por la ciudad y museos",
    ],
  },
  {
    tipo: "cultural",
    titulo: "Valle del Loira, FRA — 6 días",
    precio: "$1.100.000 ARS (Con vuelo)",
    imagenSrc: image_valledelloira,
    resumen: "🏰 Castillos + 🍇 Viñedos",
    detalleServicios: [
      "Tour por castillos emblemáticos",
      "Visita a viñedos con degustación",
      "Hospedaje en cabañas tradicionales",
    ],
  },
  {
    tipo: "cultural",
    titulo: "El Cairo, Egipto — 6 días",
    precio: "$900.000 ARS (Con vuelo)",
    imagenSrc: image_elcairo,
    resumen: "🕌 Pirámides + 🏺 Museos",
    detalleServicios: [
      "Entrada a pirámides de Giza",
      "Visita a museos arqueológicos",
      "Guía turístico especializado",
    ],
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
      } else if (element.tipo === "cultural") {
        element.fondo = "#B88C84";
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
    </>
  );
}

export default GridPaquetes;
