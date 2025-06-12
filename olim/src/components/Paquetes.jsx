import React from "react";
import "../styles/Paquetes.css";
import img from "../assets/disney.jpg"

function Paquetes() {
    return (
        <section>
            <header className="headerPaquetes">
                <div className="title-container">
                    <h1>Paquetes</h1>
                </div>
                <nav className="navigation">
                    <ul>
                        <li><a href="#home">Inicio</a></li>
                        <li><a href="#home">Destinos</a></li>
                        <li><a href="#about">Nosotros</a></li>
                        <li><a href="#contact">Contacto</a></li>
                    </ul>
                </nav>
            </header>
            <section className="section-paquetes">
                <h1>Descubre nuestras experiencias armadas para que solo te preocupes por disfrutar. <br />Incluyen vuelos, hospedaje, actividades y más.</h1>
                <main className="main-paquetes">

                    <div className="cards-paquetes">
                        <div className="marco-cards">
                            <img src={img} alt="" srcset="" />
                        </div>
                        <div className="marco-text">
                            <span>Paquete Romántico
                                Momentos únicos para disfrutar en pareja.</span>
                        </div>
                        <div className="button-container">
                            <a id="link1" href="#">Ver Más</a>
                        </div>



                    </div>

                    <div className="cards-paquetes">
                        <div className="marco-cards">
                            <img src={img} alt="" srcset="" />
                        </div>
                        <div className="marco-text">
                            <span>Paquete Familiar
                                Diversión y descanso para toda la familia.</span>
                        </div>
                        <div className="button-container">
                            <a id="link2" href="#">Ver Más</a>
                        </div>

                    </div>

                    <div className="cards-paquetes">
                        <div className="marco-cards">
                            <img src={img} alt="" srcset="" />
                        </div>
                        <div className="marco-text">
                            <span>Paquete Aventurero
                                Acción y emoción en cada destino.</span>
                        </div>
                        <div className="button-container">
                            <a id="link3" href="#">Ver Más</a>
                        </div>

                    </div>

                    <div className="cards-paquetes">
                        <div className="marco-cards">
                            <img src={img} alt="" srcset="" />
                        </div>
                        <div className="marco-text">
                            <span>Paquete Naturaleza
                                Conexión plena con entornos naturales.</span>
                        </div>
                        <div className="button-container">
                            <a id="link4" href="#">Ver Más</a>
                        </div>

                    </div>

                    <div className="cards-paquetes">
                        <div className="marco-cards">
                            <img src={img} alt="" srcset="" />
                        </div>
                        <div className="marco-text">
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut fuga odit ad accusantium voluptatibus animi id labore sae.</span>
                        </div>
                        <div className="button-container">
                            <a id="link5" href="#">Ver Más</a>
                        </div>

                    </div>

                    <div className="cards-paquetes">
                        <div className="marco-cards">
                            <img src={img} alt="" srcset="" />
                        </div>
                        <div className="marco-text">
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut fuga odit ad accusantium voluptatibus animi id labore sae.</span>
                        </div>
                        <div className="button-container">
                            <a id="link6" href="#">Ver Más</a>
                        </div>

                    </div>

                </main>

            </section>
        </section>
    );
}

export default Paquetes;