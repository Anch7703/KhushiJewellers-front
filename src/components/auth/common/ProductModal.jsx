// src/components/ProductModal.jsx
import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ProductModal.css";

const ProductModal = ({ product, onClose = () => {} }) => {
  const modalRef = useRef(null);

  // Debug lifecycle (optional)
  useEffect(() => {
    console.log("✅ Modal opened:", product?.name);
    return () => console.log("🛑 Modal closed:", product?.name);
  }, [product]);

  // ✅ Handle outside click + Escape key
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

  if (!product) return null;

  // ✅ Safe image URL handling
  const safeImageUrl =
    product.imageUrl?.startsWith("http") || product.imageUrl?.startsWith("https")
      ? product.imageUrl
      : `${window.location.origin}/images/products/${product.imageUrl || "default.jpg"}`;

  // ✅ WhatsApp link generation
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919844101760";
  const message = encodeURIComponent(
    `Hi! I'm interested in *${product.name}*${
      product.weight ? ` (Weight: ${product.weight}g)` : ""
    } from your ${product.category || "collection"}.\n\n🖼️ Product image:\n${safeImageUrl}\n\nCould you please share more details or pricing?`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose} // ✅ click outside closes
      >
        <motion.div
          ref={modalRef}
          className="modal-box"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25, type: "spring", stiffness: 220 }}
          onClick={(e) => e.stopPropagation()} // ✅ prevents closing when clicking inside
        >
          {/* Close Button */}
          <button
            type="button"
            className="modal-close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
          >
            ×
          </button>

          {/* Image */}
          <div className="modal-image-wrap">
            <img
              src={safeImageUrl}
              alt={product.name || "Product"}
              className="modal-image"
              onError={(e) => {
                if (!e.target.dataset.failed) {
                  e.target.src = "/images/products/default.jpg";
                  e.target.dataset.failed = true;
                }
              }}
            />
          </div>

          {/* Product Info */}
          <h2 className="modal-title">{product.name}</h2>

          {product.weight && <p className="modal-weight">Weight: {product.weight}g</p>}

          <p className="modal-desc">
            {product.description || "Beautiful handcrafted jewelry."}
          </p>

          {/* WhatsApp CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-whatsapp-btn"
            onClick={(e) => e.stopPropagation()} // prevent accidental close
          >
            💬 Contact via WhatsApp
          </a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
