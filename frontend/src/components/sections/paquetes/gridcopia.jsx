import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch.js"; // Asegurate de importar tu hook
import CardPaquetes from "../../UI/CardPaquetes.jsx";
import usePost from "../../../hooks/usePost.js";
import '../../../styles/GridPaquetes.css';
import { useAuth } from "../../../hooks/useAuth.js";
import { toast } from "sonner";
const coloresPorTipo = {
    romantico: "#c88c8c",
    familiar: "#d9a273",
    aventura: "#b55b52",
    naturaleza: "#889d5c",
    relax: "#7d9aa0",
    cultural: "#8c5c51"
};

function PaquetesTuristicos({ type }) {
    const { usuario, cargando, isLogin } = useAuth();
    const [idproducto, setIdproducto] = useState(0);
    const { data, loading, error } = useFetch(`/paquetes/${type}`);
    const [paquetes, setPaquetes] = useState([]);
    const { post, response } = usePost();
    const [modalAbierta, setModalAbierta] = useState(false);
    const [paqueteSeleccionado, setPaqueteSeleccionado] = useState(null);

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

    const abrirModal = async (paquete) => {
        setPaqueteSeleccionado(paquete);
        setModalAbierta(true);
    }

    const handleSubmitModalForm = async (e) => {
        e.preventDefault();
        if (!usuario) {
            toast.error("Debes iniciar sesión para añadir un Paquete al carrito.");
            return;
        }

        setModalAbierta(false);
        try {
            const res = await post("/carrito/anadirProducto", {
                userId: usuario.id,
                tipoProducto: "paquete",
                productoID: paqueteSeleccionado.id,
                nombreAsignado: paqueteSeleccionado.titulo,
                telefonoAsignado: "",
                emailAsignado: "",
                fechaInicio: e.target.entrada.value,
                fechaFin: e.target.salida.value,
                cantPersonas: e.target.cantidad.value
            });
            if (res.error) {
                toast.error("Error al añadir el paquete al carrito.");
                return;
            }
            toast.success("Paquete añadido al carrito. Redirigiendo al carrito...");
            setTimeout(() =>{
                window.location.href = "/carritoPage";
            });
        } catch (err) {
            console.log(err);
        }

        setPaqueteSeleccionado(null);
    }

    const cerrarModal = () => {
        setModalAbierta(false);
        setPaqueteSeleccionado(null);
    };

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
                <CardPaquetes key={index} {...paquete} onVerMas={() => abrirModal(paquete)} />
            ))}
            {modalAbierta && (
                <div className="modal">
                    <div className="modal-content-paquete">
                        <span className="close" onClick={cerrarModal}>&times;</span>
                        <h1>Personaliza tu paquete</h1>

                        <h2>{paqueteSeleccionado.titulo}</h2>

                        <div className='modal-content-info'>

                            <div className='ModalImgContainer'>
                                <img src={paqueteSeleccionado.imagenSrc} alt={paqueteSeleccionado.titulo} />
                            </div>
                            <div className='ModalTextContainer'>
                                <h3>{paqueteSeleccionado.titulo}</h3>
                                <ul className='ModalTextContainerResumen'>
                                    {paqueteSeleccionado.detalleServicios.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                                <p className='precioModal'>{paqueteSeleccionado.precio} ARS por persona</p>
                            </div>
                        </div>
                        <form className="formModalPaquete" onSubmit={handleSubmitModalForm}>
                            <div className='ModalFormInputs'>
                                <div>
                                    <label htmlFor="cantidad">Cantidad de personas:</label>
                                    <input type="number" required id="cantidad" name="cantidad" placeholder='0' />
                                </div>
                                <div>
                                    <label htmlFor="entrada">Fecha de ida:</label>
                                    <input type="date" required id="entrada" name="entrada" />
                                </div>
                                <div>
                                    <label htmlFor="salida">Fecha de vuelta:</label>
                                    <input type="date" required id="salida" name="salida" />
                                </div>
                            </div>
                            <p>Precio base por persona. Total con impuestos en el carrito</p>
                            <div className='ModalFormButtons'>
                                <button type="submit">Añadir al carrito</button>
                                <button type="button" onClick={cerrarModal}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PaquetesTuristicos;
