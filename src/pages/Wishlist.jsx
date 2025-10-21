import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/auth/common/ProductCard";
import { Heart, Store, ShoppingBag } from "lucide-react";
import styles from "./wishlist.module.css";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("khushijewellers_wishlist");
    setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((p) => p._id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("khushijewellers_wishlist", JSON.stringify(updatedWishlist));
  };

  const getWhatsAppLink = (product) => {
    const message = `Hi! I'm interested in purchasing this product:\n\nName: ${product.name}\nCategory: ${product.category}\nPrice: ₹${product.price}\n\nPlease share more details.\n\nImage: ${product.imageUrl}`;
    return `https://wa.me/917XXXXXXXXX?text=${encodeURIComponent(message)}`;
  };

  if (wishlist.length === 0) {
    return (
      <div className={styles.emptyWrapper}>
        <div className={styles.emptyContent}>
          <div className={styles.emptyIcon}>
            <Heart className="w-12 h-12 text-red-400" />
          </div>
          <h2>Your wishlist is empty</h2>
          <p>Add your favorite jewelry pieces to your wishlist to keep track of them.</p>
          <div className={styles.links}>
            <Link to="/silver" className={styles.linkButton}>
              <ShoppingBag /> Shop Silver
            </Link>
            <Link to="/gold" className={styles.linkButtonOutline}>
              <Store /> Shop Gold
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1>My Wishlist</h1>
      <p>{wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved</p>

      <div className={styles.grid}>
        {wishlist.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isWishlisted={true}
            onToggleWishlist={() => removeFromWishlist(product._id)}
            onWhatsApp={() => window.open(getWhatsAppLink(product), "_blank")}
          />
        ))}
      </div>
    </div>
  );
}

