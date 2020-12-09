import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import "./Cart.css";

export default function Cart({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  useEffect(() => {
    window.localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const updateQty = (id, newQty) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, qty: newQty };
      }
      return item;
    });
    setItems(newItems);
  };
  const grandTotal = items
    .reduce((total, item) => total + item.qty * item.price, 0)
    .toFixed(2);
  return (
    <div className="Cart">
      <h1 className="Cart-title">SHOPPING CART</h1>
      <div className="cart-items">
        {items.map((item) => (
          <CartItem key={item.id} {...item} updateQty={updateQty} />
        ))}
      </div>
      <h3 className="Cart-total">Grand Total: ${grandTotal}</h3>
    </div>
  );
}
