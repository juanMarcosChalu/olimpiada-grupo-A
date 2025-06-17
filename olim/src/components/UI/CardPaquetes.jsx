// CardPaquetes.js
import React from 'react';
import "../../styles/CardPaquetes.css"

function CardPaquetes({ 
  titulo, 
  precio, 
  imagenSrc, 
  fondo,
  resumen,
  onVerMas 
}) {
  const [OpenModal, setOpenModal] = React.useState(false);
  function handleOpenModal() {
    setOpenModal(!OpenModal);
    console.log(OpenModal);
  }
  return (
    <article className="paquetes-card" style={{ backgroundColor: fondo }}>
      
      <figure className="foto-card">
        <img src={imagenSrc} alt="Imagen del paquete" />
      </figure>

      <section className="descripcion-card">
        <header className="titulo-cards">
          <h1>{titulo}</h1>
        </header>
        <p className='CardPaquetesResumen'>{resumen}</p>
       

        <div className="precio-card">
          <p>{precio}</p>
        </div>
        <section className="botones-card">
          <button className="boton-card" onClick={onVerMas}>Ver más</button>
        </section>
      </section>
    </article>
  );
}

export default CardPaquetes;