'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Vendor, CuratedBundle, ServiceCategory } from '@/lib/types';
import { ALL_VENDORS, MOCK_CURATED_BUNDLES } from '@/data/mockVendors';

interface VendorDirectoryProps {
  activeCategory: ServiceCategory;
  onSelectCategory: (cat: ServiceCategory) => void;
  onViewVendor: (vendor: Vendor) => void;
  onAddVendorToPackage: (vendor: Vendor) => void;
  onSelectBundle: (bundle: CuratedBundle) => void;
  selectedVendorIds: string[];
}

export function VendorDirectory({
  activeCategory,
  onSelectCategory,
  onViewVendor,
  onAddVendorToPackage,
  onSelectBundle,
  selectedVendorIds,
}: VendorDirectoryProps) {
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter logic
  const filteredVendors = ALL_VENDORS.filter((v) => {
    // Category check
    if (activeCategory === 'marriage_hall' && v.category !== 'marriage_hall') return false;
    if (activeCategory === 'caterer' && v.category !== 'caterer') return false;
    if (activeCategory === 'decor' && v.category !== 'decor') return false;

    // City check
    if (cityFilter !== 'all' && v.city.toLowerCase() !== cityFilter.toLowerCase()) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = v.name.toLowerCase().includes(q);
      const matchCity = v.city.toLowerCase().includes(q);
      const matchTagline = v.tagline.toLowerCase().includes(q);
      const matchCuisines = v.cuisines?.some((c) => c.toLowerCase().includes(q));
      const matchThemes = v.decorThemes?.some((t) => t.toLowerCase().includes(q));
      return matchName || matchCity || matchTagline || matchCuisines || matchThemes;
    }

    return true;
  });

  return (
    <section id="vendors-directory" className="py-14 sm:py-20 bg-[#FBF9F5] border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#9A7B38] mb-1">
              Curated Vendor Network
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1612] tracking-tight">
              Explore Banquets, Caterers &amp; Stylists
            </h2>
            <p className="mt-1 text-sm text-[#615746]">
              Verified five-star vendors with transparent per-plate and rental pricing.
            </p>
          </div>

          {/* Search & City Filter Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Biryani, Mandap, AC Hall..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 sm:w-64 text-xs bg-white border border-[#DDD6C8] rounded-lg px-3 py-2 text-[#1A1612] placeholder-[#9C9482] focus:outline-none focus:border-[#B88E3E]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-xs text-[#9C9482] hover:text-[#1A1612]"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="text-xs font-medium bg-white border border-[#DDD6C8] rounded-lg px-3 py-2 text-[#1A1612] focus:outline-none focus:border-[#B88E3E]"
            >
              <option value="all">All Cities</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#EFECE3] rounded-xl border border-[#DFD9CB] mb-8 overflow-x-auto">
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeCategory === 'all'
                ? 'bg-white text-[#1A1612] shadow-xs'
                : 'text-[#665D4D] hover:text-[#1A1612]'
            }`}
          >
            All Vendors ({ALL_VENDORS.length})
          </button>
          <button
            type="button"
            onClick={() => onSelectCategory('bundle')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeCategory === 'bundle'
                ? 'bg-white text-[#1A1612] shadow-xs'
                : 'text-[#665D4D] hover:text-[#1A1612]'
            }`}
          >
            Curated Bundles (3)
          </button>
          <button
            type="button"
            onClick={() => onSelectCategory('caterer')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeCategory === 'caterer'
                ? 'bg-white text-[#1A1612] shadow-xs'
                : 'text-[#665D4D] hover:text-[#1A1612]'
            }`}
          >
            Gourmet Caterers (4)
          </button>
          <button
            type="button"
            onClick={() => onSelectCategory('marriage_hall')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeCategory === 'marriage_hall'
                ? 'bg-white text-[#1A1612] shadow-xs'
                : 'text-[#665D4D] hover:text-[#1A1612]'
            }`}
          >
            Marriage Halls (4)
          </button>
          <button
            type="button"
            onClick={() => onSelectCategory('decor')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeCategory === 'decor'
                ? 'bg-white text-[#1A1612] shadow-xs'
                : 'text-[#665D4D] hover:text-[#1A1612]'
            }`}
          >
            Decor &amp; Mandap (4)
          </button>
        </div>

        {/* Render Curated Bundles Section if selected or 'all' */}
        {(activeCategory === 'bundle' || activeCategory === 'all') && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-serif font-bold text-[#1A1612]">
                Curated End-to-End Packages (Save up to 15%)
              </h3>
              <span className="text-xs text-[#856525] font-medium hidden sm:inline">
                Pre-negotiated Ballroom + Royal Catering + Mandap styling
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_CURATED_BUNDLES.map((b) => (
                <div
                  key={b.id}
                  className="bg-white border border-[#E2DDD2] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs text-[#7A7160]">
                      <span className="font-semibold text-[#856525] uppercase tracking-wider text-[10px]">
                        {b.tier}
                      </span>
                      <span>{b.guestCapacity}</span>
                    </div>

                    <div>
                      <h4 className="text-lg font-serif font-bold text-[#1A1612] leading-snug">
                        {b.title}
                      </h4>
                      <p className="text-xs text-[#635A4A] mt-1 line-clamp-2">
                        {b.subtitle}
                      </p>
                    </div>

                    {/* Included Partners Summary */}
                    <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE8DE] space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#7A7160]">Hall:</span>
                        <span className="font-semibold text-[#1A1612] truncate max-w-[170px]">{b.hall.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#7A7160]">Caterer:</span>
                        <span className="font-semibold text-[#1A1612] truncate max-w-[170px]">{b.caterer.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#7A7160]">Decor:</span>
                        <span className="font-semibold text-[#1A1612] truncate max-w-[170px]">{b.decor.name}</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="pt-2 border-t border-[#F0ECE1] flex items-baseline justify-between">
                      <div>
                        <span className="text-[11px] text-[#7A7160] block">Estimated Total</span>
                        <span className="text-lg font-bold text-[#1A1612] tabular-nums">
                          ₹{b.approxTotalCost.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-[#7A7160] block">Effective</span>
                        <span className="text-xs font-semibold text-[#856525] tabular-nums">
                          ₹{b.costPerGuest.toLocaleString()} / guest
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F8F5EE] border-t border-[#EAE5D8] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectBundle(b)}
                      className="w-full py-2.5 px-4 bg-[#1A1612] hover:bg-[#332C24] text-white text-xs font-semibold rounded-lg transition-colors text-center"
                    >
                      Select This Bundle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vendors Grid */}
        {activeCategory !== 'bundle' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-serif font-bold text-[#1A1612]">
                {activeCategory === 'caterer'
                  ? 'Master Wedding Caterers'
                  : activeCategory === 'marriage_hall'
                  ? 'Grand Marriage Halls & Banquets'
                  : activeCategory === 'decor'
                  ? 'Event Decor & Floral Stylists'
                  : 'Individual Service Providers'}
              </h3>
              <span className="text-xs text-[#7A7160]">
                Showing {filteredVendors.length} verified vendors
              </span>
            </div>

            {filteredVendors.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-[#E0D9CB]">
                <p className="text-sm text-[#7A7160]">
                  No vendors match your search criteria. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVendors.map((vendor) => {
                  const isAdded = selectedVendorIds.includes(vendor.id);
                  return (
                    <div
                      key={vendor.id}
                      className="bg-white border border-[#E2DDD2] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      {/* Image Top Banner (65% presence) */}
                      <div className="relative aspect-[16/10] bg-[#ECE7DA] overflow-hidden">
                        <Image
                          src={vendor.image}
                          alt={vendor.name}
                          fill
                          referrerPolicy="no-referrer"
                          className="object-cover group-hover:scale-102 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                            {vendor.category === 'marriage_hall'
                              ? 'Marriage Hall'
                              : vendor.category === 'caterer'
                              ? 'Master Caterer'
                              : 'Decor & Mandap'}
                          </span>
                          <span className="text-xs font-semibold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded tabular-nums">
                            ★ {vendor.rating} ({vendor.reviewsCount})
                          </span>
                        </div>

                        {/* Bottom Location text on image */}
                        <div className="absolute bottom-2.5 left-3 text-white text-[11px] font-medium drop-shadow-sm">
                          {vendor.city} · {vendor.area}
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-base font-serif font-bold text-[#1A1612] leading-snug">
                            {vendor.name}
                          </h4>
                          <p className="text-xs text-[#6B6252] mt-1 line-clamp-2">
                            {vendor.tagline}
                          </p>

                          {/* Key Specs */}
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-[#7A7160]">
                            {vendor.capacityRange && (
                              <span>Capacity: {vendor.capacityRange}</span>
                            )}
                            {vendor.cuisines && (
                              <span>Cuisine: {vendor.cuisines.slice(0, 2).join(', ')}</span>
                            )}
                            {vendor.decorThemes && (
                              <span>Style: {vendor.decorThemes.slice(0, 2).join(', ')}</span>
                            )}
                          </div>
                        </div>

                        {/* Pricing and Action */}
                        <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase text-[#7A7160] block tracking-wide">
                              Pricing Starts
                            </span>
                            <span className="text-base font-bold text-[#1A1612] tabular-nums">
                              ₹{vendor.pricePerUnit.toLocaleString()}
                            </span>
                            <span className="text-[11px] text-[#7A7160] ml-1">
                              /{vendor.unitLabel}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onViewVendor(vendor)}
                              className="px-2.5 py-1.5 text-xs text-[#736A5B] hover:text-[#1A1612] font-medium hover:bg-[#F4F0E6] rounded transition-colors"
                            >
                              Details
                            </button>
                            <button
                              type="button"
                              onClick={() => onAddVendorToPackage(vendor)}
                              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                                isAdded
                                  ? 'bg-[#856525] text-white'
                                  : 'bg-[#1A1612] text-white hover:bg-[#332C24]'
                              }`}
                            >
                              {isAdded ? 'In Package ✓' : '+ Add'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
