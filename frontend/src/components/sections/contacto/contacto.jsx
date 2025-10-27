import React, { useState } from "react";
import styles from "./contacto.module.css";
import calendar from "../../../assets/svgs/calendar.svg";
import email from "../../../assets/svgs/email.svg";
import phone from "../../../assets/svgs/phone.svg";
import home from "../../../assets/svgs/home.svg";
import facebook from "../../../assets/svgs/facebook.svg";
import instagram from "../../../assets/svgs/instagram.svg";

function Contacto() {
  const [enviado, setEnviado] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    setEnviado(true);
    e.target.reset();
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <>
      {enviado && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#c8e6c9",
            color: "#2e7d32",
            padding: "1rem 2rem",
            borderRadius: "8px",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
            fontWeight: "bold",
            zIndex: 9999,
            fontSize: "1.1rem",
            animation: "fadeInOut 4s forwards",
          }}
        >
          ¡Gracias por tu mensaje! En breve nos pondremos en contacto.
        </div>
      )}

      <main className={styles.main}>
        <section className={styles.contactoContainer}>
          <article className={styles.textoContacto}>
            <p>
              ¡Hola, nos encantaría saber de ti!
              <br />
              ¿Tienes una pregunta, una idea de viaje o simplemente quieres decirnos algo?
            </p>
          </article>

          <div className={styles.infoGrid}>
            <div className={styles.listaDatos}>
              <ul>
                <li>
                  <img src={email} alt="Email" />
                  <p>
                    Email:{" "}
                    <a href="mailto:Brujula.viajes@gmail.com">
                      Brujula.viajes@gmail.com
                    </a>
                  </p>
                </li>
                <li>
                  <img src={phone} alt="Teléfono" />
                  <p>Teléfono: 2281 954323</p>
                </li>
                <li>
                  <img src={home} alt="Sucursal" />
                  <p>Dirección: AV, Alsina 1234</p>
                </li>
                <li>
                  <img src={calendar} alt="Horario" />
                  <p>Horario: Lunes a Viernes, de 9:00 a 18:00</p>
                </li>
              </ul>
            </div>

            <section className={styles.redesContainer}>
              <div className={styles.facebookContainer}>
                <a
                  href="https://www.facebook.com/profile.php?id=61577300461429"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <img src={facebook} alt="Facebook" />
                  <span>Facebook</span>
                </a>
              </div>

              <div className={styles.instagramContainer}>
                <a
                  href="https://www.instagram.com/brujula.viajes?igsh=ZHd3NWo2Z3hpczZl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <img src={instagram} alt="Instagram" />
                  <span>Instagram</span>
                </a>
              </div>
            </section>
          </div>

          <div className={styles.seccionForm}>
            <h1 className={styles.seccionFormTitle}>Envíanos tu mensaje</h1>
            <form onSubmit={manejarEnvio}>
              <div className={styles.formGroup}>
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Tu nombre"
                  className={styles.infoForm}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="correo">Correo electrónico:</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  placeholder="tu@correo.com"
                  className={styles.infoForm}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="asunto">Asunto:</label>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  placeholder="Asunto del mensaje"
                  className={styles.infoForm}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="mensaje">Mensaje:</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  placeholder="Escribe tu mensaje aquí"
                  className={styles.infoForm}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="motivo">Motivo:</label>
                <select
                  id="motivo"
                  name="motivo"
                  className={styles.infoForm}
                  required
                >
                  <option value="">Selecciona un motivo</option>
                  <option value="consulta">Consulta</option>
                  <option value="soporte">Soporte</option>
                  <option value="otros">Otros</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <button type="submit" className={styles.formButton}>
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Contacto;
