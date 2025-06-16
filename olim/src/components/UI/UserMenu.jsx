import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/UserMenu.module.css';

function UsuarioMenu() {
    const [userOpen, setUserOpen] = useState(false);
    document.addEventListener("click", (e) => {
        if (!e.target.closest(`.${styles.userButton}`)) {
          setUserOpen(false);
        }
      });
    return (
        <li className={styles.userItem}>
            <button onClick={() => setUserOpen(!userOpen)} className={styles.userButton}>
                <span className="material-symbols-outlined">account_circle</span>
            </button>

            {userOpen && (
                <div className={styles.userBox}>
                    <div className={styles.usercontain}>
                        <span className={`${styles.icon} material-symbols-outlined`}>account_circle</span>
                        <h1 className={styles.greeting}>¡Hola, Martina!</h1>
                    </div>

                    <hr className={styles.divider} />
                    <ul className={styles.options}>
                        <Link to="/perfil">
                            <li>
                                <span className={`${styles.icon} material-symbols-outlined`}>person</span>Mi perfil</li>
                        </Link>
                        <Link to="/Favoritos">
                        <li><span className={`${styles.icon} material-symbols-outlined`}>favorite</span>Mis favoritos</li>
                        </Link>
                        <Link to="/Notificaciones">
                        <li><span className={`${styles.icon} material-symbols-outlined`}>notifications</span>Notificaciones</li>
                        </Link>
                    </ul>
                    <button className={styles.logout}>Cerrar Sesión</button>
                </div>
            )}
        </li>
    );
}

export default UsuarioMenu;
