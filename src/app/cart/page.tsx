'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shippingFee,
    discountAmount,
    total,
    totalItems,
    couponCode,
    applyCoupon,
    removeCoupon,
    amountNeededForFreeShipping,
    freeShippingProgress,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ message: string; isError?: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback({ message: res.message, isError: !res.success });
    if (res.success) setInputCoupon('');
  };

  if (items.length === 0) {
    return (
      <div className="py-24 sm:py-32 bg-ivory-100 min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-parchment/60 flex items-center justify-center text-charcoal/40 mx-auto mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-3xl font-medium text-charcoal">Your Bag is Empty</h1>
          <p className="text-sm text-charcoal/70 mt-2 mb-8 leading-relaxed">
            Every creation at Tantukala carries centuries of tacit cultural wisdom. Discover our living handlooms.
          </p>
          <Link
            href="/shop"
            className="px-8 py-4 rounded-full bg-terracotta text-white font-semibold text-xs uppercase tracking-widest hover:bg-terracotta-dark transition-all shadow-md inline-flex items-center space-x-2"
          >
            <span>Explore Curated Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 bg-ivory-100 min-h-screen">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-1">
            Review Selection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal">
            Shopping Bag ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </h1>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-ivory-50 rounded-2xl border border-parchment p-4 mb-8 max-w-4xl shadow-sm text-xs">
          <div className="flex items-center justify-between mb-2 font-medium text-charcoal">
            <span className="flex items-center space-x-1.5">
              <Truck className="w-4 h-4 text-terracotta" />
              <span>
                {amountNeededForFreeShipping > 0
                  ? `Add ₹${amountNeededForFreeShipping.toLocaleString('en-IN')} more to receive complimentary Pan-India shipping`
                  : '🎉 You have unlocked complimentary insured shipping!'}
              </span>
            </span>
            <span className="font-bold text-terracotta">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-parchment rounded-full h-2 overflow-hidden">
            <div
              className="bg-terracotta h-2 rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Items Table (8 Cols) */}
          <div className="lg:col-span-8 bg-ivory-50 rounded-3xl border border-parchment overflow-hidden shadow-craft p-6 sm:p-8">
            <div className="divide-y divide-parchment">
              {items.map((item) => {
                const price =
                  item.variant?.priceOverride ?? item.product.salePrice ?? item.product.price;
                return (
                  <div
                    key={`${item.product.id}-${item.variant?.id}`}
                    className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-parchment flex-shrink-0 border border-parchment">
                        <Image
                          src={item.product.images[0] || '/images/craft-hero.avif'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-terracotta font-semibold">
                          {item.product.craftType}
                        </span>
                        <h3 className="font-serif text-base font-medium text-charcoal truncate">
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="hover:text-terracotta transition-colors"
                          >
                            {item.product.name}
                          </Link>
                        </h3>
                        {item.variant && (
                          <p className="text-xs text-charcoal/60 mt-0.5">
                            Edition: {item.variant.name}
                          </p>
                        )}
                        <p className="text-xs font-semibold text-charcoal mt-1">
                          ₹{price.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    {/* Quantity & Line Total */}
                    <div className="flex items-center space-x-6 self-end sm:self-auto">
                      <div className="flex items-center space-x-3 bg-white rounded-xl px-3 py-1.5 border border-parchment shadow-sm">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1, item.variant?.id)
                          }
                          className="text-charcoal hover:text-terracotta text-sm font-semibold"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-semibold w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1, item.variant?.id)
                          }
                          className="text-charcoal hover:text-terracotta text-sm font-semibold"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[80px]">
                        <span className="text-sm font-serif font-bold text-charcoal block">
                          ₹{item.lineTotal.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.variant?.id)}
                        className="text-charcoal/40 hover:text-terracotta transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-parchment flex justify-between items-center text-xs">
              <Link
                href="/shop"
                className="text-terracotta font-semibold hover:underline flex items-center space-x-1"
              >
                <span>&larr; Continue Exploring Products</span>
              </Link>
              <button
                onClick={clearCart}
                className="text-charcoal/50 hover:text-charcoal underline"
              >
                Clear entire bag
              </button>
            </div>
          </div>

          {/* Order Summary & Checkout Box (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-ivory-50 rounded-3xl border border-parchment p-6 sm:p-8 shadow-craft space-y-5">
              <h2 className="font-serif text-xl font-medium text-charcoal">Order Summary</h2>

              {/* Promo Coupon Form */}
              <div className="pt-2">
                {couponCode ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-turmeric-50 border border-turmeric/40 text-xs text-charcoal">
                    <span className="flex items-center space-x-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-turmeric-dark" />
                      <span>Code &ldquo;{couponCode}&rdquo; Applied</span>
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-[11px] text-terracotta hover:underline font-semibold"
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
                      placeholder="Coupon Code"
                      className="flex-1 text-xs px-3 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-charcoal text-white rounded-xl text-xs font-semibold hover:bg-terracotta transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponFeedback && (
                  <p
                    className={`text-[11px] mt-1.5 ${
                      couponFeedback.isError ? 'text-red-600' : 'text-forest font-medium'
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2.5 text-xs text-charcoal/80 pt-3 border-t border-parchment">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-medium text-charcoal">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-forest font-medium">
                    <span>Artisan Concession</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Pan-India Transit</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-forest font-semibold">Complimentary</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-charcoal pt-3 border-t border-parchment">
                  <span>Estimated Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="pt-2">
                <Link
                  href="/checkout"
                  className="w-full py-4 rounded-2xl bg-terracotta text-white font-medium text-xs uppercase tracking-[0.2em] hover:bg-terracotta-dark transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-terracotta/30 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-charcoal/60 pt-2">
                <ShieldCheck className="w-4 h-4 text-forest" />
                <span>Encrypted 256-bit Razorpay Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
