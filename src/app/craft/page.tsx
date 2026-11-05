'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Feather, Sparkles, Compass } from 'lucide-react';

export default function CraftPage() {
  const craftDisciplines = [
    {
      title: 'Sujni Needlework',
      region: 'Muzaffarpur & Madhubani, Bihar',
      era: 'Matrilineal Quilt Lineage',
      desc: 'Sujni is an extraordinary narrative embroidery tradition where thousands of fine running stitches ripple across layered tussar silks and fine muslin. Historically stitched by mothers to welcome newborns and narrate family oral history, each piece is an intimate textile diary.',
      materials: 'Natural tussar silk floss, vegetable-dyed cotton yarns, unbleached kora base.',
      image: '/images/sujni.avif',
      shopCategory: 'artisanal-dupattas-stoles',
    },
    {
      title: 'Madhubani Painting',
      region: 'Jitwarpur & Ranti, Mithila, Bihar',
      era: 'Antiquity & Sacred Rites',
      desc: 'Painted using fine bamboo nibs, crushed twigs, and natural mineral pigments on handmade paper and tussar silk scrolls. The two iconic styles — Kachni (fine parallel contour linework) and Bharni (saturated mineral color fills) — honor cosmological symbols such as the Tree of Life, Surya, and the Sacred Fish.',
      materials: 'Mustard lamp soot, palash flower yellows, madder red, acacia resin binder.',
      image: '/images/sujni.avif',
      shopCategory: 'madhubani-art-panels',
    },
    {
      title: 'Nomadic Rabari & Jat Mirrorwork',
      region: 'Bhujodi, Nakhatrana & Banni, Kutch, Gujarat',
      era: 'Pastoral Tribal Heraldry',
      desc: 'Carried through nomadic migrations across the Great Rann of Kutch, Rabari embroidery is defined by heavy buttonhole stitching anchoring genuine hand-cut glass mirrors. The mirrors reflect the desert sun and ward off malevolent spirits, while dense Jat cross-stitches encode ancestral star charts.',
      materials: 'Indigenous desi sheep wool, raw mulberry silk, hand-cut glass mirrors.',
      image: '/images/rabari.avif',
      shopCategory: 'artisanal-dupattas-stoles',
    },
    {
      title: 'Bela Teakwood Resist Block Print',
      region: 'Dhamadka & Anjar, Kutch, Gujarat',
      era: '17th Century Khatri Lineage',
      desc: 'One of India’s most endangered block-printing heritages. Heavy hand-carved teak blocks are dipped into organic mud resists (Dhabu) and stamped with rhythmic manual pressure. Dyed in fermented natural indigo vats and iron rust, the pattern emerges as crisp ivory against midnight indigo.',
      materials: 'Hand-carved teakwood blocks, wild river clay, fermented jaggery and iron liquor.',
      image: '/images/bela.avif',
      shopCategory: 'living-interior-textiles',
    },
    {
      title: 'Bengal Nakshi Kantha',
      region: 'Bolpur, Shantiniketan, West Bengal',
      era: 'Folk Bengal Quilting',
      desc: 'The poetic art of the running stitch. Muslin layers are bonded together with thousands of tiny, dense stitches that create the signature wavy rippled texture known as "Khet". Featuring lotus mandalas and ceremonial animal allegories drawn from rural Bengal mythology.',
      materials: 'Fine handloom cotton muslin, vegetable-dyed cotton floss.',
      image: '/images/kantha.avif',
      shopCategory: 'living-interior-textiles',
    },
  ];

  return (
    <div className="py-14 sm:py-24 bg-ivory-100 min-h-screen">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block mb-2">
            Living Intangible Heritage
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-charcoal">
            The Regional Crafts
          </h1>
          <p className="text-sm text-charcoal/70 mt-3 font-light leading-relaxed">
            Trace the Tacit Wisdom, Natural Dye Chemistry, and Generational Loom Traditions preserved in our atelier.
          </p>
        </div>

        {/* Craft Sections */}
        <div className="space-y-24">
          {craftDisciplines.map((craft, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <div
                key={craft.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Visual Image (6 Cols) */}
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-craft border border-parchment bg-parchment group">
                    <Image
                      src={craft.image}
                      alt={craft.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-sm text-ivory-50 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-semibold">
                      {craft.era}
                    </div>
                  </div>
                </div>

                {/* Narrative (6 Cols) */}
                <div
                  className={`lg:col-span-6 space-y-5 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 text-xs text-terracotta font-semibold uppercase tracking-wider">
                    <MapPin className="w-4 h-4" />
                    <span>{craft.region}</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium">
                    {craft.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-light">
                    {craft.desc}
                  </p>

                  <div className="p-4 bg-ivory-50 rounded-2xl border border-parchment text-xs text-charcoal/80 space-y-1">
                    <span className="font-bold text-charcoal block">Natural Materiality:</span>
                    <p className="text-charcoal/70">{craft.materials}</p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/shop?category=${craft.shopCategory}`}
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-terracotta transition-colors group"
                    >
                      <span>Explore Handcrafted Pieces</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
