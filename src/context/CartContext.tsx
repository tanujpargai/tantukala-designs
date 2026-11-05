'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductVariant } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  total: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  couponCode: string;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  freeShippingProgress: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'tantukala_cart_v1';
const FREE_SHIPPING_THRESHOLD = 4999;
const STANDARD_SHIPPING_FEE = 199;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [flatDiscount, setFlatDiscount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [items, isLoaded]);

  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.variant?.id === variant?.id
      );

      const price = variant?.priceOverride ?? product.salePrice ?? product.price;

      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          lineTotal: newQty * price,
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            product,
            variant,
            quantity,
            lineTotal: quantity * price,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.variant?.id === variantId))
    );
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.variant?.id === variantId) {
          const price = item.variant?.priceOverride ?? item.product.salePrice ?? item.product.price;
          return {
            ...item,
            quantity,
            lineTotal: quantity * price,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setDiscountPercent(0);
    setFlatDiscount(0);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'HERITAGE10') {
      setCouponCode('HERITAGE10');
      setDiscountPercent(10);
      setFlatDiscount(0);
      return { success: true, message: '10% Heritage discount applied!' };
    }
    if (clean === 'TANTU500') {
      setCouponCode('TANTU500');
      setFlatDiscount(500);
      setDiscountPercent(0);
      return { success: true, message: '₹500 Artisan concession applied!' };
    }
    return { success: false, message: 'Invalid promotional code. Try HERITAGE10 or TANTU500.' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
    setFlatDiscount(0);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);

  const calculatedDiscount =
    discountPercent > 0 ? (subtotal * discountPercent) / 100 : flatDiscount > 0 ? Math.min(flatDiscount, subtotal) : 0;

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const total = Math.max(0, subtotal - calculatedDiscount + shippingFee);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shippingFee,
        discountAmount: calculatedDiscount,
        total,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        couponCode,
        applyCoupon,
        removeCoupon,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        freeShippingProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
