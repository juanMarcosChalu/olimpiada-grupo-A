import React, { useState } from 'react';
import styles from "../../../styles/Registro.module.css";
import { useNavigate, Link } from 'react-router-dom';
import logo from "../../../assets/Logo.png";
import usePost from "../../../hooks/usePost.js";
import { toast } from "sonner";

function Registro() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [birthday, setBirthday] = useState('');
  const [promos, setPromos] = useState(false);
  const { post } = usePost();
  const navigate = useNavigate();

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await post("/usuario/registrar", {
        usuario: {
          nombre,
          apellido,
          correo,
          password: contrasena,
          fechaNacimiento: birthday,
          recibirPromos: promos,
        }
      });

      toast.success("Registro exitoso");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Error en el registro");
    }
  };

  return (
    <section
      className={styles.Registro}
      style={{
        backgroundImage: `url(${logo})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className={styles.overlay}></div>

      <div className={styles.registroContainer}>
        <h1 className={styles.registerTitle2}>Creá tu cuenta</h1>
        <h2 className={styles.registerTitle3}>Brújula Viajes</h2>

        <form className={styles.formulario} onSubmit={handleSubmitRegister}>
          <div className={styles.doubleInput}>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>

          <input
            type="email"
            placeholder="Correo Electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />

 <div className={styles.inputGroup}>
  <input
    type="date"
    value={birthday}
    onChange={(e) => setBirthday(e.target.value)}
    required
    className={birthday ? styles.filled : ""}
  />
  <span
    className={`${styles.fakePlaceholder} ${birthday ? styles.oculto : ""}`}
  >
    Fecha de nacimiento
  </span>
</div>




          <label className={styles.customcheckbox}>
            <input
              type="checkbox"
              checked={promos}
              onChange={(e) => setPromos(e.target.checked)}
            />
            <span className={styles.checkmark}></span>
            <p>Quiero recibir promociones y novedades de Brújula</p>
          </label>

          <button className={styles.boton} type="submit">Registrarme</button>
        </form>

       <div className={styles.linkWrapper}>
  <Link className={styles.linkLogin} to="/login">
    ¿Ya tenés cuenta? Iniciá sesión
  </Link>

  <Link to="/">
    <button className={styles["boton-volver"]}>
      Volver al Inicio
    </button>
  </Link>
</div>
      </div>
    </section>
  );
}

export default Registro;
