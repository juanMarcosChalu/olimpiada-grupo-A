import React from "react";
import "../styles/Footer.css"
import { Link } from "react-router-dom";


const Footer = () => {
  return (

    <footer className="footer">

      <section id="legal">

        <div className="titulos-footer">Legal</div>
        <div className="text-footer">© 2025 Brújula <br />Todos los derechos reservados.</div>
        <div className="lista-footer">
          <ol>
            <li><Link to="#">Politíca de Privacidad</Link></li>
            <li><Link to="#">Términos y condicions</Link></li>
          </ol>
        </div>

      </section>

      <section id="explore">

        <div className="titulo-footer">Explora Brujula</div>

        <div className="lista-footer-explore">
          <ol>
            <li><Link to="">Inicio</Link></li>
            <li><Link to="">Servicios</Link></li>
            <li><Link to="">Contacto</Link></li>
            <li><Link to="">Sobre Nosotros</Link></li>
            <li><Link to="">Preguntas Frecuentes</Link></li>
          </ol>
        </div>

      </section>

      <section id="social-media">

        <div className="titulos-footer">Redes Sociales</div>
        <div className="text-footer">Seguinos en redes</div>
        <div className="lista-footer">
          <ol>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="facebook-icon"
            >
              <path d="M12,2c-5.523,0 -10,4.477 -10,10c0,5.013 3.693,9.153 8.505,9.876v-7.226h-2.474v-2.629h2.474v-1.749c0,-2.896 1.411,-4.167 3.818,-4.167c1.153,0 1.762,0.085 2.051,0.124v2.294h-1.642c-1.022,0 -1.379,0.969 -1.379,2.061v1.437h2.995l-0.406,2.629h-2.588v7.247c4.881,-0.661 8.646,-4.835 8.646,-9.897c0,-5.523 -4.477,-10 -10,-10z" />
            </svg>
            <li><Link to="#">Instagram</Link></li>
            <li><Link to="#">Facebook</Link></li>
          </ol>
        </div>

      </section>
    </footer>

  );
};

export default Footer;
