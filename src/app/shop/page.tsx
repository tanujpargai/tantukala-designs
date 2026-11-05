'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';
import { Product, CraftType } from '@/types';
import { ProductCard } from '@/components/ecommerce/ProductCard';
import { QuickViewModal } from '@/components/ecommerce/QuickViewModal';
import { store } from '@/lib/store';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get('category');
  const initialCraftParam = searchParams.get('craft');

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryParam || 'all');
  const [selectedCraft, setSelectedCraft] = useState<string>(initialCraftParam || 'all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceMax, setPriceMax] = useState<number>(25000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    setProducts(store.getProducts());
  }, []);

  useEffect(() => {
    if (initialCategoryParam) {
      setSelectedCategory(initialCategoryParam);
    }
  }, [initialCategoryParam]);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'cat-madhubani', name: 'Madhubani Art Panels' },
    { id: 'cat-sarees', name: 'Heritage Handloom Sarees' },
    { id: 'cat-dupattas', name: 'Artisanal Dupattas & Stoles' },
    { id: 'cat-living', name: 'Living & Interior Textiles' },
  ];

  const craftTypes = [
    'all',
    'Madhubani Painting',
    'Sujni Embroidery',
    'Kantha Needlework',
    'Rabari Mirrorwork',
    'Jat Cross-Stitch',
    'Bela Block Print',
    'Chanderi Weaving',
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (!p.isPublished) return false;
        if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) return false;
        if (selectedCraft !== 'all' && p.craftType !== selectedCraft) return false;
        const currentPrice = p.salePrice ?? p.price;
        if (currentPrice > priceMax) return false;
        if (onlyInStock && p.stock <= 0) return false;
        return true;
      })
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;
        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedCraft, priceMax, onlyInStock, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedCraft('all');
    setPriceMax(25000);
    setOnlyInStock(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedCraft !== 'all' ||
    priceMax < 25000 ||
    onlyInStock;

  return (
    <div className="py-12 sm:py-20 bg-ivory-100 min-h-screen">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Editorial Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-2">
            The Complete Atelier Archive
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-charcoal">
            Shop Handcrafted Indian Textiles
          </h1>
          <p className="text-sm text-charcoal/70 mt-3 font-light leading-relaxed">
            Slowly crafted by master weavers and folk artists. Sourced ethically with certified provenance.
          </p>
        </div>

        {/* Filter and Sort Bar */}
        <div className="bg-ivory-50 rounded-2xl border border-parchment p-4 mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-charcoal text-white font-medium shadow-sm'
                    : 'bg-parchment/40 text-charcoal/70 hover:bg-parchment hover:text-charcoal'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Controls: Filter Drawer Toggle & Sort Dropdown */}
          <div className="flex items-center space-x-3 self-end md:self-auto">
            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className={`flex items-center space-x-1.5 text-xs px-3.5 py-2 rounded-xl border transition-colors ${
                hasActiveFilters
                  ? 'border-terracotta bg-terracotta/10 text-terracotta font-semibold'
                  : 'border-parchment bg-white text-charcoal hover:border-charcoal'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter Craft</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center space-x-1.5 text-xs text-charcoal">
              <ArrowUpDown className="w-3.5 h-3.5 text-charcoal/50" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-parchment rounded-xl px-2.5 py-2 text-xs text-charcoal focus:outline-none focus:border-terracotta"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Recently Weaved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Collapsible Filter Panel */}
        {isFilterDrawerOpen && (
          <div className="bg-white rounded-2xl border border-parchment p-6 mb-8 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Filter 1: Craft Discipline */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                Craft Tradition
              </label>
              <select
                value={selectedCraft}
                onChange={(e) => setSelectedCraft(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-parchment bg-ivory-50 text-charcoal focus:outline-none focus:border-terracotta"
              >
                {craftTypes.map((c) => (
                  <option key={c} value={c}>
                    {c === 'all' ? 'All Traditional Crafts' : c}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter 2: Max Price Range */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-charcoal mb-2">
                <span className="uppercase tracking-wider">Price Ceiling</span>
                <span>₹{priceMax.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="3000"
                max="25000"
                step="500"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-terracotta cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal/50 mt-1">
                <span>₹3,000</span>
                <span>₹25,000</span>
              </div>
            </div>

            {/* Filter 3: Stock status & Clear */}
            <div className="flex flex-col justify-between">
              <label className="flex items-center space-x-2 text-xs font-medium text-charcoal cursor-pointer mt-1">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded border-parchment text-terracotta focus:ring-terracotta"
                />
                <span>Only Show Pieces Available in Atelier</span>
              </label>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-terracotta hover:underline font-semibold flex items-center space-x-1 mt-4"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset All Active Filters</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-charcoal/60 mb-6">
          <span>
            Showing <strong className="text-charcoal">{filteredProducts.length}</strong> creations
          </span>
          {hasActiveFilters && (
            <span className="text-terracotta font-medium">Filtered Selection</span>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-ivory-50 rounded-3xl border border-parchment">
            <p className="font-serif text-xl text-charcoal">No handcrafted pieces match your filter criteria.</p>
            <p className="text-xs text-charcoal/60 mt-1 mb-6">
              Try adjusting your price ceiling or selecting all traditional crafts.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-full bg-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-terracotta transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading Catalogue...</div>}>
      <ShopContent />
    </Suspense>
  );
}
