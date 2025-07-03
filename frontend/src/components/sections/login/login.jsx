import React, { useState } from 'react';
import styles from "../../../styles/Registro.module.css";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../../../context/authContext"; // Asegurate de importar bien
import logo from "../../../assets/Logo.png";
import usePost from '../../../hooks/usePost';
import { toast } from "sonner";
function Login() {
  const [correo, setCorreo] = useState("");
  const { post, loading, error, response } = usePost();
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await post("https://524b1cba-194b-45f4-8cd4-b359a0dbd23c-00-18uuebkff7yon.kirk.replit.dev/usuario/login", {
        usuario: {
          email: correo,
          password: contrasena,
        },
      });

      console.log(data);
      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Error al iniciar sesión");
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

        <form className={styles.formulario} onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder='Correo Electrónico'
            value={correo}
            name='email'
            onChange={(e) => setCorreo(e.target.value)}
          />
          <input
            type="password"
            placeholder='Contraseña'
            name='password'
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <button className={styles.boton} type="submit">Iniciar Sesión</button>
        </form>


        <Link className={styles.linkRegister} to="/registro">¿No tienes cuenta? Regístrate</Link>
      </div>
    </section>
  );
}

export default Login;
