import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Award, Shield } from "lucide-react";
import CategoryCard from "../components/auth/common/CategoryCard";
import LoginModal from "../components/auth/LoginModal";
import styles from "./Home.module.css";
import ProductCard from "../components/auth/common/ProductCard";
import ProductModal from "../components/auth/common/ProductModal";

// ✅ Automatically works for both localhost and Render
const API_BASE = import.meta.env.VITE_API_URL || "";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("khushijewellers_wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/products?featured=true&limit=10`);
      if (!response.ok) throw new Error("Failed to fetch featured products");
      const products = await response.json();

      const items = Array.isArray(products) ? products : products ? [products] : [];
      const filtered = items.filter(
        (p) => p && (p.featured === true || p.featured === "true")
      );
      setFeaturedProducts(filtered);
    } catch (error) {
      console.error("❌ Error loading featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem("khushijewellers_wishlist", JSON.stringify(newWishlist));
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some((item) => item._id === product._id);
    if (isInWishlist) {
      updateWishlist(wishlist.filter((item) => item._id !== product._id));
    } else {
      updateWishlist([...wishlist, product]);
    }
  };

  const getWhatsAppLink = (product) => {
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919844101760";
    const imageUrl =
      product.imageUrl && (product.imageUrl.startsWith("http") || product.imageUrl.startsWith("https"))
        ? product.imageUrl
        : `${window.location.origin}/images/products/${product.imageUrl || ""}`;

    const message = `Hi! I'm interested in *${product.name}*${
      product.weight ? ` (Weight: ${product.weight}g)` : ""
    }.\n\n🖼️ Product image:\n${imageUrl}\n\nCould you share more details or pricing?`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=1080&fit=crop&crop=center"
            alt="Luxury Jewelry"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.heroContent}
        >
          <h1 className={styles.heroTitle}>
            Exquisite <span className={styles.heroHighlight}>Jewelry Collection</span>
          </h1>
          <p className={styles.heroText}>
            Discover handcrafted jewelry pieces that celebrate life's most
            precious moments. Each piece tells a story of elegance,
            craftsmanship, and timeless beauty.
          </p>
        </motion.div>
      </section>

      {/* Collections Section */}
      <section className={styles.collections}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>Our Collections</h2>
          <p className={styles.sectionText}>
            Choose from our carefully curated gold and silver collections,
            each piece selected for its exceptional quality and timeless
            appeal.
          </p>
        </motion.div>

        <div className={styles.gridTwo}>
          <CategoryCard
            title="Gold Collection"
            description="The radiance of tradition, the charm of luxury."
            imageUrl="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop&crop=center"
            linkTo="/gold"
            isGold={true}
          />
          <CategoryCard
            title="Silver Collection"
            description="Grace in every glimmer, silver in every soul."
            imageUrl="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=400&fit=crop&crop=center"
            linkTo="/silver"
            isSilver={true}
          />
        </div>

        {/* Trust Indicators */}
        <div className={styles.gridThree}>
          <motion.div>
            <div className={styles.iconCircle}>
              <Sparkles size={32} color="#ca8a04" />
            </div>
            <h3 className={styles.trustTitle}>Premium Quality</h3>
            <p className={styles.trustText}>
              Only the finest materials and craftsmanship go into every
              piece we offer.
            </p>
          </motion.div>

          <motion.div>
            <div className={styles.iconCircle}>
              <Award size={32} color="#ca8a04" />
            </div>
            <h3 className={styles.trustTitle}>Expert Curation</h3>
            <p className={styles.trustText}>
              Our team carefully selects each piece for its beauty, quality,
              and lasting value.
            </p>
          </motion.div>

          <motion.div>
            <div className={styles.iconCircle}>
              <Shield size={32} color="#ca8a04" />
            </div>
            <h3 className={styles.trustTitle}>Trusted Service</h3>
            <p className={styles.trustText}>
              Decades of experience serving customers with integrity and
              excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className={styles.featured}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.featuredTitle}>Featured Collection</h2>
            <p className={styles.featuredText}>
              Discover our handpicked selection of jewelry, complete with
              images and a quick WhatsApp connect option.
            </p>
          </motion.div>

          {loading ? (
            <div className={styles.productsGrid}>
              {Array(2)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className={styles.skeletonCard}>
                    <div className={styles.skeletonBox}></div>
                    <div className={styles.skeletonLine}></div>
                    <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`}></div>
                  </div>
                ))}
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  className={styles.productCard}
                  onClick={() => setSelectedProduct(product)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={product.imageUrl || "/images/products/default.jpg"}
                    alt={product.name || "Product"}
                    className={styles.productImage}
                    onError={(e) => {
                      if (!e.target.dataset.failed) {
                        e.target.src = "/images/products/default.jpg";
                        e.target.dataset.failed = true;
                      }
                    }}
                  />
                  <h3 className={styles.productName}>{product.name}</h3>
                  <a
                    href={getWhatsAppLink(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappButton}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Contact via WhatsApp
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Product Modal */}
      <AnimatePresence mode="wait">
        {selectedProduct ? (
          <ProductModal
            key={selectedProduct._id}
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        ) : null}
      </AnimatePresence>

      {/* Login Modal */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </div>
  );
}
