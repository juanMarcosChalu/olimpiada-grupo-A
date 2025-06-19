import React from "react";
import "../../../styles/Paquetes.css";
import paquete_romantico from "../../../assets/paqueteromantico.jpeg";
import paquete_familiar from "../../../assets/paquetefamiliar.jpeg";
import paquete_aventurero from "../../../assets/paqueteaventurero.jpeg";
import paquete_naturaleza from "../../../assets/paquetenaturaleza.jpeg";
import paquete_relax from "../../../assets/paqueterelax.jpeg";
import paquete_cultural from "../../../assets/paquetecultural.jpeg";
import { Link } from 'react-router-dom';

function Paquetes() {
    return (
        <section>
           
            <section className="section-paquetes">
                <h1>Descubre nuestras experiencias armadas para que solo te preocupes por disfrutar. <br />Incluyen vuelos, hospedaje, actividades y más.</h1>
                <main className="main-paquetes">

                    <div className="cards-paquetes">
                        <div className="marco-cards">
                            <img src={paquete_romantico} alt="" />
                        </div>
                        <div className="marco-text">
                             <span className="paquete-texto">
                                <span>Paquete Romántico</span>
                                <span>Momentos únicos para disfrutar en pareja.</span>
                            </span>
                        </div>
                        <div className="button-container">
                            <Link to="/paquetes#romanticos" className="link-romantico">Ver Más</Link>
                        </div>



                    </div>

                    <div className="cards-paquetes">
                        <div className="marco-cards">
                            <img src={paquete_familiar} alt=""  />
                        </div>
                        <div className="marco-text">
                            <span className="paquete-texto">
                                <span>Paquete Familiar</span>
                                <span>Diversión y descanso para toda la familia.</span>
                            </span>
                        </div>
                        <div className="button-container">
                            <Link to="/paquetes#familiares" className="link-familiar">Ver Más</Link>
                        </div>

                    </div>

                    <div className="cards-paquetes">
                        <div className="marco-cards">
                            <img src={paquete_aventurero} alt=""  />
                        </div>
                        <div className="marco-text">
                            <span className="paquete-texto">
                                <span>Paquete Aventurero</span>
                                <span>Acción y emoción en cada destino.</span>
                            </span>
                        </div>
                        <div className="button-container">
                              <Link to="/paquetes#aventureros" className="link-aventurero">Ver Más</Link>
                        </div>

                    </div>

                    <div className="cards-paquetes">
                        <div className="marco-cards">
                            <img src={paquete_naturaleza} alt=""/>
                        </div>
                        <div className="marco-text">
                            <span className="paquete-texto">
                                <span>Paquete Naturaleza</span>
                                <span>Conexión plena con entornos naturales.</span>
                            </span>
                        </div>
                        <div className="button-container">
                             <Link to="/paquetes#naturaleza" className="link-naturaleza">Ver Más</Link>
                        </div>

                    </div>

                    <div className="cards-paquetes">
                        <div className="marco-cards">
                            <img src={paquete_relax} alt="" />
                        </div>
                        <div className="marco-text">
                         <span className="paquete-texto">
                            <span>Paquete Relax</span>
                            <span>Descansa, desconecta y renueva tu energía.</span>
                            </span>
                        </div>
                        <div className="button-container">
                            <Link to="/paquetes#relax" className="link-relax">Ver Más</Link>
                        </div>

                    </div>

                    <div className="cards-paquetes">
                        <div className="marco-cards">
                            <img src={paquete_cultural} alt="" />
                        </div>
                        <div className="marco-text">
                             <span className="paquete-texto">
                                <span>Paquete Cultural</span>
                                <span>Explora la historia, el arte y las tradiciones de cada destino.</span>
                                </span>
                        </div>
                        <div className="button-container">
                            <Link to="/paquetes#cultural" className="link-cultural">Ver Más</Link>
                        </div>

                    </div>

                </main>

            </section>
        </section>
    );
}

export default Paquetes;