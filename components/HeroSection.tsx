'use client';

import React from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  onOpenAiMatch: (scope?: 'bundle' | 'caterer' | 'marriage_hall' | 'decor') => void;
  onExploreVendors: (scope: 'all' | 'bundle' | 'caterer' | 'marriage_hall' | 'decor') => void;
}

export function HeroSection({ onOpenAiMatch, onExploreVendors }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#FBF9F5] border-b border-[#E8E4DA] pt-10 pb-16 lg:pt-14 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#856525] bg-[#F4EDE0] px-3 py-1 rounded-sm border border-[#E0D5C0]">
              <span>Verified Banquet Halls · Master Caterers · Bespoke Decor</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1A1612] tracking-tight leading-[1.18] text-balance">
              Royal Wedding Catering &amp; Banquets, Matched to Your Exact Budget.
            </h1>

            <p className="text-base sm:text-lg text-[#5A5243] font-normal leading-relaxed max-w-2xl text-pretty">
              Book a complete end-to-end wedding celebration or focus specifically on catering, grand marriage halls, or luxury floral decor. Our AI engine balances your budget across guests, plate pricing, and venue rental in seconds.
            </p>

            {/* Service Scope Selector Tabs */}
            <div className="p-4 sm:p-5 bg-white border border-[#E2DDD2] rounded-xl shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EFECE4] pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#7A7160]">
                  Select Planning Mode:
                </span>
                <span className="text-xs text-[#9A7B38] font-medium">
                  Instant AI financial blueprint &amp; live menu pairing
                </span>
              </div>

              {/* Mode Options Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => onOpenAiMatch('bundle')}
                  className="flex flex-col items-start p-3 rounded-lg border border-[#B88E3E] bg-[#FAF6EE] text-left hover:border-[#856525] transition-all group"
                >
                  <span className="text-xs font-bold text-[#1A1612] group-hover:text-[#856525] whitespace-nowrap">
                    Complete Bundle
                  </span>
                  <span className="text-[11px] text-[#7A7160] mt-0.5 line-clamp-1">
                    Hall + Food + Decor
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenAiMatch('caterer')}
                  className="flex flex-col items-start p-3 rounded-lg border border-[#E5E0D5] bg-white text-left hover:border-[#B88E3E] hover:bg-[#FAF6EE] transition-all group"
                >
                  <span className="text-xs font-bold text-[#1A1612] group-hover:text-[#856525] whitespace-nowrap">
                    Caterers Only
                  </span>
                  <span className="text-[11px] text-[#7A7160] mt-0.5 line-clamp-1">
                    Menu &amp; Plate Pricing
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenAiMatch('marriage_hall')}
                  className="flex flex-col items-start p-3 rounded-lg border border-[#E5E0D5] bg-white text-left hover:border-[#B88E3E] hover:bg-[#FAF6EE] transition-all group"
                >
                  <span className="text-xs font-bold text-[#1A1612] group-hover:text-[#856525] whitespace-nowrap">
                    Marriage Hall
                  </span>
                  <span className="text-[11px] text-[#7A7160] mt-0.5 line-clamp-1">
                    Venues &amp; Banquets
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenAiMatch('decor')}
                  className="flex flex-col items-start p-3 rounded-lg border border-[#E5E0D5] bg-white text-left hover:border-[#B88E3E] hover:bg-[#FAF6EE] transition-all group"
                >
                  <span className="text-xs font-bold text-[#1A1612] group-hover:text-[#856525] whitespace-nowrap">
                    Decor &amp; Styling
                  </span>
                  <span className="text-[11px] text-[#7A7160] mt-0.5 line-clamp-1">
                    Mandap &amp; Florals
                  </span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenAiMatch('bundle')}
                  className="px-6 py-3 bg-[#1A1612] hover:bg-[#332C24] text-white text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  Launch AI Budget Matchmaker
                </button>
                <button
                  type="button"
                  onClick={() => onExploreVendors('all')}
                  className="px-5 py-3 bg-transparent hover:bg-[#EFECE4] text-[#4A4235] text-sm font-semibold rounded-lg border border-[#D5CEBF] transition-all text-center whitespace-nowrap"
                >
                  Browse 50+ Verified Partners
                </button>
              </div>
            </div>

            {/* Trust and Adjacency metrics */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#6B6252]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#1A1612] tabular-nums">100%</span>
                <span>FSSAI Grade A+ Caterers</span>
              </div>
              <span aria-hidden="true" className="text-[#C8C1B0]">·</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#1A1612] tabular-nums">4,200+</span>
                <span>Weddings Catered</span>
              </div>
              <span aria-hidden="true" className="text-[#C8C1B0]">·</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#1A1612] tabular-nums">Free</span>
                <span>Pre-Event Food Tasting</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E0D9CB] shadow-lg bg-[#EAE5D8]">
              <Image
                src="/images/hero.jpg"
                alt="Grand luxury wedding reception banquet hall with crystal chandeliers and dining tables"
                fill
                priority
                referrerPolicy="no-referrer"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#EFECE4] shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#856525] font-semibold">
                      Featured Ballroom &amp; Feast
                    </span>
                    <h2 className="text-sm font-serif font-bold text-[#1A1612]">
                      Grand Crystal Palace &amp; Royal Awadhi Kitchen
                    </h2>
                  </div>
                  <span className="text-xs font-bold text-[#1A1612] bg-[#F7F2E7] px-2.5 py-1 rounded border border-[#E2DDD2] tabular-nums">
                    ₹1,450 / plate
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-[#6B6252]">
                  <span>400 - 1,200 Guests</span>
                  <span>Free Tasting Session Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
