'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, CheckCircle2, ShieldCheck, FileText, ArrowRight, Sparkles, Send } from 'lucide-react';
import { store } from '@/lib/store';

export default function WholesalePage() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    businessType: 'Boutique Retailer',
    country: 'India',
    city: '',
    taxId: '',
    estimatedQuantity: '25 – 50 units',
    productInterests: [] as string[],
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const interestOptions = [
    'Madhubani Art Panels & Framed Works',
    'Heritage Handloom Sarees (Tussar, Chanderi, Kantha)',
    'Artisanal Stoles & Shawls (Sujni, Rabari, Jat)',
    'Living & Hospitality Linens (Bela Block Prints, Runners, Throws)',
    'Bespoke Guild Commission / Custom Colorways',
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.productInterests.includes(interest);
      if (exists) {
        return { ...prev, productInterests: prev.productInterests.filter((i) => i !== interest) };
      } else {
        return { ...prev, productInterests: [...prev.productInterests, interest] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      store.createWholesaleEnquiry({
        businessName: formData.businessName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        businessType: formData.businessType,
        country: formData.country,
        city: formData.city,
        taxId: formData.taxId,
        estimatedQuantity: formData.estimatedQuantity,
        productInterests: formData.productInterests,
        message: formData.message,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div className="py-14 sm:py-24 bg-ivory-100 min-h-screen">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-2">
            Institutional, Boutique &amp; Trade Partnerships
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-charcoal">
            Wholesale &amp; Bespoke Curation
          </h1>
          <p className="text-sm text-charcoal/70 mt-3 font-light leading-relaxed">
            Partner with Tantukala Designs to bring verified Indian handloom textiles and museum-grade folk art to your retail boutique, interior design firm, or luxury hospitality property.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Value Proposition for Retailers (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-ivory-50 rounded-3xl border border-parchment p-8 shadow-craft space-y-6">
              <h3 className="font-serif text-2xl text-charcoal font-medium">
                Why Partner with Tantukala?
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-charcoal/80 leading-relaxed font-light">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-medium text-charcoal block">Direct Loom-to-Store Traceability</strong>
                    Zero middlemen. Each wholesale consignment is accompanied by artisan community certificates and provenance dossiers.
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-medium text-charcoal block">Bespoke Architectural Customization</strong>
                    We develop custom dimensions, natural pigment palettes, and loom runs tailored to corporate lobbies, private residences, and hotel suites.
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-medium text-charcoal block">Export-Grade Packing &amp; Documentation</strong>
                    We handle air/sea cargo crating, international phytosanitary and silk certificates, and worldwide door-to-door transit.
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-medium text-charcoal block">Tiered Wholesale Commercials</strong>
                    Transparent volume-based pricing structure reserved exclusively for verified trade buyers.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-parchment text-xs text-charcoal/60 space-y-1">
                <p><strong>Trade Inquiries Hotline:</strong> +91 93199 27100</p>
                <p><strong>Wholesale Desk:</strong> wholesale@tantukaladesigns.com</p>
              </div>
            </div>
          </div>

          {/* Right: Wholesale Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-ivory-50 rounded-3xl border border-parchment p-8 sm:p-10 shadow-craft">
            {isSuccess ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-forest/10 text-forest flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-charcoal font-medium">
                  Wholesale Dossier Initiated
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/70 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.contactPerson}</strong>. Our institutional trade director will review your enterprise details and transmit our confidential wholesale lookbook and pricing sheet within 24 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        businessName: '',
                        contactPerson: '',
                        email: '',
                        phone: '',
                        businessType: 'Boutique Retailer',
                        country: 'India',
                        city: '',
                        taxId: '',
                        estimatedQuantity: '25 – 50 units',
                        productInterests: [],
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full border border-parchment bg-white text-xs uppercase tracking-widest font-semibold hover:bg-parchment transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-charcoal font-medium">
                    Commercial Partnership Inquiry
                  </h3>
                  <p className="text-xs text-charcoal/60 mt-1">
                    Please provide your business credentials to request wholesale catalog access.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      Business / Enterprise Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="e.g. Virasat Luxury Concept Store"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      Primary Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="e.g. Sanjana Mehra"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="buyer@yourcompany.com"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      Phone / WhatsApp (with Country Code) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98102 77811"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      Business Classification
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                    >
                      <option>Boutique Retailer</option>
                      <option>Multi-brand Concept Store</option>
                      <option>Interior Architecture Firm</option>
                      <option>Luxury Hotel / Hospitality Resort</option>
                      <option>Art Gallery / Museum Shop</option>
                      <option>International Importer / Distributor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      Country &amp; Base City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. New Delhi, India"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      GSTIN / Business Tax ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.taxId}
                      onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                      placeholder="e.g. 07AAACV9812K1Z9"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      Estimated Order Volume
                    </label>
                    <select
                      value={formData.estimatedQuantity}
                      onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                    >
                      <option>10 – 25 units (Trial Batch)</option>
                      <option>25 – 50 units</option>
                      <option>50 – 100 units</option>
                      <option>100 – 250 units</option>
                      <option>250+ units (Annual Guild Contract)</option>
                    </select>
                  </div>
                </div>

                {/* Product Interests */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-2">
                    Select Handloom Disciplines of Interest:
                  </label>
                  <div className="space-y-2">
                    {interestOptions.map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center space-x-2 text-xs text-charcoal/80 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.productInterests.includes(opt)}
                          onChange={() => handleInterestToggle(opt)}
                          className="rounded border-parchment text-terracotta focus:ring-terracotta"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Specific Project Requirements / Custom Specifications
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your brand aesthetic, expected delivery timeframe, and target collection..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-terracotta text-white font-semibold text-xs uppercase tracking-[0.2em] hover:bg-terracotta-dark transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting Enquiry...' : 'Submit Wholesale Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
