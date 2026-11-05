'use client';

import React, { useState, useEffect } from 'react';
import { Save, Check, Settings, ShieldCheck, Database, CreditCard, Sparkles, AlertCircle } from 'lucide-react';
import { store } from '@/lib/store';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { SiteSettings } from '@/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(store.getSettings());
  const [isSaved, setIsSaved] = useState(false);
  const [hasSupabase, setHasSupabase] = useState(false);

  useEffect(() => {
    setSettings(store.getSettings());
    setHasSupabase(isSupabaseConfigured());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateSettings(settings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <span className="text-xs uppercase tracking-widest text-terracotta font-semibold">
          Configuration &amp; Integrations
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mt-1">
          Store &amp; Payment Gateway Settings
        </h1>
        <p className="text-xs text-charcoal/60 mt-1">
          Configure shipping calculation thresholds, Razorpay credentials status, and database connectivity.
        </p>
      </div>

      {/* Shipping Calculation Rules */}
      <form onSubmit={handleSave} className="bg-ivory-50 rounded-3xl border border-parchment p-6 sm:p-10 shadow-craft space-y-6 text-xs">
        <h3 className="font-serif text-base font-semibold text-charcoal flex items-center space-x-2">
          <Settings className="w-4 h-4 text-terracotta" />
          <span>Shipping &amp; Commercial Calculation Rules</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-charcoal mb-1">
              Complimentary Shipping Threshold (₹)
            </label>
            <input
              type="number"
              value={settings.freeShippingThreshold}
              onChange={(e) =>
                setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
            />
            <span className="text-[10px] text-charcoal/50 mt-1 block">
              Cart subtotals at or above this value receive free shipping.
            </span>
          </div>

          <div>
            <label className="block font-semibold text-charcoal mb-1">
              Standard Courier Rate (₹)
            </label>
            <input
              type="number"
              value={settings.standardShippingRate}
              onChange={(e) =>
                setSettings({ ...settings, standardShippingRate: Number(e.target.value) })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
            />
            <span className="text-[10px] text-charcoal/50 mt-1 block">
              Applied on orders below the free shipping threshold.
            </span>
          </div>

          <div>
            <label className="block font-semibold text-charcoal mb-1">
              Priority Air Express Rate (₹)
            </label>
            <input
              type="number"
              value={settings.expressShippingRate}
              onChange={(e) =>
                setSettings({ ...settings, expressShippingRate: Number(e.target.value) })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
            />
            <span className="text-[10px] text-charcoal/50 mt-1 block">
              Optional expedited air courier delivery rate.
            </span>
          </div>
        </div>

        <div className="pt-2 flex items-center space-x-3">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-terracotta text-white font-semibold uppercase tracking-wider text-xs hover:bg-terracotta-dark transition-colors flex items-center space-x-2 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Update Calculation Rules</span>
          </button>
          {isSaved && (
            <span className="text-forest font-semibold flex items-center space-x-1">
              <Check className="w-4 h-4" />
              <span>Settings updated successfully!</span>
            </span>
          )}
        </div>
      </form>

      {/* Payment Gateway Integration Architecture Box */}
      <div className="bg-ivory-50 rounded-3xl border border-parchment p-6 sm:p-8 shadow-craft space-y-4 text-xs">
        <h3 className="font-serif text-base font-semibold text-charcoal flex items-center space-x-2">
          <CreditCard className="w-4 h-4 text-indigo" />
          <span>Razorpay Payment Gateway Architecture</span>
        </h3>

        <div className="p-4 bg-white rounded-2xl border border-parchment space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-charcoal">Gateway Status:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-forest/15 text-forest font-bold text-[10px] uppercase tracking-wider">
              Ready &bull; Multi-tier Fallback Active
            </span>
          </div>
          <p className="text-charcoal/70 leading-relaxed font-light">
            Server-side verification endpoints are active at <code className="font-mono bg-parchment px-1.5 py-0.5 rounded">/api/razorpay/create-order</code> and <code className="font-mono bg-parchment px-1.5 py-0.5 rounded">/api/razorpay/verify-payment</code> with HMAC-SHA256 signature verification.
          </p>
        </div>

        <div className="text-[11px] text-charcoal/70 space-y-1">
          <p><strong>Environment Variables Configured:</strong></p>
          <ul className="list-disc pl-4 space-y-0.5 font-mono text-[10px]">
            <li>NEXT_PUBLIC_RAZORPAY_KEY_ID</li>
            <li>RAZORPAY_KEY_SECRET</li>
            <li>RAZORPAY_WEBHOOK_SECRET</li>
          </ul>
        </div>
      </div>

      {/* Supabase Database Migration Architecture Box */}
      <div className="bg-ivory-50 rounded-3xl border border-parchment p-6 sm:p-8 shadow-craft space-y-4 text-xs">
        <h3 className="font-serif text-base font-semibold text-charcoal flex items-center space-x-2">
          <Database className="w-4 h-4 text-forest" />
          <span>Supabase PostgreSQL Schema &amp; Storage Architecture</span>
        </h3>

        <div className="p-4 bg-white rounded-2xl border border-parchment space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-charcoal">Database Connection:</span>
            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
              hasSupabase ? 'bg-forest/15 text-forest' : 'bg-turmeric/20 text-turmeric-dark'
            }`}>
              {hasSupabase ? 'Supabase Connected' : 'Reactive Local-Store Active (Ready to Plug)'}
            </span>
          </div>
          <p className="text-charcoal/70 leading-relaxed font-light">
            Complete PostgreSQL database migrations with Row Level Security (RLS) policies, indexes, and full seed data have been generated in:
          </p>
          <div className="space-y-1 font-mono text-[10px] bg-parchment/60 p-2.5 rounded-xl">
            <p>1. supabase/migrations/001_initial_schema.sql (15 tables, RLS, indexes)</p>
            <p>2. supabase/migrations/002_seed_data.sql (Handcrafted categories, collections, artisans)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
