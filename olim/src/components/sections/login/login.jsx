import React, { useState } from 'react';
import styles from "../../../styles/Registro.module.css";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext"; // Asegurate de importar bien
import logo from "../../../assets/Logo.png";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    

    fetch('http://localhost:3000/usuario/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        usuario: {
          nombre: correo, // tu backend espera "nombre", no "email"
          password: contrasena
        }
      })

    });

  };

  return (
    <section className={styles.Registro} style={{
      backgroundImage: `url(${logo})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className={styles.overlay}></div>

      <div className={styles.registroContainer}>
        <h1 className={styles.registerTitle2}>Inicia Sesión en Brújula</h1>

        <form className={styles.formulario} onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder='Correo Electrónico'
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <input
            type="password"
            placeholder='Contraseña'
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <button className={styles.boton} type="submit">Iniciar Sesión</button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <Link className={styles.linkRegister} to="/registro">¿No tienes cuenta? Regístrate</Link>
      </div>
    </section>
  );
}

export default Login;
