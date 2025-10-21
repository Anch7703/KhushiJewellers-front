import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, HeartOff } from "lucide-react";
import styles from "./productCard.module.css";

export default function ProductCard({
  product,
  onToggleWishlist,
  isWishlisted,
  onClick,       // called when the card is clicked (open modal in parent)
  onWhatsApp,    // optional handler for WhatsApp button
}) {
  const [wishlisted, setWishlisted] = useState(isWishlisted);

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation(); // prevent the card click from firing
    setWishlisted((v) => !v); // optimistic UI update
    if (onToggleWishlist) onToggleWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick && onClick(product)} // parent handles modal open
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src={product.imageUrl || "https://via.placeholder.com/400"}
            alt={product.name}
            className={styles.productImage}
          />

          <div className={styles.badgesTopRight}>
            <button
              className={styles.wishlistButton}
              onClick={(e) => handleToggleWishlist(e)}
            >
              {wishlisted ? (
                <Heart color="red" className={styles.heartIcon} />
              ) : (
                <HeartOff className={styles.heartIcon} />
              )}
            </button>
          </div>
        </div>

        <div className={styles.cardContent}>
          <h3 className={styles.productName}>{product.name}</h3>
          {product.category && (
            <p className={styles.productCategory}>{product.category}</p>
          )}

          {/* optional small actions row (WhatsApp) — keeps from triggering card click */}
          <div className={styles.cardActions}>
            {onWhatsApp && (
              <button
                className={styles.whatsappButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onWhatsApp(product);
                }}
              >
                WhatsApp
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
