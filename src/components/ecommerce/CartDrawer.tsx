'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Tag, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    discountAmount,
    total,
    totalItems,
    couponCode,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    freeShippingProgress,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ message: string; isError?: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = useCart().applyCoupon(inputCoupon);
    setCouponFeedback({ message: res.message, isError: !res.success });
    if (res.success) {
      setInputCoupon('');
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory-50 border-l border-parchment shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-parchment bg-white/70 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-indigo" />
              <h2 className="text-lg font-serif font-medium text-charcoal">
                Your Shopping Bag ({totalItems})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full hover:bg-parchment/60 text-charcoal/60 hover:text-charcoal transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="p-3.5 bg-parchment/30 border-b border-parchment text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium text-charcoal">
              <span className="flex items-center space-x-1">
                <Truck className="w-3.5 h-3.5 text-terracotta" />
                <span>
                  {amountNeededForFreeShipping > 0
                    ? `Add ₹${amountNeededForFreeShipping.toLocaleString('en-IN')} for complimentary shipping`
                    : '🎉 You have unlocked complimentary Pan-India shipping!'}
                </span>
              </span>
              <span className="text-terracotta font-semibold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-parchment rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-terracotta h-1.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-parchment/60">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-parchment/60 flex items-center justify-center text-charcoal/40 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg text-charcoal font-medium">Your bag is empty</h3>
                <p className="text-xs text-charcoal/60 max-w-xs mt-1 mb-6">
                  Each Tantukala creation is woven with patience and cultural soul. Explore our living heritage collections.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-full bg-indigo text-white text-xs uppercase tracking-widest hover:bg-terracotta transition-colors shadow-sm"
                >
                  Explore Collections
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const price =
                  item.variant?.priceOverride ?? item.product.salePrice ?? item.product.price;
                return (
                  <div key={`${item.product.id}-${item.variant?.id}`} className="py-4 flex space-x-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-parchment/40 flex-shrink-0 border border-parchment">
                      <Image
                        src={item.product.images[0] || '/images/craft-hero.avif'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={closeCart}
                            className="font-serif text-sm font-medium text-charcoal hover:text-terracotta transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.variant?.id)}
                            className="text-charcoal/40 hover:text-terracotta transition-colors ml-2"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.variant && (
                          <p className="text-[11px] text-terracotta font-medium mt-0.5">
                            Edition: {item.variant.name}
                          </p>
                        )}
                        <p className="text-xs font-semibold text-charcoal mt-1">
                          ₹{price.toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Quantity & Line Total */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-parchment/30">
                        <div className="flex items-center space-x-2 bg-parchment/50 rounded-full px-2 py-0.5 border border-parchment">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1, item.variant?.id)
                            }
                            className="p-0.5 text-charcoal/60 hover:text-charcoal transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1, item.variant?.id)
                            }
                            className="p-0.5 text-charcoal/60 hover:text-charcoal transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs font-medium text-charcoal">
                          ₹{item.lineTotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with checkout details */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 bg-white/80 border-t border-parchment space-y-4">
              {/* Promo Code Input */}
              <div>
                {couponCode ? (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-turmeric-50 border border-turmeric/40 text-xs text-charcoal">
                    <span className="flex items-center space-x-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-turmeric-dark" />
                      <span>Code &ldquo;{couponCode}&rdquo; active</span>
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-[11px] text-terracotta hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Coupon code (e.g. HERITAGE10)"
                      className="flex-1 text-xs px-3 py-2 rounded-lg bg-parchment/30 border border-parchment focus:outline-none focus:border-terracotta"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-charcoal text-white rounded-lg text-xs font-medium hover:bg-terracotta transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponFeedback && (
                  <p
                    className={`text-[11px] mt-1 ${
                      couponFeedback.isError ? 'text-red-600' : 'text-forest'
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-charcoal/80 pt-2 border-t border-parchment/40">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-forest font-medium">
                    <span>Artisan Discount</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-forest font-medium">Complimentary</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-serif font-bold text-charcoal pt-2 border-t border-parchment">
                  <span>Estimated Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-terracotta text-white font-medium text-xs uppercase tracking-widest hover:bg-terracotta-dark transition-all shadow-md group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full block text-center py-2 text-xs uppercase tracking-wider text-charcoal/70 hover:text-charcoal transition-colors"
                >
                  View Full Cart & Shipping Calculator
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
