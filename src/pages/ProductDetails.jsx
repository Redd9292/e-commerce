import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../services/fakeStoreApi';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProduct(id);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product: {error.message}</p>;

  return (
    <div className="p-4">
      {product && (
        <div className="max-w-xl mx-auto">
          <img className="w-full h-64 object-cover mb-4" src={product.image} alt={product.title} />
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-bold mb-4">Price: ${product.price}</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Add to Cart</button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
