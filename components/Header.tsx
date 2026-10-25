'use client';

import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  onOpenAiMatch: () => void;
  onOpenPackageBuilder: () => void;
  onSelectCategory: (cat: 'all' | 'bundle' | 'marriage_hall' | 'caterer' | 'decor') => void;
  activeCategory: string;
  selectedItemsCount: number;
}

export function Header({
  onOpenAiMatch,
  onOpenPackageBuilder,
  onSelectCategory,
  selectedItemsCount,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FCFBF8]/90 backdrop-blur-md border-b border-[#E8E4DA] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            className="text-2xl font-serif font-bold tracking-tight text-[#1A1612] hover:text-[#9A7B38] transition-colors whitespace-nowrap"
          >
            AuraFeast
          </Link>
          <span className="text-xs text-[#8C8270] hidden sm:inline-block border-l border-[#D5CEBF] pl-3 py-0.5 tracking-wide">
            Catering &amp; Wedding Banquets
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A4235]">
          <button
            onClick={() => onSelectCategory('all')}
            className="hover:text-[#1A1612] transition-colors whitespace-nowrap shrink-0"
          >
            All Services
          </button>
          <button
            onClick={() => onSelectCategory('bundle')}
            className="hover:text-[#1A1612] transition-colors whitespace-nowrap shrink-0"
          >
            Complete Bundles
          </button>
          <button
            onClick={() => onSelectCategory('caterer')}
            className="hover:text-[#1A1612] transition-colors whitespace-nowrap shrink-0"
          >
            Gourmet Caterers
          </button>
          <button
            onClick={() => onSelectCategory('marriage_hall')}
            className="hover:text-[#1A1612] transition-colors whitespace-nowrap shrink-0"
          >
            Marriage Halls
          </button>
          <button
            onClick={() => onSelectCategory('decor')}
            className="hover:text-[#1A1612] transition-colors whitespace-nowrap shrink-0"
          >
            Decor &amp; Mandaps
          </button>
        </nav>

        {/* Zone 3: Primary Action CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAiMatch}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#856525] bg-[#F7F2E7] hover:bg-[#EFE8D6] border border-[#DFCFA8] rounded-md transition-colors whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-[#B88E3E]" />
            AI Budget Match
          </button>

          <button
            onClick={onOpenPackageBuilder}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1A1612] hover:bg-[#332C24] rounded-md shadow-sm transition-colors whitespace-nowrap"
          >
            <span>My Package</span>
            {selectedItemsCount > 0 && (
              <span className="bg-[#B88E3E] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {selectedItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
