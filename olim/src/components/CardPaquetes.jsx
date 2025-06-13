// CardPaquetes.js
import React from 'react';
import "../styles/CardPaquetes.css"

function CardPaquetes({ 
  titulo, 
  lista, 
  precio, 
  imagenSrc, 
  fondo 
}) {
  return (
    <article className="paquetes-card" style={{ backgroundColor: fondo }}>
      <figure className="foto-card">
        <img src={imagenSrc} alt="Imagen del paquete" />
      </figure>

      <section className="descripcion-card">
        <header className="titulo-cards">
          <h1>{titulo}</h1>
        </header>

        <ul className="lista-card">
          {lista.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <footer className="precio-card">
          <p>{precio}</p>
        </footer>
      </section>
    </article>
  );
}

export default CardPaquetes;