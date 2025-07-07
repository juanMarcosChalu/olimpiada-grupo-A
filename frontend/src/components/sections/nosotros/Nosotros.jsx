import React from "react";
import "../../../styles/nosotros.css";
import logoEscuela from "../../../assets/logoescuela.jpg";

import image_of_martina from "../../../assets/Martina.jpg"
import image_of_jeremias from "../../../assets/Jeremias.jpg"
import image_of_gianluca from "../../../assets/Gianluca.jpg"

const integrantes = [
  {
    nombre: "Jeremías Cepeda",
    rol: "Líder del grupo",
    descripcion: "Coordina al equipo con compromiso y claridad. Encargado de la organización general del proyecto.",
    imagen: image_of_jeremias,
  },
  {
    nombre: "Gianluca Rivero",
    rol: "Analista funcional",
    descripcion: "Interpreta las necesidades del usuario y traduce ideas en funciones claras para el desarrollo.",
    imagen: image_of_gianluca,
  },
  {
    nombre: "Martina Gutiérrez",
    rol: "Diseñadora gráfica",
    descripcion: "Diseña la identidad visual de Brújula. Apasionada por lo estético, lo claro y lo coherente.",
    imagen: image_of_martina,
  },
  {
    nombre: "Juan Chalú",
    rol: "Programador",
    descripcion: "Desarrolla las funcionalidades de Brújula con precisión, lógica y constancia.",
    imagen: "https://api.dicebear.com/7.x/adventurer/svg?seed=Juan",
  },
  {
    nombre: "Bruno Valenzuela",
    rol: "Programador",
    descripcion: "Firme en el desarrollo frontend. Se enfoca en que todo funcione y se vea correctamente desde el navegador.",
    imagen: "https://api.dicebear.com/7.x/adventurer/svg?seed=Bruno",
  },
];


function Nosotros() {
  return (
    <section className="nosotros-container">
        <img src={logoEscuela} alt="Logo EEST N°1" className="logo-escuela" />
      <h2 className="titulo-nosotros">Sobre Nosotros</h2>
      <p className="intro-nosotros">
        Somos un equipo de estudiantes de 7° año de la EEST N°1 "República de México", unidos por el entusiasmo de crear soluciones útiles a través de la tecnología. En Brújula combinamos análisis, diseño y desarrollo para ayudarte a viajar mejor.
      </p>
      <div className="cards-container">
        {integrantes.map((persona, index) => (
          <div key={index} className="card-integrante">
            <img
              src={persona.imagen}
              alt={persona.nombre}
              className="img-integrante"
            />
            <h3>{persona.nombre}</h3>
            <h4>{persona.rol}</h4>
            <p>{persona.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Nosotros;
