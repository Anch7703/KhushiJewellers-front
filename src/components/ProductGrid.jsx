// src/components/ProductGrid.jsx
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import "./ProductGrid.css";
const ProductGrid = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <div key={product._id} onClick={() => setSelectedProduct(product)}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default ProductGrid;
