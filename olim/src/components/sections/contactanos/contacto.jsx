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
                    <h1 className={styles.seccionFormTitle}>Envianos tu mensaje</h1>
                    <form>

                        <div className={styles.formGroup}>
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" className={styles.infoForm} required />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="correo">Correo electrónico:</label>
                            <input type="email" id="correo" name="correo" placeholder="tu@correo.com" className={styles.infoForm} required />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="asunto">Asunto:</label>
                            <input type="text" id="asunto" name="asunto" placeholder="Asunto del mensaje" className={styles.infoForm} required />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="mensaje">Mensaje:</label>
                            <textarea id="mensaje" name="mensaje" placeholder="Escribe tu mensaje aquí" rows="5" className={styles.infoForm} required></textarea>
                        </div>

                        <div className={styles.formGroup}>
                            <label  htmlFor="motivo">Motivo:</label>
                            <select id="motivo" name="motivo" className={styles.infoForm} required>
                                <option value="">Selecciona un motivo</option>
                                <option value="consulta">Consulta</option>
                                <option value="soporte">Soporte</option>
                                <option value="otros">Otros</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <button type="submit" className={styles.formButton}>Enviar Mensaje</button>
                        </div>

                    </form>

                </article>
            </section>
            {/* <Footer /> */}
        </main>
    );
}

export default Contacto;
