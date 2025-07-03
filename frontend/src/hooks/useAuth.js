import { useState, useEffect } from "react";

export function useAuth() {
  const [usuario, setUsuario] = useState(""); // Cambia "" → null
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const fetchSession = async () => {
    setCargando(true);
    try {
        const res = await fetch('https://4479f971-1d51-4b67-938a-a80b7de0af34-00-3inmgxot9m6r9.picard.replit.dev/usuario/sesion', {
        credentials: 'include'
      });
      if (!res.ok) throw new Error("No logueado");
      const data = await res.json();
  
      
      setUsuario(data.usuario);
      setIsLogin(true);
    } catch (err) {
      setUsuario(null);
      setError(err);
      setIsLogin(false);
    } finally {
      setCargando(false);
    }
  };

  // Ejecuta al montar el componente
  useEffect(() => {
    fetchSession();
  }, []);

  return { 
    usuario, 
    cargando, 
    error, 
    isLogin, 
    refetch: fetchSession // ← Nueva función para revalidar
  };
}