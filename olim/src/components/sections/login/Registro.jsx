
import React, { useState } from 'react';
import styles from "../../../styles/Registro.module.css"
import fondo from "../../../assets/Logo.png"
import { Link } from 'react-router-dom';
import logo from "../../../assets/Logo.png"
function Registro() {

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

        <form className={styles.formulario}>
          <input type="text" placeholder='Nombre Completo' />
          <input type="text" placeholder='Correo Electronico' />
          <input type="text" placeholder='Contraseña' />
         
          <label className={styles.customcheckbox}>
            <input type="checkbox" name="" />
            <span className={styles.checkmark}></span>
            <p>Deseo mantenerme informado sobre promociones de Brújula</p>
          </label>
          <button className={styles.boton}>Registrarse</button>
        </form>
        
      </div>
    </section >
  );
}


export default Registro;