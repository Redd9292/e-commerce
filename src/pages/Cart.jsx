import React from 'react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateCartItemQuantity } = useCart();

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>${item.price}</p>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value))}
              />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
