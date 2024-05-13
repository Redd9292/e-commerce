import React from "react";
import { useParams } from "react-router-dom";


function ProductDetails() {
  const { id } = useParams();
  return (
    <div>
      <h1 className='text-2xl font-semibold text-gray-900 dark:text-white'>Product Details Page</h1>
      <p>Product ID: {id}</p>
    </div>
  );
} 
export default ProductDetails;