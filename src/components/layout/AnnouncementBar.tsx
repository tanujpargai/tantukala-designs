'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Phone, Mail, Building2 } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-indigo-deep text-ivory-100 text-[11px] sm:text-xs py-2 px-4 border-b border-indigo-light/30">
      <div className="max-w-[1520px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4 px-2 sm:px-4">
        {/* Left: Contact & Studio Info */}
        <div className="hidden md:flex items-center space-x-4 text-ivory-200/80">
          <a
            href="tel:+919319927100"
            className="flex items-center space-x-1.5 hover:text-turmeric transition-colors"
          >
            <Phone className="w-3 h-3 text-turmeric" />
            <span>+91 93199 27100</span>
          </a>
          <span className="text-indigo-light">•</span>
          <a
            href="mailto:care@tantukaladesigns.com"
            className="flex items-center space-x-1.5 hover:text-turmeric transition-colors"
          >
            <Mail className="w-3 h-3 text-turmeric" />
            <span>care@tantukaladesigns.com</span>
          </a>
        </div>

        {/* Center: Heritage message */}
        <div className="flex items-center space-x-2 text-center font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-turmeric animate-pulse flex-shrink-0" />
          <span>Complimentary Pan-India Shipping on Curated Orders Above ₹4,999</span>
        </div>

        {/* Right: B2B Wholesale & Admin quick link */}
        <div className="flex items-center space-x-4 text-ivory-200/90 font-medium">
          <Link
            href="/wholesale"
            className="flex items-center space-x-1 hover:text-turmeric transition-colors"
          >
            <Building2 className="w-3 h-3 text-turmeric" />
            <span>B2B / Wholesale</span>
          </Link>
          <span className="text-indigo-light">•</span>
          <span className="text-turmeric-light font-semibold">INR (₹)</span>
        </div>
      </div>
    </div>
  );
};
