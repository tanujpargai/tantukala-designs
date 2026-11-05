'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const primaryImage = product.images[0] || '/images/craft-hero.avif';
  const secondaryImage = product.images[1] || primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1, product.variants[0]);
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div
      className="group relative flex flex-col bg-ivory-50 rounded-2xl overflow-hidden border border-parchment/80 hover:border-terracotta/40 transition-all duration-300 hover:shadow-craft"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Aspect Ratio */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-parchment/40">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isBestseller && (
            <span className="px-2.5 py-1 rounded-full bg-indigo-deep/90 text-ivory-100 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm flex items-center space-x-1">
              <Sparkles className="w-2.5 h-2.5 text-turmeric" />
              <span>Bestseller</span>
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-terracotta text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              {discountPercent}% Off
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-terracotta text-white shadow-md'
              : 'bg-white/85 text-charcoal hover:bg-white hover:text-terracotta shadow-sm'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <button
            onClick={handleQuickViewClick}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-white/95 text-charcoal hover:bg-charcoal hover:text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md flex items-center space-x-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Provenance & Craft */}
          <div className="text-[11px] uppercase tracking-wider text-terracotta font-semibold line-clamp-1">
            {product.craftType} • {product.regionProvenance}
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-base sm:text-lg font-medium text-charcoal mt-1 line-clamp-1 group-hover:text-terracotta transition-colors">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Short Craft Descriptor */}
          <p className="text-xs text-charcoal/60 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Add to Bag */}
        <div className="pt-4 mt-3 border-t border-parchment/60 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="font-serif text-base sm:text-lg font-bold text-charcoal">
                ₹{(product.salePrice ?? product.price).toLocaleString('en-IN')}
              </span>
              {product.salePrice && (
                <span className="text-xs text-charcoal/40 line-through">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-forest font-medium">Taxes included</span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isAdding || product.stock === 0}
            className="px-3.5 py-2 rounded-xl bg-charcoal text-white hover:bg-terracotta transition-colors text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5 disabled:opacity-50 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {product.stock === 0 ? 'Out of Stock' : isAdding ? 'Added' : 'Add'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
