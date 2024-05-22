import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/fakeStoreApi';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div className="home p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
      <div className="cart mt-8">
        <h2 className="text-xl font-bold mb-4"></h2>
        {cart.length === 0 ? (
          <p></p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-2">
                <span>{item.title}</span>
                <span>Quantity: {item.quantity}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;

