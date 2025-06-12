import React from "react";
import "../styles/CardPaquetes.css"
import img from "../assets/disney.jpg";

function CardPaquetes() {
    return (
        <section className="paquetes-card">

            <div className="foto-card">
                <img src={img} alt="imagen" />
            </div>

            <section className="descripcion-card">
                <div className="titulo-cards">
                    <h1>Carta epica Para juan</h1>
                </div>
                <div className="lista-card">
                    <li>
                        <ul>hola</ul>
                        <ul>hola</ul>
                        <ul>hola</ul>
                    </li>
                </div>
                <div className="precio-card">
                    <p>Desde $890 USD</p>
                </div>
            </section>

        </section>
    )
}

export default CardPaquetes;