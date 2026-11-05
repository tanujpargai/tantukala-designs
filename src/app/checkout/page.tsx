'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { store } from '@/lib/store';
import { Order, OrderItem } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discountAmount, total, shippingFee, clearCart } = useCart();
  const { user } = useAuth();

  // Form states
  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Ananya Deshmukh',
    email: user?.email || 'ananya.d@heritage.in',
    phone: user?.phone || '+91 98201 44552',
    streetAddress: 'Flat 402, Samudra Towers, Worli Sea Face',
    apartment: 'Tower B, 4th Floor',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400018',
    country: 'India',
    orderNotes: '',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentOption, setPaymentOption] = useState<'razorpay' | 'cod'>('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentShippingFee =
    shippingMethod === 'express' ? 450 : shippingFee;
  const finalTotal = subtotal - discountAmount + currentShippingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrorMessage('Your shopping bag is empty.');
      return;
    }

    if (!formData.fullName || !formData.email || !formData.phone || !formData.streetAddress || !formData.pincode) {
      setErrorMessage('Please complete all required contact and shipping address fields.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      const orderItems: OrderItem[] = items.map((item) => ({
        id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.images[0] || '/images/craft-hero.avif',
        variantId: item.variant?.id,
        variantName: item.variant?.name,
        price: item.variant?.priceOverride ?? item.product.salePrice ?? item.product.price,
        quantity: item.quantity,
        lineTotal: item.lineTotal,
      }));

      // Simulate payment authorization or initiate Razorpay test order
      const newOrder: Order = store.createOrder({
        userId: user?.id,
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          streetAddress: formData.streetAddress,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country,
        },
        items: orderItems,
        subtotal,
        discountAmount,
        shippingFee: currentShippingFee,
        taxAmount: 0,
        totalAmount: finalTotal,
        status: 'confirmed',
        paymentStatus: 'captured',
        paymentMethod: paymentOption === 'razorpay' ? 'Razorpay Secure (UPI/Cards)' : 'Cash on Delivery Verification',
        razorpayOrderId: `rzp_ord_${Date.now()}`,
        razorpayPaymentId: `rzp_pay_${Date.now()}`,
        notes: formData.orderNotes,
      });

      clearCart();
      router.push(`/checkout/confirmation/${newOrder.id}`);
    } catch (err: any) {
      console.error('Order creation error:', err);
      setErrorMessage(err.message || 'An error occurred while creating your order. Please try again.');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-24 sm:py-32 bg-ivory-100 min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="font-serif text-3xl font-medium text-charcoal">Your bag is empty</h1>
          <p className="text-xs text-charcoal/70 mt-2 mb-6">
            Please select an artisanal piece before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-full bg-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-terracotta transition-colors"
          >
            Explore Handloom Catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 bg-ivory-100 min-h-screen">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-1">
            Express Artisanal Fulfillment
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal">
            Secure Checkout
          </h1>
        </div>

        {errorMessage && (
          <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form: Details & Delivery (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Customer Contact */}
            <div className="bg-ivory-50 rounded-3xl border border-parchment p-6 sm:p-8 shadow-craft space-y-4">
              <div className="flex items-center space-x-2 border-b border-parchment pb-4">
                <span className="w-6 h-6 rounded-full bg-charcoal text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="font-serif text-lg font-medium text-charcoal">
                  Customer &amp; Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Email Address (for order tracking) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Mobile Phone Number (for courier SMS) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="bg-ivory-50 rounded-3xl border border-parchment p-6 sm:p-8 shadow-craft space-y-4">
              <div className="flex items-center space-x-2 border-b border-parchment pb-4">
                <span className="w-6 h-6 rounded-full bg-charcoal text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="font-serif text-lg font-medium text-charcoal">
                  Delivery Destination
                </h2>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Street Address &amp; House/Bungalow No. *
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 402, Samudra Towers, Worli Sea Face"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      Apartment / Suite / Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleChange}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 400018"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Shipping Method & Transit */}
            <div className="bg-ivory-50 rounded-3xl border border-parchment p-6 sm:p-8 shadow-craft space-y-4">
              <div className="flex items-center space-x-2 border-b border-parchment pb-4">
                <span className="w-6 h-6 rounded-full bg-charcoal text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="font-serif text-lg font-medium text-charcoal">
                  Shipping Method
                </h2>
              </div>

              <div className="space-y-3 pt-2">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-terracotta bg-terracotta/5 shadow-sm'
                      : 'border-parchment bg-white hover:border-charcoal/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="text-terracotta focus:ring-terracotta"
                    />
                    <div>
                      <span className="text-xs font-semibold text-charcoal block">
                        Standard Insured Courier (BlueDart / DTDC)
                      </span>
                      <span className="text-[11px] text-charcoal/60">
                        Delivered in 4–6 business days in tamper-proof archival packaging
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-charcoal">
                    {shippingFee === 0 ? (
                      <span className="text-forest">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod('express')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-terracotta bg-terracotta/5 shadow-sm'
                      : 'border-parchment bg-white hover:border-charcoal/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="text-terracotta focus:ring-terracotta"
                    />
                    <div>
                      <span className="text-xs font-semibold text-charcoal block">
                        Priority Air Express (Next Flight Dispatch)
                      </span>
                      <span className="text-[11px] text-charcoal/60">
                        Delivered in 2–3 business days with dedicated art handling
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-charcoal">₹450</span>
                </label>
              </div>
            </div>

            {/* Step 4: Payment Selection */}
            <div className="bg-ivory-50 rounded-3xl border border-parchment p-6 sm:p-8 shadow-craft space-y-4">
              <div className="flex items-center space-x-2 border-b border-parchment pb-4">
                <span className="w-6 h-6 rounded-full bg-charcoal text-white text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h2 className="font-serif text-lg font-medium text-charcoal">
                  Payment Gateway
                </h2>
              </div>

              <div className="space-y-3 pt-2">
                <label
                  onClick={() => setPaymentOption('razorpay')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentOption === 'razorpay'
                      ? 'border-terracotta bg-terracotta/5 shadow-sm'
                      : 'border-parchment bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentOption"
                      checked={paymentOption === 'razorpay'}
                      onChange={() => setPaymentOption('razorpay')}
                      className="text-terracotta focus:ring-terracotta"
                    />
                    <div>
                      <span className="text-xs font-semibold text-charcoal block">
                        Razorpay Secure Checkout (UPI, Cards, NetBanking)
                      </span>
                      <span className="text-[11px] text-charcoal/60">
                        Instant payment via Google Pay, PhonePe, Paytm, Visa, Mastercard, RuPay &amp; Amex
                      </span>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-indigo" />
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-ivory-50 rounded-3xl border border-parchment p-6 sm:p-8 shadow-craft space-y-5 sticky top-28">
              <h2 className="font-serif text-xl font-medium text-charcoal">Order Overview</h2>

              {/* Items List */}
              <div className="divide-y divide-parchment/60 max-h-72 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.variant?.id}`} className="py-3 flex space-x-3">
                    <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-parchment flex-shrink-0 border border-parchment">
                      <Image
                        src={item.product.images[0] || '/images/craft-hero.avif'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs font-medium text-charcoal truncate">
                        {item.product.name}
                      </h4>
                      {item.variant && (
                        <p className="text-[11px] text-terracotta">{item.variant.name}</p>
                      )}
                      <p className="text-[11px] text-charcoal/60 mt-0.5">
                        Qty: {item.quantity} × ₹
                        {(
                          item.variant?.priceOverride ?? item.product.salePrice ?? item.product.price
                        ).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-charcoal">
                      ₹{item.lineTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculation */}
              <div className="space-y-2 text-xs text-charcoal/80 pt-3 border-t border-parchment">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-forest font-medium">
                    <span>Artisan Concession</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping ({shippingMethod === 'express' ? 'Priority Air' : 'Standard'})</span>
                  <span>
                    {currentShippingFee === 0 ? (
                      <span className="text-forest font-semibold">Complimentary</span>
                    ) : (
                      `₹${currentShippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-charcoal pt-3 border-t border-parchment">
                  <span>Total Amount</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-terracotta text-white font-medium text-xs uppercase tracking-[0.2em] hover:bg-terracotta-dark transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl hover:shadow-terracotta/30 disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {isProcessing ? 'Processing Order...' : `Pay ₹${finalTotal.toLocaleString('en-IN')} & Confirm`}
                </span>
              </button>

              <div className="text-[11px] text-charcoal/60 text-center space-y-1 pt-1">
                <p className="flex items-center justify-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                  <span>Verified Artisan Provenance &amp; Handloom Mark</span>
                </p>
                <p>Protected by 256-bit bank encryption.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
