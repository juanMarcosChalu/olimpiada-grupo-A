import React from "react";
import "../styles/Testimonios.css"
import footer from "../components/Footer.jsx"
import TestimonialCard from "./TestimonioCard.jsx";

function Testimonios() {

    return (

        <section className="testimonios-background">
            <p className="descripcion-container">
                Testimonios que guian tu viaje

            </p>

            <div className="testimonios-cards-container">
                <TestimonialCard
                    userName="Lucía M. – Mendoza"
                    reviewText="El hotel estaba impecable y la atención del personal fue excelente. Repetiría sin dudarlo."
                />

                <TestimonialCard
                    userName="Javier R. – Córdoba"
                    reviewText="Muy buena experiencia en general. La habitación era cómoda y las actividades estaban bien organizadas."
                />

                <TestimonialCard
                    userName="Sofía L. – Salta"
                    reviewText="Todo fue perfecto salvo un pequeño retraso en el check-in. Aun así, el resto del viaje fue maravilloso."
                />

                <TestimonialCard
                    userName="Fernando T. – Buenos Aires"
                    reviewText="Las excursiones fueron el punto fuerte del viaje. Increíbles paisajes y muy buenos guías."
                />

                <TestimonialCard
                    stars={5}
                    userName="Ana G. – Bariloche"
                    reviewText="La comida deliciosa, la vista al lago soñada. Ya quiero volver el próximo año."
                />

                 <TestimonialCard
                    userName="Fernando T. – Buenos Aires"
                    reviewText="Las excursiones fueron el punto fuerte del viaje. Increíbles paisajes y muy buenos guías."
                />

            </div>
        </section>


    );
}

export default Testimonios;