import React from "react";
import "../styles/Testimonios.css"
import footer from "../components/Footer.jsx"


function Testimonios() {

    return (
        <main>
            <section className="testimonios-background-">
                <p className="descripcion-container">
                    Brújula Viajes cuenta con una calificación promedio de 4.7 sobre 5 en Bodas.net, con el 94% de los clientes recomendándola.
                </p>

                <div className="testimonios-cards-container">

                    <div className="testimonios-cards">

                        <div className="text-container">Despegar (Argentina)</div>
                        <div className="text-container">Estrellas: </div>
                        <div className="text-container">Sitio web: despegar.com.ar</div>


                    </div>

                </div>
            </section>

        </main>
    );
}

export default Testimonios;