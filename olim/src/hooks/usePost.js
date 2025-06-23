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
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Error en la solicitud");
      setResponse(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { post, loading, error, response };
}
