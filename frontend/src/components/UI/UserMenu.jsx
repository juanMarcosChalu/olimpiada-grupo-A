import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/UserMenu.module.css';
import { useAuth } from "../../hooks/useAuth.js";
function UsuarioMenu() {
    const { usuario, cargando, error,isLogin } = useAuth();
    const [userOpen, setUserOpen] = useState(false);
    //function for closed session

    const handleLogout = async () => {
        try {
            const response = await fetch('https://4479f971-1d51-4b67-938a-a80b7de0af34-00-3inmgxot9m6r9.picard.replit.dev/usuario/logout', {
                method: 'POST',
                credentials: 'include'
            });
            if (response.ok) {
                window.location.href = '/';
            } else {
                console.error('Error al cerrar sesión');
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };
    document.addEventListener("click", (e) => {
        
        
        if (!e.target.closest(`.${styles.userButton}`)) {
            setUserOpen(false);
        }
    });
    
    return (
        <div className={styles.userItem}>
            <button onClick={() => setUserOpen(!userOpen)} className={styles.userButton}>
                <span className="material-symbols-outlined">account_circle</span>
            </button>

            {(userOpen) && (
                <div className={styles.userBox}>
                    {(!error) ? (
                        <>
                    <div className={styles.usercontain}>
                        <span className={`${styles.icon} material-symbols-outlined`}>account_circle</span>
                        <h1 className={styles.greeting}>¡Hola! Bienvenido {usuario.nombre}</h1>
                    </div>

                    <hr className={styles.divider} />
                    <ul className={styles.options}>
                        <Link to="/perfil">
                            <li><span className={`${styles.icon} material-symbols-outlined`}>person</span>Mi perfil</li>
                        </Link>
                        <Link to="/Favoritos">
                            <li><span className={`${styles.icon} material-symbols-outlined`}>favorite</span>Mis favoritos</li>
                        </Link>
                        <Link to="/Notificaciones">
                            <li><span className={`${styles.icon} material-symbols-outlined`}>notifications</span>Notificaciones</li>
                        </Link>
                    </ul>
                    <button className={styles.logout} onClick={handleLogout}>Cerrar Sesión</button>
                    </>
                    ):(
                        <>
                    <Link to="/login" >
                     <button className={styles.logout}>Iniciar Sesión</button>
                    
                    </Link>
                    <Link  to="/registro" >
                     <button className={styles.logout}>Registrar</button>
                    </Link>
                    </>
                    )}
                </div>
            )}
        </div>
    );
}

export default UsuarioMenu;
