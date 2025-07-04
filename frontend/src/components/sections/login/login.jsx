import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import usePost from '../../../hooks/usePost';
import { useAuth } from "../../../context/authContext";
import logo from "../../../assets/Logo.png";
import '../../../styles/login.css'; // Asegurate que la ruta sea correcta

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { post } = usePost();
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

      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <section
      className="Registro"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="overlay"></div>

      <div className="registroContainer">
        <h1 className="registerTitle2">Iniciá sesión </h1>
        <h2 className="subTitle">Brújula Viajes</h2>


        <form className="formulario" onSubmit={handleFormSubmit}>
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
          <button className="boton" type="submit">
            Iniciar Sesión
          </button>
        </form>

        <Link className="linkRegister" to="/registro">
          ¿No tenés cuenta? Registrate
        </Link>

         {/* Botón para volver al inicio */}
        <Link to="/">
        <button className="boton boton-volver">
          Volver al Inicio
          </button>

        </Link>

      </div>
    </section>
  );
}

export default Login;
