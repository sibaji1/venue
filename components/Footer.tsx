'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#1A1612] text-[#D5CEBF] border-t border-[#332C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-3">
            <h3 className="text-xl font-serif font-bold text-white tracking-tight">
              AuraFeast
            </h3>
            <p className="text-xs text-[#A89F8D] leading-relaxed">
              Curated wedding banquet halls, master gourmet caterers, and luxury floral decor stylists with transparent per-plate budgeting.
            </p>
            <p className="text-xs text-[#856525] font-medium pt-1">
              FSSAI Grade A+ Partner Network
            </p>
          </div>

          {/* Service Links */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Services &amp; Directory
            </h4>
            <ul className="space-y-1.5 text-[#A89F8D]">
              <li><a href="#vendors-directory" className="hover:text-white transition-colors">Marriage Halls &amp; Banquets</a></li>
              <li><a href="#vendors-directory" className="hover:text-white transition-colors">Royal Awadhi &amp; Mughlai Caterers</a></li>
              <li><a href="#vendors-directory" className="hover:text-white transition-colors">South Indian Traditional Sadya Feasts</a></li>
              <li><a href="#vendors-directory" className="hover:text-white transition-colors">Pure Sattvic &amp; Jain Banquet Services</a></li>
              <li><a href="#vendors-directory" className="hover:text-white transition-colors">Floral Mandap &amp; Stage Decor</a></li>
            </ul>
          </div>

          {/* AI Tools */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              AI Planning Suite
            </h4>
            <ul className="space-y-1.5 text-[#A89F8D]">
              <li><a href="#ai-budget-match" className="hover:text-white transition-colors">AI Budget Matchmaker</a></li>
              <li><a href="#package-builder" className="hover:text-white transition-colors">Live Package Price Calculator</a></li>
              <li><a href="#ai-budget-match" className="hover:text-white transition-colors">Per-Plate Cost Optimizer</a></li>
              <li><a href="#package-builder" className="hover:text-white transition-colors">Curated Tasting Scheduler</a></li>
              <li><a href="#ai-budget-match" className="hover:text-white transition-colors">Bespoke Menu Blueprint Generator</a></li>
            </ul>
          </div>

          {/* Concierge & Locations */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Concierge Desk
            </h4>
            <p className="text-[#A89F8D] leading-relaxed">
              Available 7 days a week for venue walkthroughs &amp; chef tastings across Mumbai, Delhi NCR, Bangalore, Jaipur, and Destination locations.
            </p>
            <div className="pt-2 text-white font-medium">
              concierge@aurafeast.com
            </div>
            <div className="text-[#A89F8D]">
              Direct Helpline: +91 (022) 4890 2200
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-[#2B241C] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C8270]">
          <div>
            © {new Date().getFullYear()} AuraFeast Hospitality Platforms Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Vendor Partner Agreement</span>
            <span aria-hidden="true">·</span>
            <span>Hygiene Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
