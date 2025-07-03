import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true); // para saber si está cargando

  useEffect(() => {
    fetch("https://524b1cba-194b-45f4-8cd4-b359a0dbd23c-00-18uuebkff7yon.kirk.replit.dev/usuario/usuario-actual", {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUsuario(data);
        } else {
          // 401 o 403 → simplemente no hay sesión, lo ignoramos
          setUsuario(null);
        }
      })
     .catch((error) => {
  if (error.name !== "AbortError") {
    console.error("Error al verificar sesión:", error);
  }
})

      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = (datosUsuario) => setUsuario(datosUsuario);

  const logout = () => {
    fetch("https://524b1cba-194b-45f4-8cd4-b359a0dbd23c-00-18uuebkff7yon.kirk.replit.dev/usuarios/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => setUsuario(null));
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
