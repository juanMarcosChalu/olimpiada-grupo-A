import React from "react";
import "../styles/paver.css"; // Import the CSS file for styling
import img from "../assets/300x200.webp"; // Import the logo image

const paver = () => {
    return (
        <div className="">
            <section className="img-container">
                <img
                    src={img}
                    alt="Paver Logo"
                    className="paver-logo"
                />
            </section>
            <section className="paver-content">
                <h2>Bienvenido a Paver</h2>
                <p>
                    Paver es una plataforma de comercio electrónico que conecta a
                    los usuarios con productos y servicios de alta calidad. Aquí
                    encontrarás una amplia variedad de artículos, desde tecnología
                    hasta moda, todo al alcance de un clic.
                </p>
                <p>
                    Explora nuestras categorías, descubre ofertas exclusivas y
                    disfruta de una experiencia de compra única. ¡Gracias por elegir
                    Paver!
                </p>
            </section>
            <section className="paver-footer">

                <p>
                    <strong>Precio:</strong> $100.00
                </p>
            </section>

            <ol id='gridTienda'>

                {/* <li className='producto '>
                    <a href='3' className='productolink'>
                        <div className='productoContenedor'>
                            <img src={img} className='productoImagen'></img>
                            <div className='productoTexto'>
                                <p className='productoDescripcion'>Paquete Puerto Iguazú</p>
                                {/* dias y noches */}
                                {/* <p className='productoDias'>3 días / 2 noches</p>

                            </div>
                            <footer className='productoFooter'>
                                <p className='productoPrecio'>Precio Final: $100.00</p>
                            </footer> */}

                        {/* </div>
                    </a>
                </li> */}
                <li class="producto">
                    <a href="#" class="producto-link">
                        <div class="producto-contenedor">
                            <img src={img} alt="Imagen del paquete" class="producto-imagen"
                            />
                                <div class="producto-texto">
                                    <h3 class="producto-titulo">Paquete Puerto Iguazú</h3>
                                    <p class="producto-dias">3 días / 2 noches</p>
                                    <p class="producto-fechas">Fechas: 10/10/2025 - 13/10/2025</p>
                                    <p class="producto-descripcion">
                                        Descubre las cataratas del Iguazú en un viaje único lleno de naturaleza y cultura.
                                    </p>
                                </div>
                                <footer class="producto-footer">
                                    <p class="producto-precio">Precio Final: $100.00</p>
                                    <button class="producto-reservar">Reservar ahora</button>
                                </footer>
                        </div>
                    </a>
                </li>

            </ol>
        </div>
    );
};

export default paver;