import React from "react";
import "../../styles/Footer.css";
import { Link } from "react-router-dom";
import facebook from "../../assets/svgs/facebook.svg";
import instagram from "../../assets/svgs/instagram.svg";

const Footer = () => {
  return (
    <footer className="footer">

      <section id="legal">
        <div className="titulos-footer">Legal</div>
        <div className="text-footer">© 2025 Brújula <br />Todos los derechos reservados.</div>
        <div className="lista-footer">
          <ol>
            <li><Link to="/politica-privacidad">Política de Privacidad</Link></li>
            <li><Link to="/terminos-condiciones">Términos y Condiciones</Link></li>
          </ol>
        </div>
      </section>

      <section id="explore">
        <div className="titulo-footer">Explora Brújula</div>
        <div className="lista-footer-explore">
          <ol>
            <li><Link to="/carritoPage">Carrito</Link></li>
            <li><Link to="/perfil">Mi perfil</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ol>
        </div>
      </section>

      <section id="social-media">
        <h1 className="titulos-footer">Redes Sociales</h1>
        <p className="text-footer">Seguinos en redes</p>

        <div className="lista-footer">
          <ol>
            <li className="facebook-container">
              <a
                href="https://www.facebook.com/profile.php?id=61577300461429"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="Facebook Logo" id="facebookLogoFooter" />
                <span>Facebook</span>
              </a>
            </li>

            <li className="instagram-container">
              <a
                href="https://www.instagram.com/brujula.viajes?igsh=ZHd3NWo2Z3hpczZl"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="Instagram Logo" id="instagramLogoFooter" />
                <span>Instagram</span>
              </a>
            </li>
          </ol>
        </div>

      </section>
    </footer>
  );
};

export default Footer;
