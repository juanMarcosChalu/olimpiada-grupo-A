import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./contacto.module.css";
import calendar from "../../../assets/svgs/calendar.svg";
import email from "../../../assets/svgs/email.svg";
import phone from "../../../assets/svgs/phone.svg";

function Contacto() {
  const [enviado, setEnviado] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    setEnviado(true);
    e.target.reset();
    setTimeout(() => setEnviado(false), 5000); // Oculta el mensaje después de 5s
  };

  return (
    <main className={styles.main}>
      <section className={styles.contactoContainer}>

        <article className={styles.textoContacto}>
          <p>
            ¡Hola, nos encantaría saber de ti!<br />
            ¿Tienes una pregunta, una idea de viaje o simplemente quieres decirnos algo?
          </p>
        </article>

        <div className={styles.infoGrid}>
          <div className={styles.listaDatos}>
            <ul>
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
                <p>Horario: Lunes a Viernes, de 9:00 a 18:00</p>
              </li>
            </ul>
          </div>

          <div className={styles.redesSociales}>
            <Link to="https://www.facebook.com/profile.php?id=61577300461429" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="#776B5D">
                <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.92 21.59 18.06 20.39 19.61 18.57C21.16 16.75 22.01 14.45 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
              </svg>
              <span>Facebook</span>
            </Link>
            <Link to="https://www.instagram.com/brujula.viajes?igsh=ZHd3NWo2Z3hpczZl" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <svg fill="#776B5D" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 512 512">
                <g><path d="M66.084,0.5h379.819c36.079,0,65.597,29.505,65.597,65.584v379.819c0,36.079-29.518,65.597-65.597,65.597H66.084C30.005,511.5,0.5,481.982,0.5,445.903V66.084C0.5,30.005,30.005,0.5,66.084,0.5z M372.734,57.264c-12.65,0-23.005,10.355-23.005,23.005v55.067c0,12.65,10.354,23.005,23.005,23.005h57.762c12.65,0,23.005-10.354,23.005-23.005V80.269c0-12.65-10.354-23.005-23.005-23.005H372.734L372.734,57.264z M453.738,216.59h-44.975c4.254,13.897,6.55,28.606,6.55,43.852c0,84.996-71.111,153.898-158.839,153.898c-87.716,0-158.827-68.902-158.827-153.898c0-15.245,2.295-29.954,6.55-43.852H57.276v215.853c0,11.178,9.132,20.322,20.311,20.322h355.841c11.166,0,20.311-9.145,20.311-20.322V216.59L453.738,216.59z M256.475,155.447c-56.677,0-102.625,44.525-102.625,99.443s45.948,99.443,102.625,99.443c56.688,0,102.636-44.525,102.636-99.443S313.163,155.447,256.475,155.447z" /></g>
              </svg>
              <span>Instagram</span>
            </Link>
          </div>
        </div>

        <div className={styles.seccionForm}>
          <h1 className={styles.seccionFormTitle}>Envíanos tu mensaje</h1>
          <form onSubmit={manejarEnvio}>
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
              <textarea id="mensaje" name="mensaje" placeholder="Escribe tu mensaje aquí" className={styles.infoForm} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="motivo">Motivo:</label>
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

          {enviado && (
            <p style={{
              textAlign: "center",
              marginTop: "1rem",
              color: "#776b5d",
              fontWeight: "600",
              fontFamily: "Open Sans"
            }}>
              ¡Gracias! Nos contactaremos pronto.
            </p>
          )}
        </div>

      </section>
    </main>
  );
}

export default Contacto;

