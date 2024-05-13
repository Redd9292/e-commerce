// import { Link } from 'react-router-dom';
import 'flowbite';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../config/i18n'; // Import the i18n configuration

function Navbar() {
  const { t } = useTranslation();
  const [cartItemCount, setCartItemCount] = useState(0); // State to keep track of cart items

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage); // Change the language
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GadgiHub</span>
        </a>
        <div className="flex items-center justify-center flex-1 md:max-w-md">
          <div className="flex items-center w-full max-w-lg relative">
            <input
              type="text"
              className="flex-grow p-2 pl-10 text-sm border border-gray-300 rounded-l-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t('search')}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 4a4 4 0 100 8 4 4 0 000-8zm2 8l4 4" />
              </svg>
            </div>
            <button className="p-2 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 4a4 4 0 100 8 4 4 0 000-8zm2 8l4 4" />
              </svg>
            </button>
          </div>
        </div>
        {/* Language Dropdown */}
        <div className="flex items-center ml-4 space-x-4">
          <select
            onChange={handleLanguageChange}
            className="p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="en">🇺🇸 English</option>
            <option value="es">🇪🇸 Spanish</option>
            <option value="fr">🇫🇷 French</option>
            <option value="de">🇩🇪 German</option>
          </select>
          {/* Sign In Button */}
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white">
            {t('sign_in')}
          </a>
          {/* Cart Icon with Item Count */}
          <div className="relative">
            <a href="#" className="flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 4.35c-.1.31.03.65.32.85a1 1 0 00.68.15l1.41-.33a1 1 0 00.75-.57l.5-1.18m5-10H5.4m7.6 0h7.72a1 1 0 01.98 1.2l-1.2 6a1 1 0 01-.98.8H9.1M16 16a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span className="ml-1">{t('cart')}</span>
            </a>
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
              {cartItemCount}
            </span>
          </div>
        </div>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden w-full md:flex md:w-auto" id="navbar-dropdown">
          <div className="flex items-center w-full">
            {/* Navigation Links - Removed */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;








