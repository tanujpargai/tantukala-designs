'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  Package,
  Heart,
  MapPin,
  User,
  LogOut,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  ShoppingBag,
  Trash2,
  CheckCircle2,
  Truck,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { store } from '@/lib/store';
import { Order } from '@/types';

function AccountContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'orders';

  const { user, isAdmin, logout, quickCustomerLogin, quickAdminLogin, isLoggedIn } = useAuth();
  const { wishlistProducts, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(store.getOrders());
  }, []);

  useEffect(() => {
    if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab') || 'orders');
    }
  }, [searchParams]);

  // If not logged in, prompt sign in or quick login
  if (!isLoggedIn) {
    return (
      <div className="py-24 sm:py-32 bg-ivory-100 min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 bg-ivory-50 rounded-3xl border border-parchment p-8 sm:p-10 shadow-craft">
          <div className="w-16 h-16 rounded-full bg-parchment flex items-center justify-center text-charcoal/40 mx-auto mb-4">
            <User className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-2xl font-medium text-charcoal">
            Patron Account Access
          </h1>
          <p className="text-xs text-charcoal/70 mt-2 mb-6">
            Sign in to view your orders, live courier dispatches, and saved wishlists.
          </p>
          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full block py-3 rounded-xl bg-terracotta text-white font-semibold text-xs uppercase tracking-widest hover:bg-terracotta-dark transition-colors"
            >
              Sign In to Account
            </Link>
            <button
              onClick={quickCustomerLogin}
              className="w-full py-3 rounded-xl border border-parchment bg-white text-charcoal font-semibold text-xs uppercase tracking-widest hover:bg-parchment transition-colors"
            >
              Instant Demo Patron Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 bg-ivory-100 min-h-screen">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header Greeting */}
        <div className="bg-ivory-50 rounded-3xl border border-parchment p-6 sm:p-8 shadow-craft mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-widest text-terracotta font-semibold">
                Patron Portal
              </span>
              {isAdmin && (
                <span className="px-2 py-0.5 rounded-full bg-indigo text-white text-[10px] font-bold uppercase tracking-wider">
                  Curator Admin
                </span>
              )}
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mt-1">
              Namaste, {user?.fullName}
            </h1>
            <p className="text-xs text-charcoal/60 mt-0.5">{user?.email}</p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto">
            {isAdmin && (
              <Link
                href="/admin"
                className="px-4 py-2.5 rounded-xl bg-indigo text-white text-xs uppercase tracking-wider font-semibold hover:bg-indigo-deep transition-colors flex items-center space-x-1.5 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-turmeric" />
                <span>Admin Dashboard</span>
              </Link>
            )}
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-xl border border-parchment bg-white text-charcoal/70 hover:text-charcoal hover:bg-parchment/60 transition-colors text-xs font-semibold flex items-center space-x-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Account Tabs & Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tab Sidebar (3 cols) */}
          <div className="lg:col-span-3 bg-ivory-50 rounded-2xl border border-parchment p-3 shadow-craft space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'orders'
                  ? 'bg-charcoal text-white shadow-sm'
                  : 'text-charcoal/70 hover:bg-parchment/50 hover:text-charcoal'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Order History ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'wishlist'
                  ? 'bg-charcoal text-white shadow-sm'
                  : 'text-charcoal/70 hover:bg-parchment/50 hover:text-charcoal'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist ({wishlistProducts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'addresses'
                  ? 'bg-charcoal text-white shadow-sm'
                  : 'text-charcoal/70 hover:bg-parchment/50 hover:text-charcoal'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-charcoal text-white shadow-sm'
                  : 'text-charcoal/70 hover:bg-parchment/50 hover:text-charcoal'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile Credentials</span>
            </button>
          </div>

          {/* Main Tab Content (9 cols) */}
          <div className="lg:col-span-9">
            {/* 1. ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="font-serif text-xl font-medium text-charcoal">
                  Your Order History
                </h2>

                {orders.length === 0 ? (
                  <div className="py-16 text-center bg-ivory-50 rounded-3xl border border-parchment">
                    <Package className="w-8 h-8 text-charcoal/30 mx-auto mb-2" />
                    <p className="text-sm text-charcoal">No previous orders placed yet.</p>
                    <Link
                      href="/shop"
                      className="mt-4 inline-block px-6 py-2 rounded-full bg-charcoal text-white text-xs font-semibold"
                    >
                      Shop Handlooms
                    </Link>
                  </div>
                ) : (
                  orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-ivory-50 rounded-3xl border border-parchment p-6 sm:p-8 shadow-craft space-y-6"
                    >
                      {/* Order top bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-parchment gap-3 text-xs">
                        <div>
                          <span className="text-[10px] uppercase text-charcoal/50 font-bold block">
                            Order Number
                          </span>
                          <span className="font-mono font-bold text-sm text-charcoal">
                            {ord.orderNumber}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-charcoal/50 font-bold block">
                            Date
                          </span>
                          <span className="text-charcoal">
                            {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-charcoal/50 font-bold block">
                            Status
                          </span>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                              ord.status === 'delivered'
                                ? 'bg-forest/15 text-forest'
                                : ord.status === 'processing'
                                ? 'bg-turmeric-50 text-turmeric-dark'
                                : 'bg-indigo/10 text-indigo'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-charcoal/50 font-bold block">
                            Total
                          </span>
                          <span className="font-serif font-bold text-sm text-charcoal">
                            ₹{ord.totalAmount.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-parchment">
                        {ord.items.map((it) => (
                          <div key={it.id} className="py-3 flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-3">
                              <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-parchment border border-parchment flex-shrink-0">
                                <Image src={it.productImage} alt={it.productName} fill className="object-cover" />
                              </div>
                              <div>
                                <h4 className="font-serif text-xs font-medium text-charcoal">{it.productName}</h4>
                                {it.variantName && (
                                  <p className="text-[10px] text-terracotta">{it.variantName}</p>
                                )}
                                <span className="text-[11px] text-charcoal/60">Qty: {it.quantity}</span>
                              </div>
                            </div>
                            <span className="font-semibold text-charcoal">
                              ₹{it.lineTotal.toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Courier Tracking if available */}
                      {ord.trackingNumber && (
                        <div className="p-3.5 bg-parchment/40 rounded-xl border border-parchment text-xs text-charcoal flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Truck className="w-4 h-4 text-terracotta" />
                            <span>
                              Carrier: <strong>{ord.carrier || 'Express Courier'}</strong> &bull; AWB: <code className="font-mono">{ord.trackingNumber}</code>
                            </span>
                          </div>
                          <span className="text-forest font-semibold text-[11px]">In Transit</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 2. WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h2 className="font-serif text-xl font-medium text-charcoal">
                  Your Heirloom Wishlist ({wishlistProducts.length})
                </h2>

                {wishlistProducts.length === 0 ? (
                  <div className="py-16 text-center bg-ivory-50 rounded-3xl border border-parchment">
                    <Heart className="w-8 h-8 text-charcoal/30 mx-auto mb-2" />
                    <p className="text-sm text-charcoal">Your wishlist is currently empty.</p>
                    <Link
                      href="/shop"
                      className="mt-4 inline-block px-6 py-2 rounded-full bg-charcoal text-white text-xs font-semibold"
                    >
                      Browse Catalogue
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {wishlistProducts.map((p) => (
                      <div
                        key={p.id}
                        className="bg-ivory-50 rounded-2xl border border-parchment overflow-hidden p-4 flex flex-col justify-between space-y-3"
                      >
                        <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-parchment">
                          <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-terracotta font-semibold">
                            {p.craftType}
                          </span>
                          <h4 className="font-serif text-sm font-medium text-charcoal line-clamp-1">
                            {p.name}
                          </h4>
                          <span className="font-serif font-bold text-sm text-charcoal block mt-1">
                            ₹{(p.salePrice ?? p.price).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <button
                            onClick={() => addToCart(p, 1, p.variants[0])}
                            className="flex-1 py-2 rounded-xl bg-charcoal text-white hover:bg-terracotta text-xs font-semibold transition-colors flex items-center justify-center space-x-1"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Bag</span>
                          </button>
                          <button
                            onClick={() => toggleWishlist(p)}
                            className="p-2 rounded-xl border border-parchment bg-white text-charcoal/60 hover:text-terracotta transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="bg-ivory-50 rounded-3xl border border-parchment p-8 shadow-craft space-y-6">
                <h2 className="font-serif text-xl font-medium text-charcoal">
                  Primary Delivery Address
                </h2>
                <div className="p-5 rounded-2xl bg-white border border-parchment max-w-md space-y-2 text-xs text-charcoal/80">
                  <div className="flex items-center justify-between font-semibold text-charcoal">
                    <span>{user?.fullName}</span>
                    <span className="px-2 py-0.5 rounded-full bg-parchment text-[10px]">Default</span>
                  </div>
                  <p>Flat 402, Samudra Towers, Worli Sea Face</p>
                  <p>Mumbai, Maharashtra - 400018</p>
                  <p>Country: India</p>
                  <p>Phone: {user?.phone || '+91 98201 44552'}</p>
                </div>
              </div>
            )}

            {/* 4. PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="bg-ivory-50 rounded-3xl border border-parchment p-8 shadow-craft space-y-6">
                <h2 className="font-serif text-xl font-medium text-charcoal">
                  Profile Credentials
                </h2>
                <div className="max-w-md space-y-4 text-xs">
                  <div>
                    <label className="block text-charcoal font-semibold mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      disabled
                      value={user?.fullName || ''}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-parchment text-charcoal/80"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || ''}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-parchment text-charcoal/80"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal font-semibold mb-1">Account Role</label>
                    <span className="inline-block px-3 py-1 rounded-full bg-parchment text-charcoal font-semibold uppercase tracking-wider text-[10px]">
                      {user?.role}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading Account Portal...</div>}>
      <AccountContent />
    </Suspense>
  );
}
