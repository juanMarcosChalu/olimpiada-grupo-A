import React from "react";

const Cart = ({ cartItems }) => {
  return (
    <div className="cart">
      <h2>Carrito</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.title} - ${item.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
