'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RefreshCw, CreditCard, Phone, CheckCircle2 } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Handloom & Silk Mark Certified',
      desc: 'Every piece is certified authentic. Zero synthetic polyester, tested pure wild silk, and certified hand-spun cotton fibers.',
    },
    {
      icon: Truck,
      title: 'Insured Global & Pan-India Transit',
      desc: 'Complimentary shipping across India on orders above ₹4,999. Tamper-evident archival packing and full insurance on fine art rolls.',
    },
    {
      icon: RefreshCw,
      title: 'Artisanal Care & Fair Exchange',
      desc: '7-day seamless return window for unworn textiles and art panels. Lifelong textile care, washing, and restoration counsel.',
    },
    {
      icon: CreditCard,
      title: 'Encrypted Razorpay Checkout',
      desc: 'PCI-DSS Level 1 compliant payments supporting UPI (Google Pay, PhonePe), all Indian Credit/Debit cards, NetBanking & international cards.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-ivory-50 border-b border-parchment">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-2">
            The Tantukala Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal">
            Integrity, Authenticity &amp; Care
          </h2>
          <p className="text-sm text-charcoal/70 mt-2 font-light leading-relaxed">
            Our commitment to the integrity of the Indian artisan and the complete confidence of the textile connoisseur.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-ivory-100/70 p-6 sm:p-7 rounded-2xl border border-parchment flex flex-col justify-between hover:border-terracotta/40 transition-colors"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-charcoal mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Strip */}
        <div className="mt-14 p-6 bg-parchment/40 rounded-2xl border border-parchment flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal">
          <div className="flex items-center space-x-2 text-center sm:text-left">
            <Phone className="w-4 h-4 text-terracotta flex-shrink-0" />
            <span>
              Have inquiries regarding a specific loom weave, framing, or custom commission?
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <a
              href="tel:+919319927100"
              className="px-4 py-2 rounded-xl bg-charcoal text-white hover:bg-terracotta transition-colors font-medium text-xs whitespace-nowrap"
            >
              Call +91 93199 27100
            </a>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl border border-parchment bg-white hover:bg-parchment/60 transition-colors font-medium text-xs whitespace-nowrap"
            >
              Contact Studio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
