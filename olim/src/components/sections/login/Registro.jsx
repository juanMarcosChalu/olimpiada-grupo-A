
import React, { useState } from 'react';
import styles from "../../../styles/Registro.module.css"
import fondo from "../../../assets/Logo.png"
import { Link } from 'react-router-dom';
import logo from "../../../assets/Logo.png"
import usePost from "../../../hooks/usePost.js";
import { toast } from "sonner";
function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  
  const [promos, setPromos] = useState(false);
   const { post, loading, error, response } = usePost();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await post("http://localhost:3000/usuario/registrar", {
      usuario: {
        nombre,
        password: contrasena,
        correo,
        recibirPromos: promos,
      }
      
    });
    console.log(error.message);
    
    console.log("✅ Usuario registrado:", res);
    alert("¡Registro exitoso!");
    // Limpieza
    setNombre("");
    setCorreo("");
    setContrasena("");
    setPromos(false);
  } catch (err) {
  // Ahora sí muestra el mensaje real que envió el backend
  toast(err.message);
};}




    

  return (

    < section className={styles.Registro} style={{
      backgroundImage: `url(${logo})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',

    }}>
      <div className={styles.overlay}></div>

      <div className={styles.registroContainer}>

        <h1 className={styles.registerTitle}>Regístrate en Brújula</h1>

        <form className={styles.formulario} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder='Nombre Completo'
            value={nombre}
            required
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="email"
            placeholder='Correo Electrónico'
            value={correo}
            required
            onChange={(e) => setCorreo(e.target.value)}
          />
          <input
            type="password"
            placeholder='Contraseña'
            value={contrasena}
            required
            onChange={(e) => setContrasena(e.target.value)}
          />

          <label className={styles.customcheckbox}>
            <input
              type="checkbox"
              checked={promos}
              onChange={(e) => setPromos(e.target.checked)}
            />
            <span className={styles.checkmark}></span>
            <p>Deseo mantenerme informado sobre promociones de Brújula</p>
          </label>

          <button className={styles.boton} type="submit">Registrarse</button>
        </form>

      </div>
    </section >
  );
}


export default Registro;