'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingBag, Heart, ArrowRight, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);
  const currentPrice =
    selectedVariant?.priceOverride ?? product.salePrice ?? product.price;

  const handleAdd = () => {
    addToCart(product, quantity, selectedVariant);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal/70 backdrop-blur-md">
      <div
        className="relative w-full max-w-4xl bg-ivory-50 rounded-3xl shadow-2xl border border-parchment overflow-hidden max-h-[90vh] flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-charcoal transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-parchment/30 border-b md:border-b-0 md:border-r border-parchment">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-parchment/60 border border-parchment">
            <Image
              src={product.images[selectedImage] || '/images/craft-hero.avif'}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === idx ? 'border-terracotta scale-105' : 'border-parchment opacity-70'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="text-xs uppercase tracking-wider text-terracotta font-semibold">
              {product.craftType} • {product.regionProvenance}
            </div>

            <h2 className="font-serif text-2xl font-medium text-charcoal mt-1">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline space-x-3 mt-3">
              <span className="font-serif text-2xl font-bold text-charcoal">
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              {product.salePrice && !selectedVariant?.priceOverride && (
                <span className="text-sm text-charcoal/40 line-through">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Short description */}
            <p className="text-xs text-charcoal/70 mt-3 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Artisan Note */}
            <div className="mt-4 p-3 bg-parchment/40 rounded-xl border border-parchment/80 text-xs text-charcoal/80 flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
              <span>{product.artisanNotes}</span>
            </div>

            {/* Variants if any */}
            {product.variants.length > 0 && (
              <div className="mt-5">
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                  Select Edition / Variant:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                        selectedVariant?.id === variant.id
                          ? 'border-terracotta bg-terracotta/10 text-terracotta font-semibold'
                          : 'border-parchment bg-white text-charcoal/80 hover:border-charcoal'
                      }`}
                    >
                      {variant.name}
                      {variant.priceOverride &&
                        ` (+₹${(variant.priceOverride - product.price).toLocaleString('en-IN')})`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-5 flex items-center space-x-4">
              <label className="text-xs uppercase tracking-wider font-semibold text-charcoal">
                Quantity:
              </label>
              <div className="flex items-center space-x-3 bg-parchment/60 rounded-lg px-3 py-1 border border-parchment">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-charcoal hover:text-terracotta text-sm font-semibold"
                >
                  -
                </button>
                <span className="text-xs font-semibold w-4 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="text-charcoal hover:text-terracotta text-sm font-semibold"
                >
                  +
                </button>
              </div>
              <span className="text-[11px] text-charcoal/50">
                {product.stock} available in atelier
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 pt-6 border-t border-parchment space-y-3">
            <div className="flex space-x-3">
              <button
                onClick={handleAdd}
                disabled={isAdded || product.stock === 0}
                className="flex-1 py-3 px-4 bg-terracotta text-white rounded-xl text-xs uppercase tracking-widest font-semibold hover:bg-terracotta-dark transition-all flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border transition-all ${
                  isWishlisted
                    ? 'border-terracotta bg-terracotta/10 text-terracotta'
                    : 'border-parchment bg-white text-charcoal hover:border-terracotta'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="w-full block text-center text-xs text-charcoal/70 hover:text-terracotta font-medium tracking-wide flex items-center justify-center space-x-1"
            >
              <span>View Complete Craft Provenance &amp; Specifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
