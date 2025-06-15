// import React, { useState } from "react";
// import "../../styles/header.css"; // Import the CSS file for styling
// import logo from "../../assets/Logo.png"; // Import the logo image
// import { Link } from 'react-router-dom';
// function Header() {
//   const [showSubmenu, setShowSubmenu] = useState(false);

//   const toggleSubmenu = () => {
//     setShowSubmenu(!showSubmenu);
//   };
//   return (
//     <header className="header">
//       <div className="logo-container">
//         <img
//           src={logo}
//           alt="Logo de la empresa"
//           className="logo"
//         />
//       </div>
//       <nav className="navigation">
//         <ul>

//           <li className={showSubmenu ? 'fondoActivo' : ''}>
//             <button className={`nav-buttons`} onClick={toggleSubmenu}>
//               Servicios
//             </button>

//             <ul className={showSubmenu ? 'submenu opacityon' : 'submenu opacityoff'}>
//               <li><Link to="/vuelos">Vuelos</Link></li>
//               <li><Link to="">Alquileres de auto</Link></li>
//               <li><Link to="">Alojamiento</Link></li>
//               <li><Link to="">Paquetes</Link></li>
//               <li><Link to="">Asistencia al Viajero</Link></li>
//             </ul>

//           </li>
//           <li>
//             <Link to="" className="nav-buttons">Contacto</Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// }


// export default Header;