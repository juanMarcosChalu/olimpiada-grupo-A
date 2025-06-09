import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import SearchBar from "./components/SearchBar";
import PackageList from "./components/PackageList";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import "./App.css";


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
      <Navbar />
      <SearchBar />
      <PackageList packages={packages} onAddToCart={handleAddToCart} />
      <Cart cartItems={cart} />
      <Cart cartItems={cart} />
      <Cart cartItems={cart} />
      <Cart cartItems={cart} />
      <Cart cartItems={cart} />
      <Cart cartItems={cart} />

      <Footer />
    </div>
  );
}

export default App;
