// src/hooks/useWishlist.js
import { useState, useEffect } from "react";

export default function useWishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("khushijewellers_wishlist");
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  const updateWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem("khushijewellers_wishlist", JSON.stringify(newWishlist));
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some(item => item._id === product._id);
    const newWishlist = exists
      ? wishlist.filter(item => item._id !== product._id)
      : [...wishlist, product];
    updateWishlist(newWishlist);
  };

  return { wishlist, toggleWishlist };
}
