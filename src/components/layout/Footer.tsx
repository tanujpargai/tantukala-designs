'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Sparkles, Check, Heart } from 'lucide-react';
import { store } from '@/lib/store';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ message: string; isError?: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setStatus({ message: 'Please enter a valid email address.', isError: true });
      return;
    }
    setIsSubmitting(true);
    const res = store.subscribeNewsletter(email);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus({ message: res.message, isError: !res.success });
      if (res.success) setEmail('');
    }, 400);
  };

  return (
    <footer className="bg-charcoal text-ivory-100 pt-16 pb-12 border-t border-charcoal-muted/30">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Top Newsletter & Cultural Banner */}
        <div className="bg-charcoal-dark border border-charcoal-muted/40 rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden">
          {/* Subtle decorative background motif */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-[0.25em] text-turmeric font-semibold block mb-2">
                The Tantukala Chronicle
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-ivory-50 leading-tight">
                Receive stories of living heritage, artisan chronicles &amp; private previews.
              </h3>
              <p className="text-sm text-ivory-200/70 mt-3 max-w-xl">
                We send thoughtful essays on regional Indian weaves, natural dyeing traditions, and announcements when new loom runs complete. Never spam.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="flex-1 bg-charcoal border border-charcoal-muted/60 rounded-xl px-4 py-3 text-sm text-ivory-50 placeholder-ivory-200/40 focus:outline-none focus:border-terracotta transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-terracotta text-white rounded-xl text-xs uppercase tracking-widest font-semibold hover:bg-terracotta-dark transition-all flex items-center justify-center space-x-1.5 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Joining...' : 'Subscribe'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {status && (
                  <p
                    className={`text-xs mt-1.5 ${
                      status.isError ? 'text-red-400' : 'text-turmeric-light'
                    }`}
                  >
                    {status.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-charcoal-muted/30">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-wider text-ivory-50 block">
                TANTUKALA DESIGNS
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-turmeric block -mt-1 font-medium">
                Where Heritage Becomes Art
              </span>
            </Link>
            <p className="text-xs text-ivory-200/70 leading-relaxed max-w-sm">
              Tantukala is a contemporary Indian craft house dedicated to preserving regional handloom art, master needlework, and sacred folk expressions. Every creation honors generations of tacit artisanal wisdom.
            </p>
            <div className="pt-2 text-xs text-ivory-200/60 space-y-1.5">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-turmeric flex-shrink-0" />
                <span>Craft Hubs: Mithila (Bihar) • Kutch (Gujarat) • Bhagalpur</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-turmeric flex-shrink-0" />
                <span>+91 93199 27100</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-turmeric flex-shrink-0" />
                <span>care@tantukaladesigns.com</span>
              </div>
            </div>
          </div>

          {/* Shop Handlooms */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-turmeric font-semibold mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory-200/80">
              <li>
                <Link href="/shop?category=madhubani-art-panels" className="hover:text-terracotta transition-colors">
                  Madhubani Art Panels
                </Link>
              </li>
              <li>
                <Link href="/shop?category=heritage-handloom-sarees" className="hover:text-terracotta transition-colors">
                  Heritage Handloom Sarees
                </Link>
              </li>
              <li>
                <Link href="/shop?category=artisanal-dupattas-stoles" className="hover:text-terracotta transition-colors">
                  Artisanal Dupattas &amp; Stoles
                </Link>
              </li>
              <li>
                <Link href="/shop?category=living-interior-textiles" className="hover:text-terracotta transition-colors">
                  Living &amp; Interior Textiles
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-terracotta transition-colors">
                  View All Curated Capsules
                </Link>
              </li>
            </ul>
          </div>

          {/* Craft & Stories */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-turmeric font-semibold mb-4">
              Artisanship &amp; House
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory-200/80">
              <li>
                <Link href="/story" className="hover:text-terracotta transition-colors">
                  Our Genesis &amp; Ethos
                </Link>
              </li>
              <li>
                <Link href="/patterns" className="hover:text-terracotta transition-colors">
                  The Art of Patterns
                </Link>
              </li>
              <li>
                <Link href="/craft" className="hover:text-terracotta transition-colors">
                  The Regional Crafts &amp; Loom
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="hover:text-terracotta transition-colors">
                  Master Artisan Collective
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-terracotta transition-colors">
                  Textile Care &amp; Journal
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="hover:text-terracotta transition-colors">
                  B2B Wholesale &amp; Exports
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-terracotta transition-colors">
                  Studio Visits &amp; Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-turmeric font-semibold mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory-200/80">
              <li>
                <Link href="/account" className="hover:text-terracotta transition-colors">
                  Account &amp; Order History
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-terracotta transition-colors">
                  Shipping &amp; Delivery Terms
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-terracotta transition-colors">
                  Artisanal Care &amp; Longevity
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="hover:text-terracotta transition-colors">
                  Custom &amp; Bulk Orders
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center space-x-1 text-[11px] text-ivory-200/50 hover:text-turmeric transition-colors"
                >
                  <ShieldCheck className="w-3 h-3 text-turmeric" />
                  <span>Curator Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ivory-200/50 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Tantukala Designs. Handcrafted with reverence in India.
          </p>
          <div className="flex items-center space-x-6">
            <span>Authentic Indian Handloom</span>
            <span>•</span>
            <span>Natural Fibers Only</span>
            <span>•</span>
            <span>Direct Artisan Empowerment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
