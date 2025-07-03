import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../../styles/headerPaquetes.css";

function Header({ title }) {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  return (
    <header className="header2">
      <div className="titulo-Container">
        <h1>{title}</h1>
      </div>
      <nav className="navigation">
        <ul>
          <li className={showSubmenu ? 'fondoActivo' : ''}>
            <Link to="/" className="nav-buttons" onClick={() => setShowSubmenu(false)}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/perfil" title="Mi Perfil">
              <span className="material-symbols-outlined">
                account_circle
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
