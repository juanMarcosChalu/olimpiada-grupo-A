import React, { useState } from 'react';
import styles from "../../../styles/Registro.module.css"
import fondo from "../../../assets/Logo.png"


function Registro() {

  return (

    < section className={styles.Registro} style={{ backgroundImage: `url(${fondo})` }}>

      <div className={styles.registroContainer}>

        <h1>Regístrate en Brújula</h1>

        <form className={styles.formulario}>
          <input type="text" placeholder='Nombre Completo' />
          <input type="text" placeholder='Correo Electronico' />
          <input type="text" placeholder='Contraseña' />
          <span className={styles.checkbox}><input type="checkbox" name="" id="" />Deseo mantenerme informado sobre promociones de Brújula.</span>
          <button className={styles.boton}>hola</button>
        </form>

      </div>
    </section >
  );
}


export default Registro;