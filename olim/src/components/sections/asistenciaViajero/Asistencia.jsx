import React from "react";
import styles from "./asistencia.module.css"
import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/header";

function Asistencia() {

    return (
        <main>
            <section className={styles.headAsistencia}>
                <p>Encuentra la proteccion adecuada para tu viaje y viajar con tranquilidad.</p>
            </section>
            <section className={styles.entradasAsistencia}>
                <input type="text" value="Fecha de inicio" />
                <input type="text" value="Destino" />
                <input type="button" value="Buscar" />
            </section>

            <section className={styles.cardsAsistencia}>
                <div className={styles.planBasico}>
                    <h1>Plan Básico</h1>
                    <h2>50.000 <b>ARG</b> por semana</h2>
                    <p>Incluye:</p>
                    <div className={styles.listaContainer}>
                        <ol>
                            <li>Atención medica por enfermedad o accidente hasta 5.000.000 <b>ARG</b></li>
                            <li>Medicación ambulatoria</li>
                            <li>Atención odontológica de urgencia</li>
                            <li>Atención odontológica de urgencia</li>
                            <li>Atención odontológica de urgencia</li>
                            <li>No cubre cancelación de viaje </li>
                            <li>No incluye repatriación sanitaria</li>
                        </ol>
                    </div>
                    <div className={styles.containerButton}>
                        <input type="button" value="Seleccionar" />
                    </div>
                </div>
                <div className={styles.planEstandar}>
                    <h1>Plan Estándar</h1>
                    <h2>100.000 <b>ARG</b> por semana</h2>
                    <p>Incluye:</p>
                    <div className={styles.listaContainer}>
                        <ol>
                            <li>Atención medica por enfermedad o accidente hasta 10.000.000 <b>ARG</b></li>
                            <li>Medicación ambulatoria + hospitalizacion</li>
                            <li>Atención odontológica de urgencia</li>
                            <li>Asistencia telefónica 24/7 en múltiples idiomas</li>
                            <li>Asistencia legal presencial</li>
                            <li>Cobertura por perdida de equipaje hasta 500.000 <b>ARG</b></li>
                            <li>Cancelacion e interrupcion de viaje por fuerza mayor</li>
                            <li>No cubre deportos extremos</li>
                            <li>No incluye proteccion de dispositivos moviles</li>
                        </ol>
                    </div>
                    <div className={styles.containerButton}>
                        <input type="button" value="Seleccionar" />
                    </div>
                </div>
                <div className={styles.planPremium}>
                    <h1>Plan Premium</h1>
                    <h2>250.000 <b>ARG</b> por semana</h2>
                    <p>Incluye:</p>

                    <div className={styles.listaContainer}>
                        <ol>
                            <li>Atención medica por enfermedad o accidente hasta 100.000.000 <b>ARG</b></li>
                            <li>Medicación + hospitalizacion + cirugia</li>
                            <li>Atención odontológica de urgencia</li>
                            <li>Servicio de orientación legal telefónica</li>
                            <li>Cancelacion total de viaje por cualquier motivo justificado</li>
                            <li>Asistencia legal completa + tramites de emergencia</li>
                            <li>Reparacion sanitaria y funeraria</li>
                            <li>Perdida o robo de equipaje de riesgo hasta 1.000.000 <b>ARG</b></li>
                            <li>Proteccio de dispositivos moviles hasta 500.000 <b>ARG</b></li>
                            <li>Acceso prioritario al centro de ayuda 24/7</li>
                            <li>App con geolocalizacion de clinicas cercanas</li>
                        </ol>
                    </div>
                    <div className={styles.containerButton}>
                        <input type="button" value="Seleccionar" />
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Asistencia;