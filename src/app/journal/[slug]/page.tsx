'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Share2, Sparkles } from 'lucide-react';
import { store } from '@/lib/store';

export default function SingleJournalPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const post = store.getJournalBySlug(slug);

  if (!post) {
    return (
      <div className="py-32 text-center bg-ivory-100 min-h-screen">
        <h2 className="font-serif text-2xl text-charcoal">Essay not found</h2>
        <p className="text-xs text-charcoal/60 mt-2 mb-6">The requested journal entry could not be found.</p>
        <Link
          href="/journal"
          className="px-6 py-2.5 rounded-full bg-charcoal text-white text-xs uppercase tracking-widest"
        >
          View All Journal Essays
        </Link>
      </div>
    );
  }

  const otherPosts = store.getJournalPosts().filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="py-12 sm:py-20 bg-ivory-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/journal"
          className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-charcoal/60 hover:text-terracotta mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 text-xs text-terracotta font-semibold uppercase tracking-wider">
            <span>{post.category}</span>
            <span>•</span>
            <span className="flex items-center space-x-1 text-charcoal/60">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readingTime}</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-charcoal leading-[1.15]">
            {post.title}
          </h1>

          <div className="flex items-center space-x-4 text-xs text-charcoal/60 pt-2 border-t border-parchment">
            <span>Published by {post.author}</span>
            <span>•</span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-craft border border-parchment bg-parchment mb-12">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        {/* Content Body */}
        <article className="prose prose-stone max-w-none text-charcoal/80 text-sm sm:text-base leading-relaxed space-y-6 font-light">
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="font-serif text-2xl font-medium text-charcoal pt-4">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </article>

        {/* Author Bio Box */}
        <div className="mt-14 p-6 sm:p-8 bg-ivory-50 rounded-2xl border border-parchment flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-charcoal text-ivory-50 font-serif font-bold text-lg flex items-center justify-center flex-shrink-0">
            T
          </div>
          <div className="text-xs">
            <h4 className="font-serif text-sm font-semibold text-charcoal">
              The Tantukala Curatorial Team
            </h4>
            <p className="text-charcoal/70 mt-1">
              Documenting regional Indian weaving lineages, textile anthropology, and master artisan oral histories across Mithila, Kutch, and Bengal.
            </p>
          </div>
        </div>

        {/* Other Reading */}
        {otherPosts.length > 0 && (
          <div className="mt-20 pt-10 border-t border-parchment">
            <h3 className="font-serif text-2xl text-charcoal font-medium mb-6">
              More Essays from the Archive
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherPosts.map((p) => (
                <Link
                  key={p.id}
                  href={`/journal/${p.slug}`}
                  className="p-5 rounded-2xl bg-ivory-50 border border-parchment hover:border-terracotta transition-colors group block"
                >
                  <span className="text-[10px] uppercase tracking-wider text-terracotta font-semibold block mb-1">
                    {p.category}
                  </span>
                  <h4 className="font-serif text-base font-medium text-charcoal group-hover:text-terracotta transition-colors line-clamp-2">
                    {p.title}
                  </h4>
                  <p className="text-xs text-charcoal/60 mt-1 line-clamp-2">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
