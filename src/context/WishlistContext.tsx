'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';

interface WishlistContextType {
  wishlistIds: string[];
  wishlistProducts: Product[];
  toggleWishlist: (product: Product) => boolean;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  totalWishlist: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'tantukala_wishlist_v1';

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        setWishlistProducts(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load wishlist', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistProducts));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlistProducts, isLoaded]);

  const isInWishlist = (productId: string) => {
    return wishlistProducts.some((p) => p.id === productId);
  };

  const toggleWishlist = (product: Product): boolean => {
    const exists = isInWishlist(product.id);
    if (exists) {
      setWishlistProducts((prev) => prev.filter((p) => p.id !== product.id));
      return false;
    } else {
      setWishlistProducts((prev) => [...prev, product]);
      return true;
    }
  };

  const clearWishlist = () => {
    setWishlistProducts([]);
  };

  const wishlistIds = wishlistProducts.map((p) => p.id);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        totalWishlist: wishlistProducts.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
