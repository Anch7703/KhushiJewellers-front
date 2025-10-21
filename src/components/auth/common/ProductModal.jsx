// src/components/ProductModal.jsx
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./ProductModal.css";

const ProductModal = ({ product, onClose = () => {} }) => {
  const modalRef = useRef(null);
useEffect(() => {
  console.log('MODAL MOUNT =>', product?._id);
  return () => console.log('MODAL UNMOUNT =>', product?._id);
}, [product && product._id]);

  // ✅ Handle outside clicks + Escape key safely
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // 🚨 Safety check
  if (!product) return null;

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919844101760"; // Replace with your number
  const message = encodeURIComponent(
  `Hi! I'm interested in *${product.name}* ${
    product.weight ? `(Weight: ${product.weight}g)` : ""
  } from your ${product.category || "collection"}.

🖼️ Product image:
${product.imageUrl.startsWith("http") 
    ? product.imageUrl 
    : `${window.location.origin}/images/products/${product.imageUrl}`}

Could you please share more details or pricing?`
);



  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose} // ✅ clicking backdrop closes
    >
      <motion.div
        ref={modalRef}
        className="modal-box"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25, type: "spring", stiffness: 200 }}
        onClick={(e) => e.stopPropagation()} // ✅ prevents backdrop close when clicking inside
      >
        {/* Close Button */}
        <button
          type="button"
          className="modal-close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          ×
        </button>

        {/* Image */}
        <div className="modal-image-wrap">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="modal-image"
          />
        </div>

        <h2 className="modal-title">{product.name}</h2>

        {product.weight && (
          <p className="modal-weight">Weight: {product.weight}g</p>
        )}

        <p className="modal-desc">
          {product.description || "Beautiful handcrafted jewelry."}
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="modal-whatsapp-btn"
        >
          💬 Contact via WhatsApp
        </a>
      </motion.div>
    </motion.div>
  );
};

export default ProductModal;
