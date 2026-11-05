'use client';

import React, { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  MapPin,
  Feather,
  ChevronRight,
  Check,
  Share2,
} from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { store } from '@/lib/store';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/ecommerce/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'craft' | 'specs' | 'shipping'>('craft');
  const [isCopied, setIsCopied] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    if (slug) {
      const found = store.getProductBySlug(slug);
      if (found) {
        setProduct(found);
        setSelectedVariant(found.variants[0]);
        setSelectedImage(0);
      }
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="py-32 text-center bg-ivory-100 min-h-screen">
        <h2 className="font-serif text-2xl text-charcoal">Artisanal creation not found</h2>
        <p className="text-xs text-charcoal/60 mt-2 mb-6">
          The requested handloom piece may have been archived or belongs to an earlier collection.
        </p>
        <Link
          href="/shop"
          className="px-6 py-2.5 rounded-full bg-charcoal text-white text-xs uppercase tracking-widest"
        >
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const currentPrice = selectedVariant?.priceOverride ?? product.salePrice ?? product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 800);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Related products from the same category or collection
  const allProds = store.getProducts();
  const related = allProds
    .filter((p) => p.id !== product.id && (p.categoryId === product.categoryId || p.collectionId === product.collectionId))
    .slice(0, 4);

  return (
    <div className="py-10 sm:py-16 bg-ivory-100 min-h-screen">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-charcoal/60 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-terracotta">Home</Link>
          <ChevronRight className="w-3 h-3 text-charcoal/40" />
          <Link href="/shop" className="hover:text-terracotta">Shop</Link>
          <ChevronRight className="w-3 h-3 text-charcoal/40" />
          <Link href={`/shop?category=${product.categoryId}`} className="hover:text-terracotta">
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3 h-3 text-charcoal/40" />
          <span className="text-charcoal font-medium truncate">{product.name}</span>
        </nav>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Gallery & Thumbnails (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image View */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-parchment/60 shadow-craft border border-parchment group">
              <Image
                src={product.images[selectedImage] || '/images/craft-hero.avif'}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 rounded-full bg-charcoal/85 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                  {product.craftType}
                </span>
                <span className="px-3 py-1 rounded-full bg-ivory-100/90 text-charcoal text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm border border-parchment">
                  {product.regionProvenance}
                </span>
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-charcoal transition-all shadow-sm"
                aria-label="Share product"
              >
                {isCopied ? <Check className="w-4 h-4 text-forest" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === idx
                        ? 'border-terracotta scale-105 shadow-md'
                        : 'border-parchment opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Pricing, Buy Box & Specifications (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-terracotta font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Handcrafted in {product.regionProvenance}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal leading-tight">
                {product.name}
              </h1>
              <p className="text-xs text-charcoal/50 font-mono mt-1">SKU: {product.sku}</p>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-ivory-50 rounded-2xl border border-parchment/80 flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline space-x-3">
                  <span className="font-serif text-3xl font-bold text-charcoal">
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </span>
                  {product.salePrice && !selectedVariant?.priceOverride && (
                    <span className="text-sm text-charcoal/40 line-through">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <span className="text-xs text-forest font-medium block mt-0.5">
                  Includes all applicable Indian craft taxes &amp; packaging
                </span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-parchment text-charcoal/80 font-medium">
                {product.stock > 0 ? `${product.stock} in Atelier` : 'Sold Out'}
              </span>
            </div>

            {/* Short Narrative */}
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-light">
              {product.shortDescription}
            </p>

            {/* Artisan Assurance Note */}
            <div className="p-4 bg-turmeric-50/70 rounded-2xl border border-turmeric/30 text-xs text-charcoal space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-turmeric-dark">
                <Sparkles className="w-4 h-4" />
                <span>Master Artisan Note</span>
              </div>
              <p className="italic text-charcoal/80">&ldquo;{product.artisanNotes}&rdquo;</p>
            </div>

            {/* Variant Editions if any */}
            {product.variants.length > 0 && (
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal">
                  Select Edition / Framing:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedVariant?.id === v.id
                          ? 'border-terracotta bg-terracotta/10 text-charcoal font-semibold shadow-sm'
                          : 'border-parchment bg-white text-charcoal/70 hover:border-charcoal'
                      }`}
                    >
                      <div className="text-xs font-medium">{v.name}</div>
                      {v.priceOverride && (
                        <div className="text-[11px] text-terracotta font-semibold mt-0.5">
                          ₹{v.priceOverride.toLocaleString('en-IN')}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 pt-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-charcoal">
                Quantity:
              </span>
              <div className="flex items-center space-x-3 bg-white rounded-xl px-3 py-1.5 border border-parchment shadow-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-charcoal hover:text-terracotta text-sm font-semibold px-1"
                >
                  -
                </button>
                <span className="text-xs font-semibold w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="text-charcoal hover:text-terracotta text-sm font-semibold px-1"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Bag & Wishlist */}
            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isAdded || product.stock === 0}
                className="flex-1 py-4 px-6 rounded-2xl bg-terracotta text-white font-medium text-xs uppercase tracking-[0.2em] hover:bg-terracotta-dark transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-terracotta/30 disabled:opacity-50"
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
                className={`p-4 rounded-2xl border transition-all ${
                  isWishlisted
                    ? 'border-terracotta bg-terracotta text-white'
                    : 'border-parchment bg-white text-charcoal hover:border-terracotta'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Value Guarantees list */}
            <div className="pt-4 border-t border-parchment grid grid-cols-2 gap-3 text-[11px] text-charcoal/70">
              <div className="flex items-center space-x-2">
                <Truck className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                <span>Complimentary Shipping &gt; ₹4,999</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                <span>Certificate of Handloom Origin</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                <span>7-Day Return &amp; Exchange</span>
              </div>
              <div className="flex items-center space-x-2">
                <Feather className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                <span>100% Pure Natural Fibers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Craft & Material Information */}
        <div className="mt-20 bg-ivory-50 rounded-3xl border border-parchment overflow-hidden shadow-craft">
          {/* Tabs header */}
          <div className="flex border-b border-parchment">
            <button
              onClick={() => setActiveTab('craft')}
              className={`flex-1 py-4 text-xs uppercase tracking-widest font-semibold transition-all border-b-2 ${
                activeTab === 'craft'
                  ? 'border-terracotta text-terracotta bg-white/70'
                  : 'border-transparent text-charcoal/60 hover:text-charcoal'
              }`}
            >
              Craft Provenance &amp; Story
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`flex-1 py-4 text-xs uppercase tracking-widest font-semibold transition-all border-b-2 ${
                activeTab === 'specs'
                  ? 'border-terracotta text-terracotta bg-white/70'
                  : 'border-transparent text-charcoal/60 hover:text-charcoal'
              }`}
            >
              Material &amp; Specifications
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`flex-1 py-4 text-xs uppercase tracking-widest font-semibold transition-all border-b-2 ${
                activeTab === 'shipping'
                  ? 'border-terracotta text-terracotta bg-white/70'
                  : 'border-transparent text-charcoal/60 hover:text-charcoal'
              }`}
            >
              Care, Shipping &amp; Returns
            </button>
          </div>

          {/* Tab content */}
          <div className="p-6 sm:p-10">
            {activeTab === 'craft' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="font-serif text-2xl text-charcoal font-medium">
                  The Tradition of {product.craftType}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-light">
                  {product.description}
                </p>
                <div className="p-4 bg-parchment/40 rounded-2xl border border-parchment text-xs text-charcoal/80">
                  <span className="font-bold block text-charcoal mb-1">Authenticity Pledge:</span>
                  Tantukala preserves original craft lineages without synthetic shortcuts. Our artisans receive prompt, transparent payments well above regional fair-wage standards.
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl divide-y divide-parchment text-xs text-charcoal/80">
                <div className="py-2.5 flex justify-between">
                  <span className="font-medium text-charcoal">Material Composition</span>
                  <span>{product.material}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="font-medium text-charcoal">Dimensions</span>
                  <span>{product.dimensions}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="font-medium text-charcoal">Craft Tradition</span>
                  <span>{product.craftType}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="font-medium text-charcoal">Regional Provenance</span>
                  <span>{product.regionProvenance}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="font-medium text-charcoal">Collection</span>
                  <span>{product.collectionName}</span>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-2xl space-y-4 text-xs text-charcoal/80 leading-relaxed">
                <div>
                  <h4 className="font-serif text-base text-charcoal font-medium mb-1">
                    Care &amp; Longevity Counsel
                  </h4>
                  <p>{product.careInstructions}</p>
                </div>
                <div className="pt-2">
                  <h4 className="font-serif text-base text-charcoal font-medium mb-1">
                    Shipping &amp; Transit Time
                  </h4>
                  <p>
                    All items are shipped via express insured air or surface couriers (Blue Dart / DTDC). Domestic orders arrive within 3 to 6 business days. Fine art panels are packed in rigid moisture-sealed tubes or padded crating.
                  </p>
                </div>
                <div className="pt-2">
                  <h4 className="font-serif text-base text-charcoal font-medium mb-1">
                    7-Day Fair Returns
                  </h4>
                  <p>
                    We welcome returns or exchanges within 7 days of delivery for unworn, undamaged items with original seals intact. Contact care@tantukaladesigns.com to schedule a complimentary pickup.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Handloom Pieces */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-1">
                From The Same Loom &amp; Guild
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
                Related Handcrafted Creations
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
