import React, { useState } from "react";
import img1 from "../assets/disney.jpg";
import img2 from "../assets/costarica.jpg";
import img3 from "../assets/madrid.jpg";
import img4 from "../assets/newyork.jpg";
import img5 from "../assets/paris.jpg";
import "./Carousel.css";

const Carousel = () => {
    const images = [img1, img2, img3, img4, img5];
    const [startIndex, setStartIndex] = useState(0);

    const nextSlide = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setStartIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Obtenemos los 3 elementos a mostrar, con wrap-around (circular)
    const visibleImages = [];
    for (let i = 0; i < 5; i++) {
        visibleImages.push(images[(startIndex + i) % images.length]);
    }

    return (
        <div className="carousel-wrapper">
            <h2 className="carousel-title">Viajes que inspiran, experiencias que perduran</h2>
            <div className="carousel">
                <button onClick={prevSlide}>aca</button>

                <div className="carousel-container">
                    {visibleImages.map((imgSrc, index) => (
                        <div className="carousel-slide" key={index}>
                            <img src={imgSrc} alt={`Slide ${index}`} />
                        </div>
                    ))}
                </div>
                <button onClick={nextSlide}>aca</button>
            </div>
        </div>

    );
};

export default Carousel;
