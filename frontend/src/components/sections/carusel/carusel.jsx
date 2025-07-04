import React, { useState, useEffect, useMemo } from "react";
import "../../../styles/Carousel.css";

import image_of_city from "../../../assets/ciudad.jpg";
import image_of_desert from "../../../assets/desierto.jpg";
import image_of_mountain from "../../../assets/montañas.jpg";
import image_of_lake from "../../../assets/lago.jpg";
import image_of_field from "../../../assets/campo.jpg";
import image_of_beach from "../../../assets/playa.jpg";
import image_of_snow from "../../../assets/nevado.jpg";

const destinosData = [
  {
    img: image_of_city,
    texto: "Ciudades",
    descripcion: "Descubrí ciudades llenas de historia, cultura y movimiento.",
    epoca: "Primavera y otoño",
    actividades: "Caminatas urbanas, museos, gastronomía, compras",
    tips: [
      "Visitá temprano para evitar multitudes.",
      "Probar la gastronomía local en mercados y puestos callejeros.",
      "Llevar calzado cómodo para caminar mucho.",
    ],
  },
  {
    img: image_of_desert,
    texto: "Desiertos",
    descripcion: "Viví una experiencia única en paisajes áridos y misteriosos.",
    epoca: "Abril a octubre, evitando el calor extremo",
    actividades: "Tours 4x4, safaris fotográficos, avistaje de estrellas",
    tips: [
      "Llevar mucha agua y protección solar.",
      "Planificar actividades al amanecer o atardecer.",
      "Usar ropa ligera y de colores claros.",
    ],
  },
  {
    img: image_of_mountain,
    texto: "Montañas",
    descripcion: "Conectate con la naturaleza en las alturas.",
    epoca: "Primavera y invierno",
    actividades: "Trekking, fotografía, escalada, fogatas",
    tips: [
      "Chequeá el clima antes de salir.",
      "Llevar ropa abrigada y calzado de montaña.",
      "Respetar las rutas y señales de seguridad.",
    ],
  },
  {
    img: image_of_lake,
    texto: "Lagos",
    descripcion: "Tranquilidad y belleza natural junto al agua.",
    epoca: "Verano y principios de otoño",
    actividades: "Kayak, picnic, pesca, caminatas",
    tips: [
      "Llevar repelente de insectos.",
      "Respetar la naturaleza y no dejar basura.",
      "Aprovechar para hacer deportes acuáticos temprano en la mañana.",
    ],
  },
  {
    img: image_of_beach,
    texto: "Playas",
    descripcion: "Relajate en arenas doradas y aguas cristalinas.",
    epoca: "Verano y fines de primavera",
    actividades: "Nadar, tomar sol, snorkel, deportes acuáticos",
    tips: [
      "Usar protector solar resistente al agua.",
      "Evitar las horas de mayor sol (12 a 16 hs).",
      "Hidratarse constantemente.",
    ],
  },
  {
    img: image_of_snow,
    texto: "Nieve",
    descripcion: "Disfrutá de la magia blanca y actividades invernales.",
    epoca: "Julio a septiembre",
    actividades: "Esquí, snowboard, chocolate caliente, trineos",
    tips: [
      "Vestir en capas para mayor abrigo.",
      "Protegerse bien las manos y la cara del frío.",
      "No salir sin equipo adecuado para nieve.",
    ],
  },
  {
    img: image_of_field,
    texto: "Campos",
    descripcion: "Escapadas al aire libre en paisajes verdes y amplios.",
    epoca: "Primavera y verano",
    actividades: "Caminatas, picnic, descanso rural, fotografía",
    tips: [
      "Llevar repelente y protector solar.",
      "Calzado cómodo para caminatas largas.",
      "Disfrutar de la tranquilidad y desconectar de la ciudad.",
    ],
  },
];

const Carousel = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDestino, setSelectedDestino] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [slideDirection, setSlideDirection] = useState("right");

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setWidth(w);
      if (w < 550) setVisibleCount(1);
      else if (w < 800) setVisibleCount(2);
      else if (w < 1200) setVisibleCount(3);
      else if (w < 1500) setVisibleCount(4);
      else setVisibleCount(5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      const autoSlide = setInterval(() => {
        setSlideDirection("right");
        setStartIndex((prev) => (prev + 1) % destinosData.length);
      }, 4500);
      return () => clearInterval(autoSlide);
    }
  }, [isHovered]);

  const visibleDestinos = useMemo(() => {
    const visibles = [];
    for (let i = 0; i < visibleCount; i++) {
      visibles.push(destinosData[(startIndex + i) % destinosData.length]);
    }
    return visibles;
  }, [startIndex, visibleCount]);

  const openModal = (destino) => {
    setSelectedDestino(destino);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDestino(null);
  };

  const prevSlide = () => {
    setSlideDirection("left");
    setStartIndex((prev) => (prev - 1 + destinosData.length) % destinosData.length);
  };

  const nextSlide = () => {
    setSlideDirection("right");
    setStartIndex((prev) => (prev + 1) % destinosData.length);
  };

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="title-carousel" tabIndex={-1}>
        <h1>Elegí tu próximo destino</h1>
        <h2>Deslizá y descubrí lugares únicos para tu próxima aventura</h2>
      </div>

      <div className="carousel" role="region" aria-label="Carrusel de destinos turísticos">
        <button
          onClick={prevSlide}
          aria-label="Destino anterior"
          className="carousel-button"
          type="button"
        >
          <span className="material-symbols-outlined left">navigation</span>
        </button>

        <div className="carousel-container">
          {visibleDestinos.map((destino, idx) => (
            <div
              key={`${startIndex}-${idx}`}
              className={`carousel-slide slide-${slideDirection}`}
              role="button"
              tabIndex={0}
              aria-label={`Ver detalles del destino ${destino.texto}`}
              onClick={() => openModal(destino)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openModal(destino);
              }}
            >
              <img src={destino.img} alt={`Imagen del destino ${destino.texto}`} />
              <span className="slide-text">{destino.texto}</span>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Destino siguiente"
          className="carousel-button"
          type="button"
        >
          <span className="material-symbols-outlined">navigation</span>
        </button>
      </div>

      {modalOpen && selectedDestino && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabIndex={-1}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 id="modal-title">{selectedDestino.texto}</h2>
            <p><strong>Descripción:</strong> {selectedDestino.descripcion}</p>
            <p><strong>Mejor época para visitar:</strong> {selectedDestino.epoca}</p>
            <p><strong>Actividades recomendadas:</strong> {selectedDestino.actividades}</p>

            <div style={{ marginTop: "1rem", textAlign: "left" }}>
              <strong>Tips para tu viaje:</strong>
              <ul>
                {selectedDestino.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

            <button onClick={closeModal} type="button">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
