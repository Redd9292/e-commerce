import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateCartItemQuantity } = useCart();

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-page p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow md:w-3/4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center mb-4 p-4 bg-white rounded shadow">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover mr-4" />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-lg">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <label htmlFor={`quantity-${item.id}`} className="mr-2">Qty:</label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 p-1 border rounded text-center"
                    />
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="md:w-1/4 ml-0 md:ml-8 mt-8 md:mt-0">
            <div className="p-4 bg-gray-100 rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Subtotal ({cart.length} items): ${calculateSubtotal()}</h3>
              <Link to="/checkout">
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;




