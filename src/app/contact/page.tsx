'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, HelpCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Craft Inquiry',
    message: '',
  });

  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: 'General Craft Inquiry', message: '' });
    }, 2000);
  };

  const faqs = [
    {
      q: 'How do I care for my hand-embroidered Sujni or Kantha silk?',
      a: 'We recommend professional dry cleaning for all wild Tussar silks and hand-stitched pieces. Always store wrapped in unbleached breathable muslin away from direct sunlight.',
    },
    {
      q: 'Are Tantukala products authentic handloom certified?',
      a: 'Yes. Every handloom creation carries tested natural fiber assurances and our studio seal of authenticity indicating artisan cooperative provenance.',
    },
    {
      q: 'Do you ship internationally?',
      a: 'Yes, we ship globally via express insured air courier. International delivery typically takes 6 to 10 business days.',
    },
    {
      q: 'Can I commission a custom Madhubani panel or specific colorway?',
      a: 'Yes, our master artists accept limited bespoke commissions throughout the year. Please contact us via this form or through our wholesale desk.',
    },
  ];

  return (
    <div className="py-14 sm:py-24 bg-ivory-100 min-h-screen">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-2">
            Atelier &amp; Client Services
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-charcoal">
            Connect with Tantukala
          </h1>
          <p className="text-sm text-charcoal/70 mt-3 font-light leading-relaxed">
            Whether inquiring about a specific weave, arranging a private studio appointment, or exploring custom heirloom commissions, our curatorial team is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Left Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-ivory-50 rounded-3xl border border-parchment p-8 shadow-craft space-y-6">
              <h3 className="font-serif text-2xl text-charcoal font-medium">Studio Information</h3>

              <div className="space-y-4 text-xs sm:text-sm text-charcoal/80">
                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-terracotta flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block text-charcoal font-medium">Concierge Telephone</strong>
                    <a href="tel:+919319927100" className="hover:text-terracotta transition-colors">
                      +91 93199 27100
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-terracotta flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block text-charcoal font-medium">Electronic Inquiries</strong>
                    <a href="mailto:care@tantukaladesigns.com" className="hover:text-terracotta transition-colors">
                      care@tantukaladesigns.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-terracotta flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block text-charcoal font-medium">Studio Working Hours</strong>
                    <span>Monday &ndash; Saturday: 10:00 AM &ndash; 7:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-terracotta flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block text-charcoal font-medium">Artisan Centers</strong>
                    <p className="text-charcoal/70 mt-0.5">
                      • Mithila Painting Atelier: Jitwarpur, Madhubani, Bihar<br />
                      • Weaving &amp; Block Center: Bhujodi &amp; Dhamadka, Kutch, Gujarat<br />
                      • Design Studio: Gandhinagar, Gujarat 392007
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form (7 cols) */}
          <div className="lg:col-span-7 bg-ivory-50 rounded-3xl border border-parchment p-8 sm:p-10 shadow-craft">
            {isSent ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-forest mx-auto" />
                <h3 className="font-serif text-2xl text-charcoal font-medium">Message Received</h3>
                <p className="text-xs text-charcoal/70 max-w-sm mx-auto">
                  Thank you for reaching out to Tantukala Designs. Our curatorial specialist will respond within 24 hours.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-4 px-6 py-2 rounded-full border border-parchment text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-2xl text-charcoal font-medium mb-2">
                  Send a Note to Our Curators
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                    >
                      <option>General Craft Inquiry</option>
                      <option>Product &amp; Loom Availability</option>
                      <option>Custom Commission</option>
                      <option>Press &amp; Exhibition</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-terracotta text-white font-semibold text-xs uppercase tracking-[0.2em] hover:bg-terracotta-dark transition-all flex items-center justify-center space-x-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-ivory-50 rounded-3xl border border-parchment p-8 sm:p-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-1">
              Frequently Addressed Questions
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium">
              Artisanal Care &amp; Ordering
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-parchment space-y-2">
                <h4 className="font-serif text-sm font-semibold text-charcoal">{faq.q}</h4>
                <p className="text-xs text-charcoal/70 leading-relaxed font-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
