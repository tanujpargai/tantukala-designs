'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { store } from '@/lib/store';
import { Product } from '@/types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const all = store.getProducts();
    const filtered = all.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.craftType.toLowerCase().includes(q) ||
        p.regionProvenance.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const popularKeywords = ['Madhubani', 'Tussar Silk', 'Sujni', 'Rabari', 'Bela Block', 'Chanderi'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-charcoal/80 backdrop-blur-md transition-opacity">
      <div
        className="w-full max-w-2xl bg-ivory-50 rounded-2xl shadow-2xl border border-parchment overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Search Catalog"
      >
        {/* Header / Input */}
        <div className="p-4 sm:p-6 border-b border-parchment flex items-center space-x-3 bg-white/70">
          <Search className="w-5 h-5 text-indigo flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by craft, silk, artwork, or village provenance..."
            className="w-full bg-transparent border-none text-charcoal placeholder-charcoal/40 text-base sm:text-lg focus:outline-none focus:ring-0"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-charcoal/40 hover:text-charcoal transition-colors"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs tracking-wider uppercase px-2.5 py-1 rounded bg-parchment/60 text-charcoal/70 hover:bg-parchment hover:text-charcoal transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto divide-y divide-parchment/40">
          {/* Quick suggestions if no query */}
          {!query.trim() && (
            <div className="py-2">
              <div className="flex items-center space-x-1.5 text-xs uppercase tracking-widest text-charcoal/60 font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                <span>Popular Handloom Inquiries</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularKeywords.map((kw) => (
                  <button
                    key={kw}
                    onClick={() => setQuery(kw)}
                    className="text-xs px-3 py-1.5 rounded-full bg-parchment/50 hover:bg-terracotta hover:text-white text-charcoal transition-all border border-parchment"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results list */}
          {query.trim() && results.length > 0 && (
            <div className="space-y-3 pt-2">
              <p className="text-xs uppercase tracking-wider text-charcoal/50 mb-2">
                Found {results.length} handcrafted {results.length === 1 ? 'creation' : 'creations'}
              </p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center space-x-4 p-2.5 rounded-xl hover:bg-parchment/40 transition-colors group"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-parchment/60 flex-shrink-0 border border-parchment">
                    <Image
                      src={product.images[0] || '/images/craft-hero.avif'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] uppercase tracking-wider text-terracotta font-medium">
                      {product.craftType} • {product.regionProvenance}
                    </span>
                    <h4 className="text-sm font-serif font-medium text-charcoal truncate group-hover:text-terracotta transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-charcoal/60 mt-0.5">
                      ₹{(product.salePrice ?? product.price).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-charcoal/30 group-hover:text-terracotta group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          )}

          {/* No results */}
          {query.trim() && results.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-sm text-charcoal/70">
                No artisanal creations found matching &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-charcoal/50 mt-1">
                Try searching for &quot;Madhubani&quot;, &quot;Sujni&quot;, &quot;Silk&quot; or &quot;Kutch&quot;
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-parchment/30 border-t border-parchment text-center">
          <Link
            href="/shop"
            onClick={onClose}
            className="text-xs tracking-wider uppercase text-terracotta font-medium hover:underline inline-flex items-center space-x-1"
          >
            <span>Browse Full Handcrafted Catalogue</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};
