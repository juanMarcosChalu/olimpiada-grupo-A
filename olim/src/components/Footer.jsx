import React from "react";
import "../styles/Footer.css"
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="footer">

      <section id="legal">

        <div className="titulos-footer">Legal</div>
        <div className="text-footer">© 2025 Brújula Todos los derechos reservados.</div>
        <div className="lista-footer">
          <ol>
            <li><Link to="#">Politíca de Privacidad</Link></li>
            <li><Link to="#">Términos y condicions</Link></li>
          </ol>
        </div>

      </section>

      <section id="explore">
        
      <div className="titulo-footer">Explora Brujula</div>
      
        <div className="lista-footer">
          <ol>
            <li><Link to="#">Inicio</Link></li>
            <li><Link to="#">Servicios</Link></li>
            <li><Link to="#">Contacto</Link></li>
            <li><Link to="#">Sobre Nosotros</Link></li>
            <li><Link to="#">Preguntas Frecuentes</Link></li>
          </ol>
        </div>

      </section>

      <section id="social-media">

        <div className="titulos-footer">Redes Sociales</div>
        <div className="text-footer">Seguinos en redes</div>
        <div className="lista-footer">
          <ol>
            <li><Link to="#">Instagram</Link></li>
            <li><Link to="#">Facebook</Link></li>
          </ol>
        </div>

      </section>
    </footer>
  );
};

export default Footer;
