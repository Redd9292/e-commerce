import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';
import debounce from 'lodash.debounce';
import logo from '../assets/omnismart-logo.png'; 

function Navbar({ onCategoryChange, onSearch }) {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const debounceSearch = useRef(
    debounce(async (query) => {
      if (query) {
        try {
          const response = await axios.get('https://fakestoreapi.com/products');
          const filteredProducts = response.data.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
          );
          setSearchResults(filteredProducts);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        setSearchResults([]);
      }
    }, 300)
  ).current;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    debounceSearch(searchQuery);
  }, [searchQuery, debounceSearch]);

  const handleSearch = () => {
    onSearch(searchQuery);
    navigate(`/search/${searchQuery}`);
    setSearchResults([]);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategoryClick = (category) => {
    onCategoryChange(category);
    navigate(`/`);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse" onClick={() => handleCategoryClick('')}>
            <img src={logo} alt="OmniMart Logo" className="h-32 w-auto" /> 
          </Link>
          <div className="flex items-center justify-center flex-1 md:max-w-md relative">
            <div className="flex items-center w-full max-w-lg relative">
              <input
                type="text"
                className="flex-grow p-2 pl-10 text-sm border border-gray-300 rounded-l-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 4a4 4 0 100 8 4 4 0 000-8zm2 8l4 4" />
                </svg>
              </div>
              <button
                className="p-2 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleSearch}
              >
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 4a4 4 0 100 8 4 4 0 000-8zm2 8l4 4" />
                </svg>
              </button>
            </div>
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <ul className="list-none p-2 max-h-64 overflow-y-auto">
                  {searchResults.map((product) => (
                    <li key={product.id} className="p-2 hover:bg-gray-200 cursor-pointer">
                      <Link to={`/product/${product.id}`} onClick={() => setSearchResults([])}>
                        {product.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex items-center ml-4 space-x-4">
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white">Sign In</a>
            <div className="relative">
              <Link to="/cart" className="flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 4.35c-.1.31.03.65.32.85a1 1 0 00.68.15l1.41-.33a1 1 0 00.75-.57l.5-1.18m5-10H5.4m7.6 0h7.72a1 1 0 01.98 1.2l-1.2 6a1 1 0 01-.98.8H9.1M16 16a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <span className="ml-1">Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -mt-4 -mr-4">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <ul className="flex flex-wrap space-x-4">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


