import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to replace this with your actual public key from Stripe
const stripePromise = loadStripe('your-public-key-from-stripe');

const Checkout = () => {
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
      body: JSON.stringify({ items: [{ id: 'prod_ABC123', name: 'Sample Product', price: 1000, quantity: 1 }] }),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="checkout-page p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Checkout</h2>
      <button
        onClick={handleCheckout}
        className="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Checkout;

