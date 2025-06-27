import React from "react";
import styles from "./asistencia.module.css";
import Footer from "../../Layouts/Footer";
import { useNavigate } from "react-router-dom";
import PlanCard from "./PlanCard";

function Asistencia() {
    const navigate = useNavigate();

    const planes = [
        {
            nombre: "Plan Básico",
            precio: "50.000 ARG por semana",
            beneficios: [
                "Atención médica hasta 5.000.000 ARG",
                "Medicación ambulatoria",
                "Odontología de urgencia",
                "No cubre cancelación de viaje",
                "No incluye repatriación sanitaria"
            ]
        },
        {
            nombre: "Plan Estándar",
            precio: "100.000 ARG por semana",
            beneficios: [
                "Atención médica hasta 10.000.000 ARG",
                "Hospitalización y medicación",
                "Asistencia legal",
                "Equipaje hasta 500.000 ARG",
                "No incluye protección de móviles"
            ],
            destacado: true
        },
        {
            nombre: "Plan Premium",
            precio: "250.000 ARG por semana",
            beneficios: [
                "Atención médica hasta 100.000.000 ARG",
                "Cirugía, hospitalización",
                "Robo de equipaje hasta 1.000.000 ARG",
                "App con geolocalización de clínicas"
            ]
        }
    ];

    const handleSeleccionar = (planNombre) => {
        // Redirige al carrito
        navigate("/carrito");
    };

    return (
        <main className={styles.main}>
            <section className={styles.headAsistencia}>
                <p>Encontrá la protección adecuada para tu viaje y viajá con tranquilidad.</p>
            </section>

            <section className={styles.cardsAsistencia}>
                {planes.map((plan, index) => (
                    <PlanCard
                        key={index}
                        nombre={plan.nombre}
                        precio={plan.precio}
                        beneficios={plan.beneficios}
                        destacado={plan.destacado}
                        onSeleccionar={() => handleSeleccionar(plan.nombre)}
                    />
                ))}
            </section>
        </main>
    );
}

export default Asistencia;
