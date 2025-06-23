import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true); // opcional

  useEffect(() => {
    // Verificar sesión al cargar
    fetch("http://localhost:3000/usuario/usuario-actual", {
      method: "GET",
      credentials: "include" // importante para que mande la cookie
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        setUsuario(data);
      })
      .catch(() => {
        setUsuario(null); // no hay sesión
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (datosUsuario) => setUsuario(datosUsuario);
  const logout = () => {
    fetch("http://localhost:3000/usuarios/logout", {
      method: "POST",
      credentials: "include"
    }).then(() => setUsuario(null));
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
