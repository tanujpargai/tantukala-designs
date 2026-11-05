'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Eye, Info, Palette, Compass, ArrowRight } from 'lucide-react';

interface PatternData {
  id: string;
  name: string;
  regionalOrigin: string;
  centuryOrigin: string;
  symbolism: string;
  pigmentRecipe: string;
  lineworkTechnique: string;
  quote: string;
  diagramSvg: React.ReactNode;
}

export const PatternExhibition: React.FC = () => {
  const [activePatternIndex, setActivePatternIndex] = useState(0);

  const patterns: PatternData[] = [
    {
      id: 'matsya',
      name: 'Matsya (The Sacred Fish & Lotus)',
      regionalOrigin: 'Mithila Region, Northern Bihar',
      centuryOrigin: 'Vedic Antiquity & Tantric Folk Lineage',
      symbolism: 'Cosmic fertility, fluid adaptation, riverine abundance, and matrimonial harmony.',
      pigmentRecipe: 'Lampblack soot (Kajal) mixed with acacia gum, palash flower yellow, and crushed betel leaves.',
      lineworkTechnique: 'Kachni (fine double contour lines filled with micro-fine parallel cross-hatching done with wild bamboo twigs).',
      quote: 'The fish swims where water gives life; the lotus rises pure above the mire. In Mithila art, they form the primordial dance of balance.',
      diagramSvg: (
        <svg viewBox="0 0 400 300" className="w-full h-full text-indigo">
          {/* Decorative frame */}
          <rect x="10" y="10" width="380" height="280" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.3" />
          <rect x="20" y="20" width="360" height="260" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          
          {/* Sacred Lotus */}
          <path d="M200 90 C180 50, 160 80, 200 130 C240 80, 220 50, 200 90 Z" fill="none" stroke="#B65C43" strokeWidth="2" />
          <path d="M175 110 C140 80, 130 110, 190 140 C190 140, 160 120, 175 110 Z" fill="none" stroke="#B65C43" strokeWidth="1.5" />
          <path d="M225 110 C260 80, 270 110, 210 140 C210 140, 240 120, 225 110 Z" fill="none" stroke="#B65C43" strokeWidth="1.5" />
          
          {/* Twin Sacred Fish (Matsya Yugma) */}
          <g transform="translate(140, 170)">
            {/* Fish 1 */}
            <path d="M0 20 C20 -5, 60 -5, 80 20 C60 45, 20 45, 0 20 Z" fill="none" stroke="#24364A" strokeWidth="2" />
            <path d="M80 20 L105 5 L95 20 L105 35 Z" fill="none" stroke="#24364A" strokeWidth="2" />
            {/* Fish scales cross-hatching */}
            <path d="M25 10 C35 25, 45 25, 55 10" fill="none" stroke="#D5A449" strokeWidth="1.2" />
            <path d="M35 15 C45 30, 55 30, 65 15" fill="none" stroke="#D5A449" strokeWidth="1.2" />
            <circle cx="15" cy="18" r="2.5" fill="#24364A" />
          </g>

          <g transform="translate(180, 215) scale(0.9)">
            {/* Fish 2 swimming counter */}
            <path d="M80 20 C60 -5, 20 -5, 0 20 C20 45, 60 45, 80 20 Z" fill="none" stroke="#24364A" strokeWidth="2" />
            <path d="M0 20 L-25 5 L-15 20 L-25 35 Z" fill="none" stroke="#24364A" strokeWidth="2" />
            <path d="M55 10 C45 25, 35 25, 25 10" fill="none" stroke="#D5A449" strokeWidth="1.2" />
            <circle cx="65" cy="18" r="2.5" fill="#24364A" />
          </g>

          {/* Water ripples and seed dots */}
          <path d="M50 250 Q100 240 150 250 T250 250 T350 250" fill="none" stroke="#435847" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M60 265 Q110 255 160 265 T260 265 T360 265" fill="none" stroke="#435847" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      ),
    },
    {
      id: 'sujni',
      name: 'The Narrative Running Ripple',
      regionalOrigin: 'Muzaffarpur & Madhubani, Bihar',
      centuryOrigin: '18th Century Matrilineal Textile Craft',
      symbolism: 'Maternal protection, life passage blessings, everyday poetic village memory.',
      pigmentRecipe: 'Naturally dyed mulberry silk floss threads and indigo-dipped cotton.',
      lineworkTechnique: 'Dense micro-running stitches rippling across layered tussar, creating embossed relief shadows.',
      quote: 'When the needle enters the fabric, it binds the generations together. The stitch is small, but its journey spans a century.',
      diagramSvg: (
        <svg viewBox="0 0 400 300" className="w-full h-full text-terracotta">
          <rect x="20" y="20" width="360" height="260" fill="none" stroke="#E9DFCB" strokeWidth="2" />
          {/* Wavy Running Stitches */}
          {[50, 75, 100, 125, 150, 175, 200, 225, 250].map((y, idx) => (
            <path
              key={idx}
              d={`M40 ${y} Q120 ${y - 12} 200 ${y} T360 ${y}`}
              fill="none"
              stroke={idx % 2 === 0 ? '#B65C43' : '#D5A449'}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
          ))}
          {/* Central Motif: Village Bird in Silhouette */}
          <g transform="translate(160, 110)">
            <path d="M10 50 C20 20, 50 15, 70 35 C85 45, 75 60, 60 65 C40 70, 20 60, 10 50 Z" fill="none" stroke="#24364A" strokeWidth="2.5" />
            <path d="M70 35 L85 30 L75 42" fill="none" stroke="#24364A" strokeWidth="2" />
            <path d="M30 45 C35 35, 45 35, 50 45" fill="none" stroke="#B65C43" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="65" cy="38" r="2" fill="#24364A" />
          </g>
        </svg>
      ),
    },
    {
      id: 'rabari',
      name: 'The Mirrored Shisha Mandala',
      regionalOrigin: 'Bhujodi & Nakhatrana, Kutch, Gujarat',
      centuryOrigin: 'Pastoral Nomadic Lineage of the Thar Desert',
      symbolism: 'Deflection of negative gaze, sun reflections across salt flats, nomadic tribal heraldry.',
      pigmentRecipe: 'Mineral rust black, wild madder root (alizarin), and convex blown-glass mirrors.',
      lineworkTechnique: 'Interlocking chain stitch and reinforced buttonhole stitch anchoring real micro-mirrors.',
      quote: 'A mirror in the desert catches the midday sun so that you may never be lost in the vast horizon.',
      diagramSvg: (
        <svg viewBox="0 0 400 300" className="w-full h-full text-indigo">
          <rect x="20" y="20" width="360" height="260" fill="none" stroke="#24221F" strokeWidth="1" />
          {/* Central Mirrored Medallion */}
          <circle cx="200" cy="150" r="45" fill="none" stroke="#B65C43" strokeWidth="3" />
          <circle cx="200" cy="150" r="35" fill="#FAF6EE" stroke="#D5A449" strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx="200" cy="150" r="22" fill="#F5F0E6" stroke="#24364A" strokeWidth="2" />
          {/* Reflection highlights */}
          <path d="M190 140 Q200 135 210 145" fill="none" stroke="#D5A449" strokeWidth="2" />
          
          {/* 8 Radial Petals with Mirrors */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <g key={i} transform={`translate(200, 150) rotate(${angle}) translate(0, -75)`}>
              <path d="M-12 0 C-15 -18, 15 -18, 12 0 Z" fill="none" stroke="#24364A" strokeWidth="2" />
              <circle cx="0" cy="-8" r="5" fill="#FAF6EE" stroke="#B65C43" strokeWidth="1.5" />
            </g>
          ))}
          {/* Geometric border */}
          <path d="M40 40 L360 40 L360 260 L40 260 Z" fill="none" stroke="#435847" strokeWidth="1" strokeDasharray="8 6" />
        </svg>
      ),
    },
    {
      id: 'bela',
      name: 'The Teakwood Matrix',
      regionalOrigin: 'Dhamadka & Anjar, Kutch, Gujarat',
      centuryOrigin: '17th Century Khatri Heritage',
      symbolism: 'Interlocking geometry of the cosmos, rhythm of artisan breath, earth-water equilibrium.',
      pigmentRecipe: 'River clay silt (Dhabu resist), fermented iron scrap and jaggery liquor, natural indigo.',
      lineworkTechnique: 'High-relief teakwood hand-carved matrix pressed with rhythmic manual strike.',
      quote: 'The block is carved once, but in the hands of the printer, it creates an infinite garden.',
      diagramSvg: (
        <svg viewBox="0 0 400 300" className="w-full h-full text-forest">
          {/* Geometric Repeat Grid */}
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3].map((col) => {
              const x = 50 + col * 80;
              const y = 45 + row * 80;
              return (
                <g key={`${row}-${col}`} transform={`translate(${x}, ${y})`}>
                  <rect x="0" y="0" width="60" height="60" fill="none" stroke="#435847" strokeWidth="1.5" />
                  <circle cx="30" cy="30" r="18" fill="none" stroke="#B65C43" strokeWidth="1.5" />
                  <path d="M30 12 L30 48 M12 30 L48 30" stroke="#D5A449" strokeWidth="1.2" />
                  <circle cx="30" cy="30" r="4" fill="#24364A" />
                </g>
              );
            })
          )}
        </svg>
      ),
    },
  ];

  const current = patterns[activePatternIndex];

  return (
    <section className="py-24 sm:py-32 bg-charcoal text-ivory-100 overflow-hidden relative">
      {/* Decorative background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-deep/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-ivory-100/10 border border-ivory-100/20 backdrop-blur-md mb-4">
            <Sparkles className="w-3.5 h-3.5 text-turmeric" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-turmeric">
              Interactive Curatorial Archive
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-ivory-50 tracking-tight">
            The Art of Patterns
          </h2>
          <p className="text-sm sm:text-base text-ivory-200/70 mt-3 font-light leading-relaxed">
            Indian motifs are not merely decorative flourishes; they are visual treatises encoding Vedic astronomy, river ecology, and community identity.
          </p>
        </div>

        {/* Pattern Selectors */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {patterns.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActivePatternIndex(idx)}
              className={`text-xs px-5 py-3 rounded-full uppercase tracking-wider font-semibold transition-all ${
                activePatternIndex === idx
                  ? 'bg-terracotta text-white shadow-lg scale-105'
                  : 'bg-charcoal-dark border border-charcoal-muted text-ivory-200/70 hover:text-white hover:border-ivory-200/40'
              }`}
            >
              {p.name.split(' (')[0]}
            </button>
          ))}
        </div>

        {/* Exhibition Display Showcase */}
        <div className="bg-charcoal-dark border border-charcoal-muted/60 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: SVG Diagram Canvas */}
            <div className="lg:col-span-6 bg-ivory-50 rounded-2xl p-6 sm:p-8 flex items-center justify-center border border-parchment shadow-inner relative group">
              <div className="w-full aspect-[4/3] max-w-md mx-auto">
                {current.diagramSvg}
              </div>
              <div className="absolute bottom-3 right-4 text-[10px] uppercase tracking-widest text-charcoal/50 font-mono">
                Plate 0{activePatternIndex + 1} • Archive Provenance
              </div>
            </div>

            {/* Right: Curatorial Breakdown */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-turmeric font-semibold block mb-1">
                  {current.regionalOrigin} • {current.centuryOrigin}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 font-medium">
                  {current.name}
                </h3>
              </div>

              {/* Quote */}
              <blockquote className="text-sm italic text-ivory-200/80 border-l-2 border-turmeric/60 pl-4 py-1 leading-relaxed">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              {/* Technical Specifications */}
              <div className="space-y-4 pt-4 border-t border-charcoal-muted/60 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-turmeric font-bold block mb-1">
                    Symbolic &amp; Cultural Meaning
                  </span>
                  <p className="text-ivory-200/80 leading-relaxed">{current.symbolism}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-turmeric font-bold block mb-1">
                    Natural Pigment &amp; Material Chemistry
                  </span>
                  <p className="text-ivory-200/80 leading-relaxed">{current.pigmentRecipe}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-turmeric font-bold block mb-1">
                    Tacit Needle &amp; Pen Discipline
                  </span>
                  <p className="text-ivory-200/80 leading-relaxed">{current.lineworkTechnique}</p>
                </div>
              </div>

              {/* Explore craft link */}
              <div className="pt-2">
                <Link
                  href="/craft"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-terracotta hover:text-turmeric transition-colors group"
                >
                  <span>Explore Regional Craft Documentation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
