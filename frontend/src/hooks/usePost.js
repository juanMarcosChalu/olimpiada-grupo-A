// hooks/usePost.js
import { useState } from "react";

export default function usePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const post = async (url, data) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        // ⛔ Lanzamos un error con el mensaje real del backend
        const message = json?.message || json?.error || "Error en la solicitud";
        throw new Error(message);
      }

      setResponse(json);
      return json;
    } catch (err) {
      console.error("❌ Error del post:", err);
      setError(err.message); // ✅ Guarda el mensaje del backend
      throw err; // ⚠️ Sigue lanzando para el componente
    } finally {
      setLoading(false);
    }
  };

  return { post, loading, error, response };
}
