import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>MiPortalTurístico</h1>
       <FontAwesomeIcon className="icono" icon={faCartShopping} />
    </nav>
  );
};

export default Navbar;
