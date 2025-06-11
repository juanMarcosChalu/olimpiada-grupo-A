import React from "react";
import "../styles/busqueda.css"; // Import the CSS file for styling
import img from "../assets/fondo-z.jpg";
import logo from "../assets/logo.png";
function Busqueda() {
    return (
        <section className="section-home" >
            <header className="headerBusqueda">
                <div className="logo-container">
                    <img
                        src={logo}
                        alt="Logo de la empresa"
                        className="logo"
                    />
                </div>
                <nav className="navigation">
                    <ul>
                        <li><a href="#home">Destinos</a></li>
                        <li><a href="#packages">Paquetes</a></li>
                        <li><a href="#about">Nosotros</a></li>
                        <li><a href="#contact">Contacto</a></li>
                    </ul>
                </nav>
            </header>
            <main className="main-busqueda" style={{ backgroundImage: `url(${img})` }}>

                <article className="article-busqueda">
                    <form>
                        <span>Origen</span>
                        <input type="text" />

                        <span>Destino</span>
                        <input type="text" />

                        <span>fechas</span>
                        <input type="text" />

                        <span>Pasajeros</span>
                        <input type="text" />

                        <button className="boton">
                            Buscar
                        </button>

                    </form>
                </article>

                <article className="article-fotos-populares">
                </article>

            </main>
        </section>
    );
}

export default Busqueda;