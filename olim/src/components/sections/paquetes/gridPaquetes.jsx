import React, { useEffect, useState } from 'react';
import CardPaquetes from '../../UI/CardPaquetes';
import '../../../styles/GridPaquetes.css';
import image_of_paris from '../../../../src/assets/paris.jpg';
import image_of_santorini from '../../../../src/assets/santorini.jpg';
import image_of_kioto from '../../../../src/assets/kioto.jpg';
import image_of_venecia from '../../../../src/assets/venecia.jpeg';


function GridPaquetes() {
  const [paquetes, setPaquetes] = useState([]);
  const [modalAbierta, setModalAbierta] = useState(false);
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const dataSimulada = [
        { titulo: "París, Francia – 5 días", precio: "$1.200.000 ARS (Con vuelo)", imagenSrc: image_of_paris, fondo: "#c88c8c", resumen: "🏨 Hotel + museo + cena " },
        { titulo: "Santorini, Grecia – 6 días", precio: "$1.150.000 ARS (Con vuelo)", imagenSrc:  image_of_santorini, fondo: "#c88c8c", resumen: "🏨 Hotel + traslado + cena" },
        { titulo: "Kioto, Japón - 7 días", precio: "Desde $750 USD", imagenSrc:  image_of_kioto, fondo: "#c88c8c", resumen: "🏨 Hotel + guía + desayuno" },
        { titulo: "Venecia, Italia · 5 días", precio: "$1.100.000 ARS (Con vuelo)", imagenSrc:  image_of_venecia, fondo: "#c88c8c", resumen: "🏨 Hotel + góndola + 🍝 cena" },
        { titulo: "Bali, Indonesia - 7 días", precio: "$1.250.000 ARS (Con vuelo)", imagenSrc:  image_of_paris, fondo: "#c88c8c", resumen: "🏨 Hotel + 🚐 Traslados + ☕" },
        { titulo: "Nieve en Suiza", precio: "Desde $1.000 USD", imagenSrc:  image_of_paris, fondo: "#c88c8c", resumen: "Hotel + Museo + Vuelo " }
      ];
      setPaquetes(dataSimulada);
    }, 1000);
  }, []);

  const abrirModal = (paquete) => {
    setPaqueteSeleccionado(paquete);
    setModalAbierta(true);
  };

  const cerrarModal = () => {
    setModalAbierta(false);
    setPaqueteSeleccionado(null);
  };

  return (
    <section>
      <div className="grid-paquetes">
        {paquetes.map((paquete, index) => (
          <CardPaquetes
            key={index}
            {...paquete}
            onVerMas={() => abrirModal(paquete)}
          />
        ))}
      </div>

      {modalAbierta && (
        <div className="modal">
          <div className="modal-content">

            <span className="close" onClick={cerrarModal}>&times;</span>
            <h1 className=''>Personalizar la pagina</h1>
              <h2>Paquete {paqueteSeleccionado.titulo}</h2>
            <div className='modal-content-info'>
              <div className='ModalImgContainer'>
                <img src={paqueteSeleccionado.imagenSrc} alt={paqueteSeleccionado.titulo} />
              </div>
              <div className='ModalTextContainer'>
                {/* {title, content, precio} */}
                <h3>{paqueteSeleccionado.titulo}</h3>
                <ul className='ModalTextContainerResumen'>
                  <li>Hotel Boutique</li>
                  <li>Vuelos ida y vuelta</li>
                  <li>Translados aeropuerto-hotel</li>
                  <li>Cena romantica en terraza</li>
                  <li>Paseo en barco</li>
                </ul>
                <p className='precioModal'>{paqueteSeleccionado.precio} ARS por persona</p>
              </div>
            </div>
            <form >
              {/* {cantidad de personas, fecha de entrada, fecha de salida, un texto y botones} */}
            
                <div className='ModalFormInputs'>
                  <div>
                    <label htmlFor="cantidad">Cantidad de personas:</label>
                    <input type="number" id="cantidad" name="cantidad" placeholder='0' />
                  </div>
                  
                  <div>
                    <label htmlFor="entrada">Fecha de entrada:</label>
                    <input type="date" id="entrada" name="entrada" />
                  </div>
                  
                  <div>
                     <label htmlFor="salida">Fecha de salida:</label>
                      <input type="date" id="salida" name="salida" />
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
    </section>
  );
}

export default GridPaquetes;
