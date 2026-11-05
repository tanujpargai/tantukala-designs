'use client';

import React, { useState, useEffect } from 'react';
import { Save, Sparkles, Check, FileEdit } from 'lucide-react';
import { store } from '@/lib/store';
import { SiteSettings } from '@/types';

export default function AdminContentPage() {
  const [settings, setSettings] = useState<SiteSettings>(store.getSettings());
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setSettings(store.getSettings());
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
          Curatorial Content Management
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mt-1">
          Storefront Copy &amp; Announcements
        </h1>
        <p className="text-xs text-charcoal/60 mt-1">
          Modify top announcements, hero taglines, and client support coordinates without editing source code.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-ivory-50 rounded-3xl border border-parchment p-6 sm:p-10 shadow-craft space-y-6 text-xs">
        {/* Top Banner Announcement */}
        <div className="space-y-3 pb-6 border-b border-parchment">
          <h3 className="font-serif text-base font-semibold text-charcoal flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-terracotta" />
            <span>Header Top Announcement Bar</span>
          </h3>

          <div className="flex items-center space-x-3 mb-2">
            <label className="flex items-center space-x-2 cursor-pointer font-medium text-charcoal">
              <input
                type="checkbox"
                checked={settings.announcementActive}
                onChange={(e) =>
                  setSettings({ ...settings, announcementActive: e.target.checked })
                }
                className="rounded text-terracotta focus:ring-terracotta"
              />
              <span>Display Announcement Bar across all pages</span>
            </label>
          </div>

          <div>
            <label className="block font-semibold text-charcoal mb-1">
              Announcement Message
            </label>
            <input
              type="text"
              value={settings.announcementText}
              onChange={(e) =>
                setSettings({ ...settings, announcementText: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
            />
          </div>
        </div>

        {/* Brand Tagline & Ethos */}
        <div className="space-y-4 pb-6 border-b border-parchment">
          <h3 className="font-serif text-base font-semibold text-charcoal">
            Brand Identity &amp; Editorial Taglines
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-charcoal mb-1">Brand Name</label>
              <input
                type="text"
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
              />
            </div>
            <div>
              <label className="block font-semibold text-charcoal mb-1">Primary Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>
        </div>

        {/* Support Coordinates */}
        <div className="space-y-4">
          <h3 className="font-serif text-base font-semibold text-charcoal">
            Studio Client Concierge
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-charcoal mb-1">Support Telephone</label>
              <input
                type="text"
                value={settings.supportPhone}
                onChange={(e) =>
                  setSettings({ ...settings, supportPhone: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
              />
            </div>
            <div>
              <label className="block font-semibold text-charcoal mb-1">Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) =>
                  setSettings({ ...settings, supportEmail: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-parchment focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center space-x-3">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-terracotta text-white font-semibold uppercase tracking-wider text-xs hover:bg-terracotta-dark transition-colors flex items-center space-x-2 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Storefront Content</span>
          </button>
          {isSaved && (
            <span className="text-forest font-semibold flex items-center space-x-1">
              <Check className="w-4 h-4" />
              <span>Published live to store!</span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
