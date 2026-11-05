'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Layers, Plus, Edit2, Eye, Sparkles } from 'lucide-react';
import { store } from '@/lib/store';
import { Collection } from '@/types';

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    setCollections(store.getCollections());
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-terracotta font-semibold">
            Curatorial Storytelling
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mt-1">
            Collections &amp; Capsules ({collections.length})
          </h1>
        </div>
      </div>

      {/* Grid of collections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((col) => (
          <div
            key={col.id}
            className="bg-ivory-50 rounded-3xl border border-parchment p-6 shadow-craft space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-parchment border border-parchment">
                <Image src={col.imageUrl} alt={col.title} fill className="object-cover" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-terracotta font-bold">
                  {col.subtitle}
                </span>
                <h3 className="font-serif text-xl font-medium text-charcoal">{col.title}</h3>
                <p className="text-xs text-charcoal/70 mt-1 leading-relaxed font-light">
                  {col.editorialStory}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-parchment flex items-center justify-between text-xs">
              <Link
                href={`/collections/${col.slug}`}
                target="_blank"
                className="text-terracotta font-semibold hover:underline flex items-center space-x-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Live Capsule</span>
              </Link>
              <span className="text-charcoal/50 text-[11px]">Slug: /{col.slug}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
