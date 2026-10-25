'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AiBudgetMatchSection } from '@/components/AiBudgetMatchSection';
import { VendorDirectory } from '@/components/VendorDirectory';
import { InteractivePackageBuilder } from '@/components/InteractivePackageBuilder';
import { VendorDetailModal } from '@/components/VendorDetailModal';
import { TastingBookingModal } from '@/components/TastingBookingModal';
import { ConsultationModal } from '@/components/ConsultationModal';
import { Footer } from '@/components/Footer';
import { Vendor, CuratedBundle, ServiceCategory } from '@/lib/types';
import { MOCK_MARRIAGE_HALLS, MOCK_CATERERS, MOCK_DECORATORS } from '@/data/mockVendors';

export default function HomePage() {
  // Navigation & Category state
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

  // Selected Package State (Pre-populated with a balanced luxury combination)
  const [selectedHall, setSelectedHall] = useState<Vendor | undefined>(MOCK_MARRIAGE_HALLS[0]);
  const [selectedCaterer, setSelectedCaterer] = useState<Vendor | undefined>(MOCK_CATERERS[0]);
  const [selectedDecor, setSelectedDecor] = useState<Vendor | undefined>(MOCK_DECORATORS[0]);

  // Modals state
  const [detailVendor, setDetailVendor] = useState<Vendor | null>(null);
  const [tastingCaterer, setTastingCaterer] = useState<Vendor | null>(null);
  const [consultationSummary, setConsultationSummary] = useState<string | null>(null);
  const [initialAiScope, setInitialAiScope] = useState<'bundle' | 'caterer' | 'marriage_hall' | 'decor'>('bundle');

  // Count active selections
  const selectedItemsCount = (selectedHall ? 1 : 0) + (selectedCaterer ? 1 : 0) + (selectedDecor ? 1 : 0);
  const selectedVendorIds = [
    selectedHall?.id,
    selectedCaterer?.id,
    selectedDecor?.id,
  ].filter(Boolean) as string[];

  // Scroll helpers
  const scrollToAiMatch = (scope: 'bundle' | 'caterer' | 'marriage_hall' | 'decor' = 'bundle') => {
    setInitialAiScope(scope);
    const el = document.getElementById('ai-budget-match');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPackageBuilder = () => {
    const el = document.getElementById('package-builder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreVendors = (cat: ServiceCategory) => {
    setActiveCategory(cat);
    const el = document.getElementById('vendors-directory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add vendor to package
  const handleAddVendorToPackage = (vendor: Vendor) => {
    if (vendor.category === 'marriage_hall') {
      setSelectedHall(vendor);
    } else if (vendor.category === 'caterer') {
      setSelectedCaterer(vendor);
    } else if (vendor.category === 'decor') {
      setSelectedDecor(vendor);
    }
    // Scroll to customizer so user sees the update
    scrollToPackageBuilder();
  };

  // Select curated bundle
  const handleSelectBundle = (bundle: CuratedBundle) => {
    setSelectedHall(bundle.hall);
    setSelectedCaterer(bundle.caterer);
    setSelectedDecor(bundle.decor);
    scrollToPackageBuilder();
  };

  // Select AI matched bundle
  const handleSelectVendorBundle = (bundle: { hall?: Vendor; caterer?: Vendor; decor?: Vendor }) => {
    if (bundle.hall) setSelectedHall(bundle.hall);
    if (bundle.caterer) setSelectedCaterer(bundle.caterer);
    if (bundle.decor) setSelectedDecor(bundle.decor);
    scrollToPackageBuilder();
  };

  return (
    <div className="min-h-screen bg-[#FCFBF8] text-[#1A1612] flex flex-col font-sans selection:bg-[#EFE8D6] selection:text-[#856525]">
      {/* 3-Zone Header */}
      <Header
        onOpenAiMatch={() => scrollToAiMatch('bundle')}
        onOpenPackageBuilder={scrollToPackageBuilder}
        onSelectCategory={handleExploreVendors}
        activeCategory={activeCategory}
        selectedItemsCount={selectedItemsCount}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with End-to-End vs Single Focus Mode */}
        <HeroSection
          onOpenAiMatch={scrollToAiMatch}
          onExploreVendors={handleExploreVendors}
        />

        {/* AI Budget Matchmaker & Custom Menu Architect */}
        <AiBudgetMatchSection
          initialScope={initialAiScope}
          onSelectVendorBundle={handleSelectVendorBundle}
          onSelectSingleVendor={(vendor) => {
            handleAddVendorToPackage(vendor);
          }}
        />

        {/* Live Interactive Package Customizer & Price Calculator */}
        <InteractivePackageBuilder
          selectedHall={selectedHall}
          selectedCaterer={selectedCaterer}
          selectedDecor={selectedDecor}
          onUpdateHall={setSelectedHall}
          onUpdateCaterer={setSelectedCaterer}
          onUpdateDecor={setSelectedDecor}
          onScheduleTasting={(c) => setTastingCaterer(c || selectedCaterer || null)}
          onBookConsultation={(sum) => setConsultationSummary(sum)}
        />

        {/* Verified Vendors Directory & Curated Packages */}
        <VendorDirectory
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onViewVendor={(v) => setDetailVendor(v)}
          onAddVendorToPackage={handleAddVendorToPackage}
          onSelectBundle={handleSelectBundle}
          selectedVendorIds={selectedVendorIds}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <VendorDetailModal
        vendor={detailVendor}
        onClose={() => setDetailVendor(null)}
        onAddToPackage={handleAddVendorToPackage}
        onScheduleTasting={(v) => {
          setDetailVendor(null);
          setTastingCaterer(v);
        }}
        isAlreadyAdded={Boolean(detailVendor && selectedVendorIds.includes(detailVendor.id))}
      />

      <TastingBookingModal
        caterer={tastingCaterer}
        onClose={() => setTastingCaterer(null)}
      />

      {consultationSummary && (
        <ConsultationModal
          summary={consultationSummary}
          onClose={() => setConsultationSummary(null)}
        />
      )}
    </div>
  );
}
