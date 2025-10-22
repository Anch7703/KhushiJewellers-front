import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/auth/common/ProductCard";
import { motion, AnimatePresence } from "framer-motion"; // 👈 import AnimatePresence here
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import styles from "./productListing.module.css";
import useWishlist from "../hooks/usewishlist";
import ImportedProductModal from "../components/auth/common/ProductModal";

const ProductModal = (props) => <ImportedProductModal {...props} />;


export default function ProductListing() {
  const { wishlist, toggleWishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category")?.toLowerCase() || "";
  const subcategory = urlParams.get("subcategory")?.toLowerCase() || "all";

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      let url = `/api/products?category=${category}`;
      if (subcategory && subcategory !== "all") {
        url += `&subcategory=${subcategory}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [category, subcategory]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const getWhatsAppLink = (product) => {
   
  const message = encodeURIComponent(
  `Hi! I'm interested in ${product.name} (Product ID: ${product._id}${
    product.weight ? `, Weight: ${product.weight}g` : ""
  }). Could you share more details?`
);
 return `https://wa.me/917XXXXXXXXX?text=${encodeURIComponent(message)}`;
  };

  const formatTitle = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";

  const pageTitle =
    `${subcategory === "all" ? "" : formatTitle(subcategory) + " "} ${formatTitle(
      category
    )} Collection`.trim();

  const backLink = `/${formatTitle(category)}`;

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <Link to={backLink}>
            <Button variant="outline" size="icon">
              <ArrowLeft className={styles.arrowIcon} />
            </Button>
          </Link>
          <div>
            <h1 className={styles.title}>{pageTitle}</h1>
            <p className={styles.subtitle}>Browse our curated selection</p>
            {subcategory !== "all" && (
              <Link to={`/products?category=${category}&subcategory=all`}>
                <Button variant="ghost">Show All</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className={styles.grid}>
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div key={i} className={styles.skeleton}>
                  <div className={styles.skeletonImage}></div>
                  <div className={styles.skeletonLine}></div>
                  <div className={styles.skeletonLineShort}></div>
                </div>
              ))}
          </div>
        ) : error ? (
          <div className={styles.error}>
            Error loading products. Please try again later.
          </div>
        ) : products.length > 0 ? (
          <motion.div
            className={styles.grid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {products.map((product) => (
              <div key={product._id} className={styles.productWrapper}>
                <div
                  className={styles.imageClickArea}
                  onClick={() => setSelectedProduct(product)} // 👈 open modal
                >
                  <ProductCard
                    product={product}
                    isWishlisted={wishlist.some(
                      (item) => item._id === product._id
                    )}
                    onToggleWishlist={() => toggleWishlist(product)}
                    onWhatsApp={() =>
                      window.open(getWhatsAppLink(product), "_blank")
                  
                    }
                  />
                 
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <div className={styles.empty}>
            <h3 className={styles.emptyTitle}>No products found</h3>
            <p>
              We're currently updating this collection. Please check back soon!
            </p>
          </div>
        )}

        {/* 🪄 Modal with AnimatePresence (fixes double-render + blur) */}
        <AnimatePresence mode="wait">
  {selectedProduct ? (
    <ProductModal
      key={selectedProduct._id}
      product={selectedProduct}
      onClose={() => setSelectedProduct(null)}
    />
  ) : null}
</AnimatePresence>
      </div>
    </div>
  );
}
