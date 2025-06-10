import React, { useState } from "react";
import img1 from "../assets/Logo.png";
import img2 from "../assets/Logo.png";
import img3 from "../assets/Logo.png";
import img4 from "../assets/Logo.png";
import img5 from "../assets/Principal.png";
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
  for (let i = 0; i < 3; i++) {
    visibleImages.push(images[(startIndex + i) % images.length]);
  }

  return (
    <div className="carousel">
      <button onClick={prevSlide}>Prev</button>
      <div className="carousel-container">
        {visibleImages.map((imgSrc, index) => (
          <div className="carousel-slide" key={index}>
            <img src={imgSrc} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      <button onClick={nextSlide}>Next</button>
    </div>
  );
};

export default Carousel;
