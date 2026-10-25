'use client';

import React from 'react';
import Image from 'next/image';
import { Vendor } from '@/lib/types';

interface VendorDetailModalProps {
  vendor: Vendor | null;
  onClose: () => void;
  onAddToPackage: (vendor: Vendor) => void;
  onScheduleTasting: (vendor: Vendor) => void;
  isAlreadyAdded: boolean;
}

export function VendorDetailModal({
  vendor,
  onClose,
  onAddToPackage,
  onScheduleTasting,
  isAlreadyAdded,
}: VendorDetailModalProps) {
  if (!vendor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-[#E2DDD2] shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
        >
          ✕
        </button>

        {/* Top Hero Image */}
        <div className="relative aspect-[16/9] w-full bg-[#EAE5D8]">
          <Image
            src={vendor.image}
            alt={vendor.name}
            fill
            referrerPolicy="no-referrer"
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

          <div className="absolute bottom-5 left-5 right-5 text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded">
              {vendor.category === 'marriage_hall'
                ? 'Marriage Hall / Banquet'
                : vendor.category === 'caterer'
                ? 'Master Gourmet Caterer'
                : 'Bespoke Floral Decor'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold mt-2 text-white drop-shadow-sm">
              {vendor.name}
            </h3>
            <p className="text-xs sm:text-sm text-white/90 mt-1">
              {vendor.city} · {vendor.area} · ★ {vendor.rating} ({vendor.reviewsCount} verified reviews)
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EBE5D8] text-xs">
            <div>
              <span className="text-[10px] uppercase text-[#7A7160] block tracking-wide">Starting Price</span>
              <span className="font-bold text-[#1A1612] text-sm tabular-nums">
                ₹{vendor.pricePerUnit.toLocaleString()}
              </span>
              <span className="text-[10px] text-[#7A7160] block">/{vendor.unitLabel}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#7A7160] block tracking-wide">Experience</span>
              <span className="font-bold text-[#1A1612] text-sm tabular-nums">{vendor.experienceYears} Years</span>
              <span className="text-[10px] text-[#7A7160] block">In Luxury Events</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#7A7160] block tracking-wide">Weddings Done</span>
              <span className="font-bold text-[#1A1612] text-sm tabular-nums">{vendor.completedWeddings}+</span>
              <span className="text-[10px] text-[#7A7160] block">Celebrations</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#7A7160] block tracking-wide">Contact Person</span>
              <span className="font-bold text-[#1A1612] text-xs truncate block">{vendor.contactPerson}</span>
              <span className="text-[10px] text-[#7A7160] block">{vendor.phone}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7160] mb-2">
              About This Provider
            </h4>
            <p className="text-xs sm:text-sm text-[#4A4235] leading-relaxed">
              {vendor.description}
            </p>
          </div>

          {/* Features Checklist */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7160] mb-2">
              Key Facilities &amp; Standards
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {vendor.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[#4A4235]">
                  <span className="text-[#856525] font-bold">✓</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Menu for Caterers */}
          {vendor.sampleMenu && vendor.sampleMenu.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-[#EFECE4]">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1612]">
                  Curated Signature Tasting Menu
                </h4>
                <span className="text-xs text-[#856525] font-medium">
                  Free 6-Pax Pre-Wedding Tasting
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vendor.sampleMenu.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#FCFBF9] border border-[#E8E2D5] rounded-lg text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#7A7160] uppercase font-semibold">
                        {item.category}
                      </span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                          item.isVeg
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.isVeg ? 'VEG' : 'NON-VEG'}
                      </span>
                    </div>
                    <div className="font-semibold text-[#1A1612]">
                      {item.name}
                    </div>
                    {item.isSpecialty && (
                      <span className="text-[10px] text-[#856525] font-medium block">
                        ★ Chef Signature Dish
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#EFECE4] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-left w-full sm:w-auto">
              <span className="text-[10px] uppercase text-[#7A7160] block tracking-wide">
                Direct Booking Rate
              </span>
              <span className="text-lg font-bold text-[#1A1612] tabular-nums">
                ₹{vendor.pricePerUnit.toLocaleString()}
              </span>
              <span className="text-xs text-[#7A7160] ml-1">/{vendor.unitLabel}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {vendor.category === 'caterer' && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onScheduleTasting(vendor);
                  }}
                  className="px-4 py-2.5 text-xs font-semibold text-[#856525] bg-[#FAF6EE] hover:bg-[#F2ECE1] border border-[#DFCFA8] rounded-lg transition-colors whitespace-nowrap"
                >
                  Schedule Tasting
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  onAddToPackage(vendor);
                  onClose();
                }}
                className={`px-5 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  isAlreadyAdded
                    ? 'bg-[#856525] text-white'
                    : 'bg-[#1A1612] hover:bg-[#332C24] text-white'
                }`}
              >
                {isAlreadyAdded ? 'In My Package ✓' : '+ Add To My Package'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
