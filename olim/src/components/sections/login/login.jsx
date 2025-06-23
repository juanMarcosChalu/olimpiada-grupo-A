import React, { useState } from 'react';
import styles from "../../../styles/Registro.module.css";
import { useNavigate, Link} from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext"; // Asegurate de importar bien
import logo from "../../../assets/Logo.png";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // importante para sesiones
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      login(data.usuario); // Guardamos en contexto
      navigate("/perfil"); // Redirigir
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    }
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

        <form className={styles.formulario} onSubmit={handleSubmit}>
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
