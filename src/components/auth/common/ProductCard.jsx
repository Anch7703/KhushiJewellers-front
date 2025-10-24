import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, HeartOff } from "lucide-react";
import styles from "./productCard.module.css";

export default function ProductCard({
  product,
  onToggleWishlist,
  isWishlisted,
  onClick, // triggers modal
  onWhatsApp, // triggers WhatsApp
}) {
  const [wishlisted, setWishlisted] = useState(isWishlisted);

  // keep in sync with parent (if wishlist updates externally)
  useEffect(() => {
    setWishlisted(isWishlisted);
  }, [isWishlisted]);

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation(); // prevents opening modal
    setWishlisted((prev) => !prev);
    if (onToggleWishlist) onToggleWishlist(product);
  };

  const handleImageError = (e) => {
    if (!e.target.dataset.failed) {
      console.warn(`❌ Image failed to load: ${product.imageUrl}`);
    e.target.src = "https://khushijewllers.onrender.com/images/products/default.jpg";

      e.target.dataset.failed = true;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick?.(product)}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className={styles.card}>
        {/* Product Image */}
        <div className={styles.imageWrapper}>
          <img
            src={product.imageUrl || "/images/products/default.jpg"}
            alt={product.name || "Product"}
            className={styles.productImage}
            onError={handleImageError}
          />

          {/* Wishlist Icon */}
          <div className={styles.badgesTopRight}>
            <button
              className={styles.wishlistButton}
              onClick={handleToggleWishlist}
              aria-label="Toggle wishlist"
            >
              {wishlisted ? (
                <Heart color="red" className={styles.heartIcon} />
              ) : (
                <HeartOff className={styles.heartIcon} />
              )}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className={styles.cardContent}>
          <h3 className={styles.productName}>{product.name}</h3>
          {product.category && (
            <p className={styles.productCategory}>{product.category}</p>
          )}

          {/* WhatsApp Button */}
          {onWhatsApp && (
            <div className={styles.cardActions}>
              <button
                className={styles.whatsappButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onWhatsApp(product);
                }}
              >
                💬 WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
