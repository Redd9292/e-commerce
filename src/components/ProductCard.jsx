import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card border rounded-lg p-4 shadow-md flex flex-col justify-between">
      <Link to={`/product/${product.id}`}>
        <img className="w-full h-40 object-cover mb-4" src={product.image} alt={product.title} />
        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-700 flex-grow">{product.description}</p>
        <p className="text-xl font-bold mt-2">Price: ${product.price}</p>
      </Link>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-blue-500 text-white py-1 px-3 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;




