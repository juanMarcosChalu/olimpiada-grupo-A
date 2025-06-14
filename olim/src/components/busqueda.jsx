import React from "react";
import "../styles/busqueda.css"; // Import the CSS file for styling
import paris from "../assets/paris.jpg";
import madrid from "../assets/madrid.jpg";
import newyork from "../assets/newyork.jpg";
import turquia from "../assets/turquia.jpg";
import fondo from "../assets/fondo-z.JPG"
import { Link } from "react-router-dom";
function Busqueda() {
    return (
        <section className="section-busqueda" >
            <header className="headerBusqueda">
                <div className="titulo-container">
                    <h1>Destinos</h1>
                </div>
                <nav className="navigation">
                    <ul>
                        <li><Link to="">Destinos</Link></li>
                        <li><Link to="">Paquetes</Link></li>
                        <li><Link to="">Nosotros</Link></li>
                        <li><Link to="">Contacto</Link></li>
                    </ul>
                </nav>
            </header>
            
            <main className="main-busqueda" >
                <div className="background" style={{ backgroundImage: `url(${fondo})` }}>
                <div className="overlay">

                </div>
            </div>
                <article className="article-busqueda">
                    <form>
                        <label>
                            Origen
                            <input type="text" name="origen" placeholder="Correo electrónico" />
                        </label>

                        <label>
                            Destino
                            <input type="text" name="destino" placeholder="Correo electrónico" />
                        </label>

                        <label>
                            Fechas
                            <input type="date" name="fechas" />
                        </label>

                        <label>
                            Pasajeros
                            <input type="text" name="pasajeros" placeholder="Correo electrónico" />
                        </label>

                        <button className="boton">Buscar</button>
                    </form>

                </article>

                <article className="article-fotos-populares">

                    <h1 className="text-fotos">Destinos Estrellas</h1>
                    <div className="images-container">
                        <div className="Busqueda-ImageContainer">
                            <img src={paris} alt="paris, francia" className="imagenesPopulares" />
                            <div className="overlay">
                                <span>
                                    Paris
                                </span>
                            </div>
                        </div>
                        <div className="Busqueda-ImageContainer">
                            <img src={madrid} alt="madrid, españa" className="imagenesPopulares" />
                            <div className="overlay">
                                <span>
                                    Madrid
                                </span>
                            </div>
                        </div>
                        <div className="Busqueda-ImageContainer">
                            <img src={newyork} alt="newyork, eeuu" className="imagenesPopulares" />
                            <div className="overlay">
                                <span>
                                    Newyork
                                </span>
                            </div>
                        </div>
                        <div className="Busqueda-ImageContainer">
                            <img src={turquia} alt="turqui" className="imagenesPopulares" />
                            <div className="overlay">
                                <span>
                                    Turquia
                                </span>
                            </div>
                        </div>

                    </div>
                </article>

            </main>
        </section>
    );
}

export default Busqueda;