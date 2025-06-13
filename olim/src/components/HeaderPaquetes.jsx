import React, { useState } from "react";
import logo from "../assets/Logo.png"; // Import the logo image
import { Link } from 'react-router-dom';
import "../styles/headerPaquetes.css"
function Header({title}) {
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
                        <button className={`nav-buttons`} onClick={toggleSubmenu}>
                            Inicio
                        </button>

                    </li>
                    <li>
                        <Link to="">
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