import React from "react";

const PackageCard = ({ pkg, onAddToCart }) => {
  return (
    <div className="package-card">
      <img src={pkg.image} alt={pkg.title} />
      <h3>{pkg.title}</h3>
      <p>{pkg.description}</p>
      <p><strong>${pkg.price}</strong></p>
      <button onClick={() => onAddToCart(pkg)}>Agregar al carrito</button>
    </div>
  );
};

export default PackageCard;
