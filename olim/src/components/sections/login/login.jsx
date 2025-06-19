import React, { useState } from 'react';
import styles from "../../../styles/Registro.module.css"
import fondo from "../../../assets/Logo.png"
import { Link } from 'react-router-dom';

function Login() {

  return (

    < section className={styles.Registro} >

      <div className={styles.registroContainer}>

        <h1 className={styles.registerTitle2}>Inicia Sesion En Brújula</h1>

        <form className={styles.formulario}>
          <input type="email" placeholder='Correo Electronico' />
          <input type="text" placeholder='Contraseña' />
         
        
          <button className={styles.boton}>Iniciar Sesion</button>
        </form>
        <Link className={styles.linkRegister}>¿No tienes cuenta? Registrate</Link>
      </div>
    </section >
  );
}
export default Login;