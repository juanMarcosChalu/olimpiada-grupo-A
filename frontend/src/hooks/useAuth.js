import { useState, useEffect } from "react";

export function useAuth() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    fetch('http://localhost:3000/usuario/sesion', {
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error("No logueado");
        return res.json();
      })
      .then(data => {
        setUsuario(data.usuario);
        console.log(data.usuario);
        setIsLogin(true);
        setCargando(false);
      })
      .catch(err => {
        setUsuario(null);
        setError(err);
        setCargando(false);
      });
  }, []);

  return { usuario, cargando, error,isLogin };
}
