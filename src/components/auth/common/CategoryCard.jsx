import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import styles from "./categoryCard.module.css";

export default function CategoryCard({
  title,
  description,
  imageUrl,
  linkTo,
  productCount,
  isGold = false,
  isSilver = false,
}) {
  // ✅ Handle missing or relative images properly
  const fallbackImage =
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop&crop=center";

  const categoryImage =
    imageUrl?.startsWith("http")
      ? imageUrl
      : imageUrl
      ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${imageUrl}`
      : fallbackImage;

  // ✅ Style overlays for gold/silver aura (adds rich metallic tint)
  const overlayClass = isGold
    ? styles.goldOverlay
    : isSilver
    ? styles.silverOverlay
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={linkTo} className={styles.linkWrapper}>
        <Card className={`${styles.card} ${overlayClass}`}>
          <div className={styles.imageWrapper}>
            <img
              src={categoryImage}
              alt={title}
              className={styles.image}
              loading="lazy"
              onError={(e) => (e.target.src = fallbackImage)}
            />

            {/* ✨ Title & product count overlay */}
            <div className={styles.bottomText}>
              <h3 className={styles.title}>{title}</h3>
              {productCount && (
                <p className={styles.productCount}>
                  {productCount} {productCount === 1 ? "item" : "items"}
                </p>
              )}
            </div>
          </div>

          <CardContent className={styles.cardContent}>
            <p className={styles.description}>{description}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
