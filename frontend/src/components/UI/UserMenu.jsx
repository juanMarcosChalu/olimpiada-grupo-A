import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/UserMenu.module.css';
import { useAuth } from "../../hooks/useAuth.js";

function UsuarioMenu() {
    const { usuario, cargando, error, isLogin } = useAuth();
    const [userOpen, setUserOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await fetch('/usuario/logout', {
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

            {userOpen && (
                <div className={styles.userBox}>
                    {!error ? (
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
                    ) : (
                        <>
                            <div style={{
                                textAlign: 'center',
                                marginBottom: '0.8rem',
                                fontSize: '1rem',
                                color: '#776B5D',
                                fontWeight: '600',
                                fontFamily: '"Open Sans", sans-serif',
                            }}>
                               Bienvenido/a, accede a tu cuenta o crea una para disfrutar todos los beneficios.
                            </div>

                            <Link to="/login">
                                <button className={styles.loginRegisterBtn}>Iniciar Sesión</button>
                            </Link>

                            <Link to="/registro">
                                <button className={styles.loginRegisterBtn}>Registrarse</button>
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default UsuarioMenu;

