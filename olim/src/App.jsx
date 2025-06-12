import React, { useState } from "react";
import Footer from "./components/Footer";
import "./App.css";
import Header from "./components/header.jsx";
import SectionHome from "./components/SectionHome.jsx";
import Carousel from "./components/carusel.jsx";
import Busqueda from "./components/busqueda.jsx";
import Paquetes from "./components/Paquetes.jsx";


function App() {


  const [packages, setPackages] = useState([
    {
      id: 1,
      title: "Paquete a Cancún",
      price: 500,
      description: "Incluye vuelos y hotel por 3 noches.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "Tour por Machu Picchu",
      price: 800,
      description: "Excursión y hotel 2 noches.",
      image: "https://via.placeholder.com/300x200",
    },
  ]);

  const [cart, setCart] = useState([]);

  const handleAddToCart = (pkg) => {
    setCart([...cart, pkg]);
  };

  return (
    <div id="app">
      <Header/>
      <SectionHome />
      <Carousel/>
      <Busqueda/>
      <Paquetes/>
      <Footer />
      
    </div>
  );
}

export default App;
