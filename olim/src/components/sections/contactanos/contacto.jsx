import React from "react";
import styles from "./contacto.module.css";
import Footer from "../../Layouts/Footer.jsx";
import calendar from "../../../assets/svgs/calendar.svg";
import email from "../../../assets/svgs/email.svg";
import phone from "../../../assets/svgs/phone.svg";

function Contacto() {
    return (
        <main className={styles.main}>
            <section className={styles.contactoContainer}>
                <article className={styles.textoContacto}>
                    <span>
                        ¡Hola, nos encantaría saber de ti!
                        ¿Tienes una pregunta, una idea de viaje o simplemente quieres decirnos algo?
                    </span>
                </article>

                <article className={styles.listaRedes}>
                    <ol>
                        <li>
                            <img src={email} alt="Email" />
                            <p>Email: <a href="mailto:Brujula.viajes282@gmail.com">Brujula.viajes282@gmail.com</a></p>
                        </li>
                        <li>
                            <img src={phone} alt="Teléfono" />
                            <p>Teléfono: 2281 311055</p>
                        </li>
                        <li>
                            <img src={calendar} alt="Horario" />
                            <p>Horario de atención: Lunes a Viernes, de 9:00 a 18:00</p>
                        </li>
                    </ol>
                </article>

                <article className={styles.seccionForm}>
                    <form>
                        <h1>Nombre</h1>
                        <input type="text" placeholder="Nombre" />

                        <h1>Correo Electrónico</h1>
                        <input type="text" placeholder="Correo electrónico" />

                        <h1>Asunto</h1>
                        <input type="text" placeholder="Asunto" />

                        <h1>Mensaje</h1>
                        <input type="text" placeholder="Mensaje" />

                        <h1>Motivo</h1>
                        <input type="button" className={styles.botonFomm} value="Enviar Mensaje" />
                    </form>
                </article>
            </section>
            {/* <Footer /> */}
        </main>
    );
}

export default Contacto;
