import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Gem,
  Link as LinkIcon,
  Hand,
  Ear,
  Footprints,
  ShieldCheck,
} from "lucide-react";

import styles from "./gold.module.css";

const subcategories = [
  { key: "all", label: "All Items", icon: ShieldCheck },
  { key: "necklaces", label: "Necklaces", icon: LinkIcon },
  { key: "rings", label: "Rings", icon: Gem },
  { key: "bracelets", label: "Bracelets", icon: Hand },
  { key: "earrings", label: "Earrings", icon: Ear },
  { key: "anklets", label: "Anklets", icon: Footprints },
];

export default function Gold() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}></div>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.heroTitle}>Gold Collection</h1>
            <p className={styles.heroText}>
              Discover our exquisite gold jewelry collection. Each piece is
              available for viewing and purchase in our boutique store, where our
              experts can help you find the perfect piece. Add your favorites to
              your wishlist!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Subcategories Section */}
      <section className={styles.subcategories}>
        <div className={styles.subcategoriesContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.subcategoriesHeader}
          >
            <h2 className={styles.subcategoriesTitle}>Browse by Category</h2>
            <p className={styles.subcategoriesText}>
              Select a category to explore our curated selection of gold jewelry.
            </p>
          </motion.div>
          <div className={styles.subcategoriesGrid}>
            {subcategories.map(({ key, label, icon: Icon }, index) => (
              <Link
                to={`/products?category=gold&subcategory=${key}`}
                key={key}
                aria-label={`View ${label}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={styles.categoryCard}
                >
                  <Icon className={styles.categoryIcon} />
                  <h3 className={styles.categoryLabel}>{label}</h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
