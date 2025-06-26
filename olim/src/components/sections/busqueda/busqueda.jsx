import React, { useState } from "react";
import "../../../styles/busqueda.css";
import { useNavigate } from "react-router-dom";

import paris from "../../../assets/paris.jpg";
import madrid from "../../../assets/madrid.jpg";
import newyork from "../../../assets/newyork.jpg";
import turquia from "../../../assets/turquia.jpg";
import fondo from "../../../assets/fondo-z.JPG";

function Busqueda() {
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    origen: "",
    destino: "",
    fechas: "",
    pasajeros: "",
  });

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    navigate("/resultadosvuelos", { state: datos });
  };

  return (
    <section className="section-busqueda">
      <main className="main-busqueda">
        <div className="background" style={{ backgroundImage: `url(${fondo})` }}>
          <div className="overlay"></div>
        </div>

        <article className="article-busqueda">
          <form onSubmit={handleBuscar}>
            <label>
              Origen
              <input
                type="text"
                name="origen"
                placeholder="Ingrese desde donde se dirige"
                value={datos.origen}
                onChange={handleChange}
              />
            </label>

            <label>
              Destino
              <input
                type="text"
                name="destino"
                placeholder="Ingrese hacia donde se dirige"
                value={datos.destino}
                onChange={handleChange}
              />
            </label>

            <label>
              Fechas
              <input
                type="date"
                name="fechas"
                value={datos.fechas}
                onChange={handleChange}
              />
            </label>

            <label>
              Pasajeros
              <input
                type="text"
                name="pasajeros"
                placeholder="Cantidad de pasajeros"
                value={datos.pasajeros}
                onChange={handleChange}
              />
            </label>

            <button type="submit" className="boton">Buscar</button>
          </form>
        </article>

        <article className="article-fotos-populares">
          <h1 className="text-fotos">Destinos Estrellas</h1>
          <div className="images-container">
            <div className="Busqueda-ImageContainer">
              <img src={paris} alt="paris" className="imagenesPopulares" />
              <div className="overlay"><span>Paris</span></div>
            </div>
            <div className="Busqueda-ImageContainer">
              <img src={madrid} alt="madrid" className="imagenesPopulares" />
              <div className="overlay"><span>Madrid</span></div>
            </div>
            <div className="Busqueda-ImageContainer">
              <img src={newyork} alt="new york" className="imagenesPopulares" />
              <div className="overlay"><span>New York</span></div>
            </div>
            <div className="Busqueda-ImageContainer">
              <img src={turquia} alt="turquia" className="imagenesPopulares" />
              <div className="overlay"><span>Turquía</span></div>
            </div>
          </div>
        </article>
      </main>
    </section>
  );
}

export default Busqueda;
