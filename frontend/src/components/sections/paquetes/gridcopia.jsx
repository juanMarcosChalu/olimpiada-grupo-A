import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch.js"; // Asegurate de importar tu hook
import CardPaquetes from "../../UI/CardPaquetes.jsx";
import '../../../styles/GridPaquetes.css';
const coloresPorTipo = {
    romantico: "#E3B4B4",
    familiar: "#EDC3A4",
    aventurero: "#D28A82",
    naturaleza: "#B1C387",
    relax: "#AFC1C4",
    cultural: "#B88C84"
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
