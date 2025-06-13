import React from "react";
import "../styles/Paquetes.css";
import img from "../assets/disney.jpg"
import { Link } from 'react-router-dom';

function Paquetes() {
    return (
        <section>
            <header className="headerPaquetes">
                <div className="title-container">
                    <h1>Paquetes</h1>
                </div>  
                <nav className="navigation">
                    <ul>
                        <li><Link to="">Inicio</Link></li>
                        <li><Link to="">Destinos</Link></li>
                        <li><Link to="">Nosotros</Link></li>
                        <li><Link to="">Contacto</Link></li>
                    </ul>
                </nav>
            </header>
            <section className="section-paquetes">
                <h1>Descubre nuestras experiencias armadas para que solo te preocupes por disfrutar. <br />Incluyen vuelos, hospedaje, actividades y más.</h1>
                <main className="main-paquetes">

                    <div className="cards-paquetes">
                        <div className="marco-cards">
                            <img src={img} alt="" />
                        </div>
                        <div className="marco-text">
                            <span>Paquete Romántico
                                Momentos únicos para disfrutar en pareja.</span>
                        </div>
                        <div className="button-container">
                            <Link id="link1" to="">Ver Más</Link>
                        </div>



                    </div>

                    <div className="cards-paquetes">
                        <div className="marco-cards">
                            <img src={img} alt=""  />
                        </div>
                        <div className="marco-text">
                            <span>Paquete Familiar
                                Diversión y descanso para toda la familia.</span>
                        </div>
                        <div className="button-container">
                            <Link id="link2" to="">Ver Más</Link>
                        </div>

                    </div>

                    <div className="cards-paquetes">
                        <div className="marco-cards">
                            <img src={img} alt=""  />
                        </div>
                        <div className="marco-text">
                            <span>Paquete Aventurero
                                Acción y emoción en cada destino.</span>
                        </div>
                        <div className="button-container">
                            <Link id="link3" to="">Ver Más</Link>
                        </div>

                    </div>

                    <div className="cards-paquetes">
                        <div className="marco-cards">
                            <img src={img} alt=""/>
                        </div>
                        <div className="marco-text">
                            <span>Paquete Naturaleza
                                Conexión plena con entornos naturales.</span>
                        </div>
                        <div className="button-container">
                            <Link id="link4" to="">Ver Más</Link>
                        </div>

                    </div>

                    <div className="cards-paquetes">
                        <div className="marco-cards">
                            <img src={img} alt="" />
                        </div>
                        <div className="marco-text">
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </span>
                        </div>
                        <div className="button-container">
                            <Link id="link5" to="">Ver Más</Link>
                        </div>

                    </div>

                    <div className="cards-paquetes">
                        <div className="marco-cards">
                            <img src={img} alt="" />
                        </div>
                        <div className="marco-text">
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </span>
                        </div>
                        <div className="button-container">
                            <Link id="link6" to="">Ver Más</Link>
                        </div>

                    </div>

                </main>

            </section>
        </section>
    );
}

export default Paquetes;