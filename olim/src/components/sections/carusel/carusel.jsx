import React, { useState, useEffect,useMemo } from "react";
import { useFetch } from '../../../hooks/useFetch';

import img1 from "../../../assets/disney.jpg";
import img2 from "../../../assets/costarica.jpg";
import img3 from "../../../assets/madrid.jpg";
import img4 from "../../../assets/newyork.jpg";
import img5 from "../../../assets/paris.jpg";
import "../../../styles/Carousel.css";




const Carousel = () => {


    const imagene1 = { img: img1, texto: "Disney" };
    const imagene2 = { img: img2, texto: "Costa Rica" };
    const imagene3 = { img: img3, texto: "Madrid" };
    const imagene4 = { img: img4, texto: "New York" };
    const imagene5 = { img: img5, texto: "Paris" };

    const imagenes = [imagene1, imagene2, imagene3, imagene4, imagene5];

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

