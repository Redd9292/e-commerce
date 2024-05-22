import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');

  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Navbar onSearch={setSearchQuery} onCategoryChange={setCategory} />
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<Home searchQuery={searchQuery} category={category} />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/search/:query' element={<Home searchQuery={searchQuery} />} />
            <Route path='/category/:category' element={<Home category={category} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;





