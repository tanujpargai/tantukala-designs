'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { store } from '@/lib/store';

export default function JournalPage() {
  const posts = store.getJournalPosts();

  return (
    <div className="py-14 sm:py-24 bg-ivory-100 min-h-screen">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-2">
            The Textile Chronicle
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-charcoal">
            The Tantukala Journal
          </h1>
          <p className="text-sm text-charcoal/70 mt-3 font-light leading-relaxed">
            Essays on Indian textile anthropology, organic pigment chemistry, and conversations from the weaving loom.
          </p>
        </div>

        {/* Featured Main Post (First item) */}
        {posts[0] && (
          <div className="bg-ivory-50 rounded-3xl border border-parchment overflow-hidden shadow-craft mb-16 grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] lg:h-[450px] bg-parchment">
              <Image
                src={posts[0].coverImage}
                alt={posts[0].title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-12 space-y-4">
              <div className="flex items-center space-x-2 text-xs text-terracotta font-semibold uppercase tracking-wider">
                <span>{posts[0].category}</span>
                <span>•</span>
                <span className="flex items-center space-x-1 text-charcoal/50">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{posts[0].readingTime}</span>
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium">
                <Link href={`/journal/${posts[0].slug}`} className="hover:text-terracotta transition-colors">
                  {posts[0].title}
                </Link>
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light">
                {posts[0].excerpt}
              </p>
              <div className="pt-2">
                <Link
                  href={`/journal/${posts[0].slug}`}
                  className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-terracotta transition-colors"
                >
                  <span>Read Essay</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.slice(1).map((post) => (
            <div
              key={post.id}
              className="bg-ivory-50 rounded-3xl border border-parchment overflow-hidden shadow-craft flex flex-col group"
            >
              <div className="relative aspect-[16/10] bg-parchment overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs text-terracotta font-semibold uppercase tracking-wider mb-2">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span className="text-charcoal/50">{post.readingTime}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-medium group-hover:text-terracotta transition-colors">
                    <Link href={`/journal/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-charcoal/70 mt-2 font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <div className="pt-4 border-t border-parchment">
                  <Link
                    href={`/journal/${post.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-charcoal group-hover:text-terracotta transition-colors"
                  >
                    <span>Read Essay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
