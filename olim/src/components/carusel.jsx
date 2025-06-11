import React, { useState } from "react";
import { useFetch } from '../useFetch';

import img1 from "../assets/disney.jpg";
import img2 from "../assets/costarica.jpg";
import img3 from "../assets/madrid.jpg";
import img4 from "../assets/newyork.jpg";
import img5 from "../assets/paris.jpg";
import "./Carousel.css";

const Carousel = () => {
    const { data, loading, eror } = useFetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
    const images = [img1, img2, img3, img4, img5];
    const imagene1 ={
    img: img1,  // ¡La variable que exportaste!
    texto: "Disney"
    }
    const imagene2 ={
    img: img2,  // ¡La variable que exportaste!
    texto: "Costa Rica"
    }
    const imagene3 ={
    img: img3,  // ¡La variable que exportaste!
    texto: "Madrid"
    }
    const imagene4 ={
    img: img4,  // ¡La variable que exportaste!
    texto: "New York"
    }
    const imagene5 ={
    img: img5,  // ¡La variable que exportaste!
    texto: "Paris"
    }
    const imagenes=[imagene1,imagene2,imagene3,imagene4,imagene5];
    
    const [startIndex, setStartIndex] = useState(0);

    const nextSlide = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
    };

    const prevSlide = () => {
        setStartIndex((prevIndex) => (prevIndex - 1 + imagenes.length) % imagenes.length);
    };

    // Obtenemos los 3 elementos a mostrar, con wrap-around (circular)
    const visibleImages = [];
    for (let i = 0; i < 5; i++) {
        visibleImages.push(imagenes[(startIndex + i) % images.length]);
    }

    return (
        <div className="carousel-wrapper">
            <h2 className="carousel-title">Viajes que inspiran, experiencias que perduran</h2>
            <div className="carousel">
                <button onClick={prevSlide}>
                    <span class="material-symbols-outlined left">
                        navigation
                    </span>
                </button>

                <div className="carousel-container">
                    {visibleImages.map((imagen, index) => (
                        <div className="carousel-slide" key={index}>
                            <img src={imagen.img} alt={`Slide ${index}`} />
                            <span>{imagen.texto}</span>
                        </div>
                    ))}
                </div>
                <button onClick={nextSlide}>
                    <span class="material-symbols-outlined">
                        navigation
                    </span>
                </button>
            </div>
        </div>

    );
};

export default Carousel;
