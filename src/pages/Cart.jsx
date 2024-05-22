import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateCartItemQuantity } = useCart();

  return (
    <div className="cart-page p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div className="flex flex-col items-center">
          <ul className="list-none flex flex-col items-center w-full">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center mb-4 w-full max-w-2xl bg-white p-4 rounded shadow">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover mr-4" />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-lg">${item.price}</p>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value))}
                      className="w-20 mr-2 text-center"
                    />
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/checkout">
            <button className="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;




