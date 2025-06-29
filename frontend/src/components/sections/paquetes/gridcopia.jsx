import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch.js"; // Asegurate de importar tu hook
import CardPaquetes from "../../UI/CardPaquetes.jsx";
import '../../../styles/GridPaquetes.css';
const coloresPorTipo = {
    romantico: "#c88c8c",
    familiar: "#d9a273",
    aventura: "#b55b52",
    naturaleza: "#889d5c",
    relax: "#7d9aa0",
    cultural: "#8c5c51"
};

function PaquetesTuristicos({type}) {
    const { data, loading, error } = useFetch(`http://localhost:3000/paquetes/${type}`);
    const [paquetes, setPaquetes] = useState([]);
    
    useEffect(() => {
        if (data) {
            const paquetesConImagen = data.map(paquete => {
                const imagenSrc = paquete.imagen
                    ? `data:${paquete.imagen.tipo};base64,${paquete.imagen.data}`
                    : " ";

                return {
                    ...paquete,
                    fondo: coloresPorTipo[paquete.tipo] || "#ffffff",
                    imagenSrc
                };
            });

            setPaquetes(paquetesConImagen);
        }
    }, [data]);

    if (loading) return (
        <div className="grid-paquetes">
            <p style={{ color: '#555', fontStyle: 'italic', fontSize: '16px' }}>
                Cargando paquetes...
            </p>
        </div>
    );

    if (error) return (
        <div className="grid-paquetes">
            <p style={{ color: '#D32F2F', fontWeight: 'bold', fontSize: '16px' }}>
                Error: {error.message}
            </p>
        </div>
    );


    return (
        <div className="grid-paquetes">
            {paquetes.map((paquete, index) => (

                console.log(paquete),

                <CardPaquetes key={index} {...paquete} onVerMas={() => abrirModal(paquete)} />
            ))}
        </div>

    );
}

export default PaquetesTuristicos;
