'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { QuickSearchModal } from './QuickSearchModal';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const { totalWishlist } = useWishlist();
  const { user, isAdmin } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsShopHovered(false);
  }, [pathname]);

  const categories = [
    {
      name: 'Madhubani Art Panels',
      href: '/shop?category=madhubani-art-panels',
      desc: 'Mithila sacred paintings on tussar & handmade paper',
      art: 'Bihar',
    },
    {
      name: 'Heritage Handloom Sarees',
      href: '/shop?category=heritage-handloom-sarees',
      desc: 'Wild forest Tussar, Kantha embroidered silks, and Chanderi drapes',
      art: 'Bhagalpur & Chanderi',
    },
    {
      name: 'Artisanal Dupattas & Stoles',
      href: '/shop?category=artisanal-dupattas-stoles',
      desc: 'Sujni running stitch, Kutch Rabari mirrors, and Jat cross-stitch',
      art: 'Kutch & Bengal',
    },
    {
      name: 'Living & Interior Textiles',
      href: '/shop?category=living-interior-textiles',
      desc: 'Teakwood Bela resist-printed linens and Nakshi Kantha throws',
      art: 'Gujarat & Shantiniketan',
    },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory-100/95 backdrop-blur-md shadow-sm border-b border-parchment py-3'
            : 'bg-ivory-100/80 backdrop-blur-sm border-b border-parchment/60 py-4'
        }`}
      >
        <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Menu Toggle & Main Desktop Navigation */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2 text-charcoal hover:text-terracotta transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-widest font-medium text-charcoal">
                <Link
                  href="/"
                  className={`hover:text-terracotta transition-colors py-1 ${
                    pathname === '/' ? 'text-terracotta font-semibold' : ''
                  }`}
                >
                  Home
                </Link>

                {/* Shop with Mega Dropdown */}
                <div
                  className="relative group"
                  onMouseEnter={() => setIsShopHovered(true)}
                  onMouseLeave={() => setIsShopHovered(false)}
                >
                  <Link
                    href="/shop"
                    className={`flex items-center space-x-1 hover:text-terracotta transition-colors py-1 ${
                      pathname.startsWith('/shop') ? 'text-terracotta font-semibold' : ''
                    }`}
                  >
                    <span>Shop</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {isShopHovered && (
                    <div className="absolute top-full left-0 w-96 bg-ivory-50 rounded-2xl shadow-xl border border-parchment p-5 mt-2 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="text-[10px] uppercase tracking-widest text-charcoal/50 font-bold mb-3">
                        Curated Handloom Categories
                      </div>
                      <div className="space-y-3">
                        {categories.map((cat) => (
                          <Link
                            key={cat.name}
                            href={cat.href}
                            className="block p-2.5 rounded-xl hover:bg-parchment/50 transition-colors group/item"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-serif text-sm font-medium text-charcoal group-hover/item:text-terracotta transition-colors">
                                {cat.name}
                              </span>
                              <span className="text-[10px] text-terracotta uppercase tracking-wider font-semibold">
                                {cat.art}
                              </span>
                            </div>
                            <p className="text-xs text-charcoal/60 mt-0.5">{cat.desc}</p>
                          </Link>
                        ))}
                      </div>
                      <div className="pt-3 mt-3 border-t border-parchment flex items-center justify-between text-xs">
                        <Link
                          href="/shop"
                          className="text-terracotta font-semibold hover:underline flex items-center space-x-1"
                        >
                          <span>Explore All Products</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                        <Link
                          href="/collections"
                          className="text-charcoal/60 hover:text-charcoal"
                        >
                          View Collections
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/collections"
                  className={`hover:text-terracotta transition-colors py-1 ${
                    pathname.startsWith('/collections') ? 'text-terracotta font-semibold' : ''
                  }`}
                >
                  Collections
                </Link>

                <Link
                  href="/craft"
                  className={`hover:text-terracotta transition-colors py-1 ${
                    pathname.startsWith('/craft') ? 'text-terracotta font-semibold' : ''
                  }`}
                >
                  Our Craft
                </Link>

                <Link
                  href="/story"
                  className={`hover:text-terracotta transition-colors py-1 ${
                    pathname.startsWith('/story') ? 'text-terracotta font-semibold' : ''
                  }`}
                >
                  Our Story
                </Link>

                <Link
                  href="/journal"
                  className={`hover:text-terracotta transition-colors py-1 ${
                    pathname.startsWith('/journal') ? 'text-terracotta font-semibold' : ''
                  }`}
                >
                  Journal
                </Link>
              </nav>
            </div>

            {/* Center: Brand Identity Logo / Wordmark */}
            <div className="text-center">
              <Link href="/" className="inline-block group">
                <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wider text-charcoal group-hover:text-terracotta transition-colors block">
                  TANTUKALA
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-charcoal/60 font-medium -mt-1 block group-hover:text-charcoal transition-colors">
                  Where Heritage Becomes Art
                </span>
              </Link>
            </div>

            {/* Right: Actions (Search, Wishlist, Account, Cart) */}
            <div className="flex items-center space-x-2 sm:space-x-5">
              {/* Quick Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-charcoal hover:text-terracotta transition-colors"
                aria-label="Open Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/account?tab=wishlist"
                className="relative p-2 text-charcoal hover:text-terracotta transition-colors hidden sm:block"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {totalWishlist > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-terracotta text-white text-[10px] font-bold flex items-center justify-center">
                    {totalWishlist}
                  </span>
                )}
              </Link>

              {/* Customer Account / Admin Link */}
              <Link
                href={isAdmin ? '/admin' : '/account'}
                className="relative p-2 text-charcoal hover:text-terracotta transition-colors flex items-center space-x-1"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
                {isAdmin && (
                  <span className="hidden xl:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo text-white uppercase tracking-wider">
                    Admin
                  </span>
                )}
              </Link>

              {/* Shopping Bag Button with Live Count */}
              <button
                onClick={openCart}
                className="relative p-2 text-charcoal hover:text-terracotta transition-colors flex items-center space-x-1.5"
                aria-label={`Open Cart with ${totalItems} items`}
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-terracotta text-white text-[10px] font-bold flex items-center justify-center animate-scale-in">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden md:inline-block text-xs uppercase tracking-wider font-semibold">
                  Bag
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Search Modal */}
      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Navigation Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-ivory-50 border-r border-parchment shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-left duration-200">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-parchment">
                <div>
                  <span className="font-serif text-xl font-bold text-charcoal">TANTUKALA</span>
                  <p className="text-[10px] uppercase tracking-widest text-charcoal/60">
                    Where Heritage Becomes Art
                  </p>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1.5 text-charcoal/60 hover:text-charcoal"
                  aria-label="Close mobile menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-6 space-y-4">
                <Link
                  href="/"
                  className="block text-sm uppercase tracking-widest font-medium text-charcoal hover:text-terracotta"
                >
                  Home
                </Link>
                <div className="space-y-2">
                  <Link
                    href="/shop"
                    className="block text-sm uppercase tracking-widest font-medium text-charcoal hover:text-terracotta"
                  >
                    Shop All Handlooms
                  </Link>
                  <div className="pl-3 border-l border-parchment space-y-1.5 text-xs text-charcoal/70">
                    <Link href="/shop?category=madhubani-art-panels" className="block hover:text-terracotta">
                      Madhubani Art Panels
                    </Link>
                    <Link href="/shop?category=heritage-handloom-sarees" className="block hover:text-terracotta">
                      Heritage Handloom Sarees
                    </Link>
                    <Link href="/shop?category=artisanal-dupattas-stoles" className="block hover:text-terracotta">
                      Artisanal Dupattas & Stoles
                    </Link>
                    <Link href="/shop?category=living-interior-textiles" className="block hover:text-terracotta">
                      Living & Interior Textiles
                    </Link>
                  </div>
                </div>

                <Link
                  href="/collections"
                  className="block text-sm uppercase tracking-widest font-medium text-charcoal hover:text-terracotta"
                >
                  Collections
                </Link>
                <Link
                  href="/craft"
                  className="block text-sm uppercase tracking-widest font-medium text-charcoal hover:text-terracotta"
                >
                  Our Craft
                </Link>
                <Link
                  href="/story"
                  className="block text-sm uppercase tracking-widest font-medium text-charcoal hover:text-terracotta"
                >
                  Our Story
                </Link>
                <Link
                  href="/journal"
                  className="block text-sm uppercase tracking-widest font-medium text-charcoal hover:text-terracotta"
                >
                  Journal
                </Link>
                <Link
                  href="/wholesale"
                  className="block text-sm uppercase tracking-widest font-medium text-terracotta font-semibold"
                >
                  B2B Wholesale Enquiries
                </Link>
                <Link
                  href="/contact"
                  className="block text-sm uppercase tracking-widest font-medium text-charcoal hover:text-terracotta"
                >
                  Contact Studio
                </Link>
              </nav>
            </div>

            {/* Bottom Actions & Footer */}
            <div className="pt-6 border-t border-parchment space-y-3">
              <Link
                href="/account"
                className="flex items-center justify-between p-3 rounded-xl bg-parchment/40 text-charcoal text-xs font-medium"
              >
                <span className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-terracotta" />
                  <span>{user ? user.fullName : 'Account & Orders'}</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-charcoal/40" />
              </Link>

              <div className="text-[11px] text-charcoal/60 space-y-1">
                <p>Support: +91 93199 27100</p>
                <p>care@tantukaladesigns.com</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
