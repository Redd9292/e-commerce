import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../contexts/CartContext';


const stripePromise = loadStripe('your-public-key-from-stripe');

const Checkout = () => {
  const { cart } = useCart();
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    stripePromise.then((stripeInstance) => setStripe(stripeInstance));
  }, []);

  const handleCheckout = async () => {
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cart.map(item => ({
          name: item.title,
          price: item.price * 100, 
          quantity: item.quantity,
        })),
      }),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="checkout-page p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>
      <div className="shipping-address mb-6">
        <h3 className="text-xl font-semibold">1. Shipping address</h3>
        <a href="#" className="text-blue-500 hover:underline">Change</a>
      </div>
      <div className="payment-method mb-6">
        <h3 className="text-xl font-semibold">2. Choose a payment method</h3>
        <div className="mt-4">
          <label className="block mb-2">Your credit and debit cards</label>
          <button className="bg-gray-200 py-2 px-4 rounded mb-4">Add a credit or debit card</button>
          <div>
            <label className="block mb-2">Payment plans</label>
            <div>
              <input type="radio" id="affirm" name="payment-plan" className="mr-2" />
              <label htmlFor="affirm">Pay over time with Affirm</label>
            </div>
          </div>
          <div className="mt-4">
            <label className="block mb-2">Other payment methods</label>
            <button className="bg-gray-200 py-2 px-4 rounded mb-4">Pay with cash at a location near you</button>
            <button className="bg-gray-200 py-2 px-4 rounded mb-4">Add a personal checking account</button>
          </div>
        </div>
      </div>
      <div className="order-summary bg-gray-100 p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        {cart.map((item) => (
          <div key={item.id} className="flex items-center mb-4">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover mr-4" />
            <div className="flex-grow">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-lg">${item.price}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
        <div className="total-amount text-lg font-bold mt-4">
          <p>Items: ${calculateTotal().toFixed(2)}</p>
          <p>Shipping & handling: --</p>
          <p>Total before tax: --</p>
          <p>Estimated tax to be collected: --</p>
          <p className="text-xl">Order total: ${calculateTotal().toFixed(2)}</p>
        </div>
        <button
          onClick={handleCheckout}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;



