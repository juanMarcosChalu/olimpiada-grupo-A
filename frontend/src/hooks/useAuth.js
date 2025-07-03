import { useState, useEffect } from "react";

export function useAuth() {
  const [usuario, setUsuario] = useState(""); // Cambia "" → null
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const fetchSession = async () => {
    setCargando(true);
    try {
        const res = await fetch('https://524b1cba-194b-45f4-8cd4-b359a0dbd23c-00-18uuebkff7yon.kirk.replit.dev/usuario/sesion', {
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