import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card border rounded-lg p-4 shadow-md flex flex-col justify-between">
      <img className="w-full h-48 object-cover mb-4" src={product.image} alt={product.title} />
      <div className="flex flex-col h-full">
        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-700 flex-grow">{product.description}</p>
        <p className="text-xl font-bold mt-2">Price: ${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;





