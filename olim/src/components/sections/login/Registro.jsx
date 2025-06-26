
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
toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });

  const data = {
    usuario: {
      nombre,
      password: contrasena,
      correo,
      recibirPromos: promos
    }
  };

  const res = await post("http://localhost:3000/usuario/registrar", data);

  // Limpieza si no hubo error
  if (!error && res) {
    setNombre("");
    setCorreo("");
    setContrasena("");
    setPromos(false);
    alert("¡Registro exitoso!");
  }

  if (error) {
    alert(error);
  }
};

    

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
            onChange={(e) => setNombre(e.target.value)}
          />
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