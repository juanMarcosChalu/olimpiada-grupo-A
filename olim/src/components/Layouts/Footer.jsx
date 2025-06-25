import React from "react";
import "../../styles/Footer.css"
import { Link } from "react-router-dom";

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

        <h1 className="titulos-footer">Redes Sociales</h1>
        <p className="text-footer">Seguinos en redes</p>


<div className="lista-footer">
  <ol>
    <li className="facebook-container">
      <Link to="https://www.facebook.com/profile.php?id=61577300461429" className="social-link">
        <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="#776B5D">
          <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z" />
        </svg>
        <span>Facebook</span>
      </Link>
    </li>

    <li className="instagram-container">
      <Link to="https://www.instagram.com/brujula.viajes?igsh=ZHd3NWo2Z3hpczZl" className="social-link">
        <svg fill="#776B5D" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 512 512">
          <g id="5151e0c8492e5103c096af88a50059a5">
            <path fillRule="evenodd" clipRule="evenodd" d="M66.084,0.5h379.819c36.079,0,65.597,29.505,65.597,65.584v379.819c0,36.079-29.518,65.597-65.597,65.597H66.084C30.005,511.5,0.5,481.982,0.5,445.903V66.084C0.5,30.005,30.005,0.5,66.084,0.5L66.084,0.5z M372.734,57.264c-12.65,0-23.005,10.355-23.005,23.005v55.067c0,12.65,10.354,23.005,23.005,23.005h57.762c12.65,0,23.005-10.354,23.005-23.005V80.269c0-12.65-10.354-23.005-23.005-23.005H372.734L372.734,57.264z M453.738,216.59h-44.975c4.254,13.897,6.55,28.606,6.55,43.852c0,84.996-71.111,153.898-158.839,153.898c-87.716,0-158.827-68.902-158.827-153.898c0-15.245,2.295-29.954,6.55-43.852H57.276v215.853c0,11.178,9.132,20.322,20.311,20.322h355.841c11.166,0,20.311-9.145,20.311-20.322V216.59L453.738,216.59z M256.475,155.447c-56.677,0-102.625,44.525-102.625,99.443s45.948,99.443,102.625,99.443c56.688,0,102.636-44.525,102.636-99.443S313.163,155.447,256.475,155.447z"/>
          </g>
        </svg>
        <span>Instagram</span>
      </Link>
    </li>
  </ol>
</div>


      </section >
    </footer >

  );
};

export default Footer;
