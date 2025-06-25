import React, { useState, useEffect,useMemo } from "react";
import { useFetch } from '../../../hooks/useFetch';

import image_of_city from "../../../assets/ciudad.jpg";
import image_of_desert from "../../../assets/desierto.jpg";
import image_of_mountain from "../../../assets/montañas.jpg";
import image_of_lake from "../../../assets/lago.jpg";
import image_of_field from "../../../assets/campo.jpg";
import image_of_beach from "../../../assets/playa.jpg";
import image_of_snow from "../../../assets/nevado.jpg";
import "../../../styles/Carousel.css";




const Carousel = () => {


    const imagene1 = { img: image_of_city, texto: "Ciudades" };
    const imagene2 = { img: image_of_desert, texto: "Desiertos" };
    const imagene3 = { img: image_of_mountain, texto: "Montañas" };
    const imagene4 = { img: image_of_lake, texto: "Lagos" };
    const imagene5 = { img: image_of_beach, texto: "Playas" };
    const imagene6 = { img: image_of_snow, texto: "Nieve" };
    const imagene7 = { img: image_of_field, texto: "Campos" };


    const imagenes = [imagene1, imagene2, imagene3, imagene4, imagene5, imagene6, imagene7];

    const [width, setWidth] = useState(window.innerWidth);
    const [startIndex, setStartIndex] = useState(0);
    const [cantImagenes, setCantImagenes] = useState(5);

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setWidth(newWidth);
            if (newWidth<550) setCantImagenes(1);
            else if (newWidth < 800) setCantImagenes(2);
            else if (newWidth < 1200) setCantImagenes(3);
            else if (newWidth < 1500) setCantImagenes(4);
            else setCantImagenes(5);
        };

        handleResize(); // Llamar una vez al inicio
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
    };

    const prevSlide = () => {
        setStartIndex((prevIndex) => (prevIndex - 1 + imagenes.length) % imagenes.length);
    };

    const visibleImages = useMemo(() => {
        const result = [];
        for (let i = 0; i < cantImagenes; i++) {
            result.push(imagenes[(startIndex + i) % imagenes.length]);
        }
        return result;
    }, [startIndex, cantImagenes, imagenes]);

    return (
        <div className="carousel-wrapper">
            <div className="title-carousel">
                <h1>Elegí tu próximo destino</h1>
                <h2>Deslizá y descubrí lugares únicos para tu próxima aventura</h2>
            </div>
            <div className="carousel">
                <button onClick={prevSlide}>
                    <span className="material-symbols-outlined left">navigation</span>
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
                    <span className="material-symbols-outlined">navigation</span>
                </button>
            </div>
        </div>
    );
};

export default Carousel;

