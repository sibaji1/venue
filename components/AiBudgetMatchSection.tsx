'use client';

import React, { useState } from 'react';
import { AiBudgetBreakdown, AiMatchRequest, Vendor } from '@/lib/types';
import { ALL_VENDORS } from '@/data/mockVendors';

interface AiBudgetMatchSectionProps {
  onSelectVendorBundle: (vendors: { hall?: Vendor; caterer?: Vendor; decor?: Vendor }) => void;
  onSelectSingleVendor: (vendor: Vendor) => void;
  initialScope?: 'bundle' | 'caterer' | 'marriage_hall' | 'decor';
}

export function AiBudgetMatchSection({
  onSelectVendorBundle,
  onSelectSingleVendor,
  initialScope = 'bundle',
}: AiBudgetMatchSectionProps) {
  const [scope, setScope] = useState<'bundle' | 'caterer' | 'marriage_hall' | 'decor'>(initialScope);
  const [budget, setBudget] = useState<number>(1200000);
  const [guestCount, setGuestCount] = useState<number>(450);
  const [eventType, setEventType] = useState<string>('Grand Wedding & Reception');
  const [cuisine, setCuisine] = useState<string>('Royal Awadhi & Mughlai');
  const [decorTheme, setDecorTheme] = useState<string>('Royal Heritage Palace');
  const [city, setCity] = useState<string>('Mumbai');
  const [eventDate, setEventDate] = useState<string>('2026-11-20');
  const [dietary, setDietary] = useState<string[]>(['Pure Veg Options Available']);
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blueprint, setBlueprint] = useState<AiBudgetBreakdown | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Quick preset budgets
  const presetBudgets = [
    { label: 'Intimate (₹5L - ₹8L)', value: 650000, guests: 200 },
    { label: 'Classic (₹10L - ₹15L)', value: 1200000, guests: 450 },
    { label: 'Grand (₹18L - ₹25L)', value: 2000000, guests: 750 },
    { label: 'Royal (₹30L+)', value: 3500000, guests: 1200 },
  ];

  const handleRunAiMatch = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const payload: AiMatchRequest = {
      serviceScope: scope,
      totalBudget: budget,
      guestCount,
      eventType,
      cuisinePreference: cuisine,
      decorTheme,
      city,
      eventDate,
      dietaryRestrictions: dietary,
      specialRequests: specialNotes,
    };

    try {
      const res = await fetch('/api/ai-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server returned error ${res.status}`);
      }

      const data: AiBudgetBreakdown = await res.json();
      setBlueprint(data);
    } catch (err) {
      console.error('Failed to run AI match:', err);
      setErrorMessage('Could not generate AI match at this moment. Please verify your connection and retry.');
    } finally {
      setIsLoading(false);
    }
  };

  // Find matched vendor instances from ID
  const matchedHall = blueprint?.matchedHallId
    ? ALL_VENDORS.find((v) => v.id === blueprint.matchedHallId)
    : undefined;
  const matchedCaterer = blueprint?.matchedCatererId
    ? ALL_VENDORS.find((v) => v.id === blueprint.matchedCatererId)
    : undefined;
  const matchedDecor = blueprint?.matchedDecorId
    ? ALL_VENDORS.find((v) => v.id === blueprint.matchedDecorId)
    : undefined;

  const toggleDietary = (item: string) => {
    if (dietary.includes(item)) {
      setDietary(dietary.filter((d) => d !== item));
    } else {
      setDietary([...dietary, item]);
    }
  };

  return (
    <section id="ai-budget-match" className="py-14 sm:py-20 bg-white border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#9A7B38] mb-1">
            Intelligent Wedding Economics
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1A1612] tracking-tight">
            AI Budget Matchmaker &amp; Menu Architect
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#615746] leading-relaxed">
            Enter your budget, guest count, and culinary vision. Our Gemini-powered planner breaks down expenses across hall rental, per-plate dining, and decor styling with zero hidden markups.
          </p>
        </div>

        {/* Planning Mode Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F6F3EC] rounded-xl border border-[#E5E0D4] mb-8 w-fit">
          <button
            type="button"
            onClick={() => setScope('bundle')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              scope === 'bundle'
                ? 'bg-white text-[#1A1612] shadow-xs border border-[#DFD8C8]'
                : 'text-[#665D4D] hover:text-[#1A1612]'
            }`}
          >
            Complete End-to-End Bundle
          </button>
          <button
            type="button"
            onClick={() => setScope('caterer')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              scope === 'caterer'
                ? 'bg-white text-[#1A1612] shadow-xs border border-[#DFD8C8]'
                : 'text-[#665D4D] hover:text-[#1A1612]'
            }`}
          >
            Catering &amp; Menu Only
          </button>
          <button
            type="button"
            onClick={() => setScope('marriage_hall')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              scope === 'marriage_hall'
                ? 'bg-white text-[#1A1612] shadow-xs border border-[#DFD8C8]'
                : 'text-[#665D4D] hover:text-[#1A1612]'
            }`}
          >
            Marriage Hall Only
          </button>
          <button
            type="button"
            onClick={() => setScope('decor')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              scope === 'decor'
                ? 'bg-white text-[#1A1612] shadow-xs border border-[#DFD8C8]'
                : 'text-[#665D4D] hover:text-[#1A1612]'
            }`}
          >
            Decor &amp; Mandap Only
          </button>
        </div>

        {/* Interactive Configuration Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E8E2D5] rounded-2xl p-5 sm:p-6 space-y-5">
            {/* Quick Preset Buttons */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#736A5B] tracking-wider mb-2">
                Quick Preset Scale:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {presetBudgets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setBudget(preset.value);
                      setGuestCount(preset.guests);
                    }}
                    className={`px-2.5 py-1.5 text-xs text-left rounded-md border transition-all ${
                      budget === preset.value
                        ? 'border-[#B88E3E] bg-[#F4EDE0] font-bold text-[#1A1612]'
                        : 'border-[#E0D9CC] bg-white text-[#574E40] hover:border-[#C8BEAC]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Total Budget Slider & Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase text-[#736A5B] tracking-wider">
                  Total Event Budget:
                </label>
                <span className="text-sm font-bold text-[#1A1612] tabular-nums">
                  ₹{budget.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={300000}
                max={5000000}
                step={50000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-[#B88E3E] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#8C8372] mt-1 tabular-nums">
                <span>₹3,00,000</span>
                <span>₹25,00,000</span>
                <span>₹50,00,000</span>
              </div>
            </div>

            {/* Guest Count Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase text-[#736A5B] tracking-wider">
                  Guest Count:
                </label>
                <span className="text-sm font-bold text-[#1A1612] tabular-nums">
                  {guestCount} Guests
                </span>
              </div>
              <input
                type="range"
                min={80}
                max={1500}
                step={20}
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full accent-[#B88E3E] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#8C8372] mt-1 tabular-nums">
                <span>80 Guests</span>
                <span>600 Guests</span>
                <span>1,500 Guests</span>
              </div>
            </div>

            {/* Cuisine Style Preference */}
            {(scope === 'bundle' || scope === 'caterer') && (
              <div>
                <label className="block text-xs font-semibold uppercase text-[#736A5B] tracking-wider mb-1.5">
                  Cuisine &amp; Dining Style:
                </label>
                <select
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="w-full text-xs font-medium bg-white border border-[#DDD6C8] rounded-lg px-3 py-2 text-[#1A1612] focus:outline-none focus:border-[#B88E3E]"
                >
                  <option value="Royal Awadhi & Mughlai">Royal Awadhi &amp; Mughlai (Dum Biryani, Galouti &amp; Kebabs)</option>
                  <option value="South Indian Traditional 32-Course Feast">South Indian Traditional 32-Course Feast (Sadya / Chettinad)</option>
                  <option value="Pure Sattvic Veg & Chaat Bazaar">Pure Sattvic Vegetarian, Jain Specialties &amp; Chaat Bazaar</option>
                  <option value="Modern Global Fusion & Live Teppanyaki">Modern Global Fusion, Italian Woodfire &amp; Pan-Asian</option>
                  <option value="Punjabi Frontier & Live Tandoor">Flavors of Punjab &amp; Live Tandoori Grills</option>
                </select>
              </div>
            )}

            {/* Decor Aesthetic Preference */}
            {(scope === 'bundle' || scope === 'decor') && (
              <div>
                <label className="block text-xs font-semibold uppercase text-[#736A5B] tracking-wider mb-1.5">
                  Decor Aesthetic &amp; Mandap:
                </label>
                <select
                  value={decorTheme}
                  onChange={(e) => setDecorTheme(e.target.value)}
                  className="w-full text-xs font-medium bg-white border border-[#DDD6C8] rounded-lg px-3 py-2 text-[#1A1612] focus:outline-none focus:border-[#B88E3E]"
                >
                  <option value="Royal Heritage Palace">Royal Rajwada Heritage (Marigold, Brass Urli &amp; Velvet)</option>
                  <option value="Floral Enchantment & Orchids">Floral Enchantment (Imported White Orchids &amp; Pastel Roses)</option>
                  <option value="Modern Minimalist Luxe">Modern Minimalist Luxe (Mirrored Aisle &amp; Kinetic Starlight)</option>
                  <option value="Boho Chic & Lawn Fairy Lights">Boho Chic Lawn (Pampas Grass, Macrame &amp; Warm Bulbs)</option>
                </select>
              </div>
            )}

            {/* Event Type & City */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-[#736A5B] tracking-wider mb-1.5">
                  City:
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs font-medium bg-white border border-[#DDD6C8] rounded-lg px-3 py-2 text-[#1A1612] focus:outline-none focus:border-[#B88E3E]"
                >
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Destination">Destination Wedding</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#736A5B] tracking-wider mb-1.5">
                  Target Date:
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full text-xs font-medium bg-white border border-[#DDD6C8] rounded-lg px-3 py-2 text-[#1A1612] focus:outline-none focus:border-[#B88E3E]"
                />
              </div>
            </div>

            {/* Dietary Tags */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#736A5B] tracking-wider mb-1.5">
                Dietary Requirements:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['100% Pure Veg', 'Strict Jain Line', 'Halal Certified', 'Live Chaat Carts', 'No Onion/Garlic'].map(
                  (tag) => {
                    const isSelected = dietary.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleDietary(tag)}
                        className={`text-[11px] px-2.5 py-1 rounded-md transition-all ${
                          isSelected
                            ? 'bg-[#1A1612] text-white font-medium'
                            : 'bg-white border border-[#DDD6C8] text-[#5C5344] hover:bg-[#F2ECE1]'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Trigger AI Button */}
            <button
              type="button"
              onClick={handleRunAiMatch}
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-[#B88E3E] hover:bg-[#9E7830] text-white font-semibold text-xs tracking-wider uppercase rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Calculating Financial Feasibility &amp; Vendor Pairing...
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Generate AI Budget Blueprint
                </>
              )}
            </button>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-7 bg-[#FCFBF9] border border-[#E8E2D5] rounded-2xl p-6 sm:p-7 min-h-[520px] flex flex-col justify-between">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center my-auto py-16 text-center space-y-4">
                <div className="w-12 h-12 border-3 border-[#B88E3E] border-t-transparent rounded-full animate-spin" />
                <h3 className="text-base font-serif font-bold text-[#1A1612]">
                  Analyzing Venue Rent, Plate Math &amp; Floral Costs...
                </h3>
                <p className="text-xs text-[#7A7160] max-w-sm">
                  Our Gemini intelligence is cross-referencing {guestCount} guests against current market rates for {cuisine} and verified banquet halls.
                </p>
              </div>
            ) : blueprint ? (
              <div className="space-y-6">
                {/* Feasibility Ribbon */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECE7DA] pb-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#7A7160] font-semibold">
                      Budget Feasibility Assessment
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#1A1612]">
                      {blueprint.feasibilityAssessment}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] uppercase tracking-wider text-[#7A7160] block">
                      Estimated Catering Per Plate
                    </span>
                    <span className="text-lg font-bold text-[#856525] tabular-nums">
                      {blueprint.estimatedCostPerPlate > 0
                        ? `₹${blueprint.estimatedCostPerPlate.toLocaleString()} / plate`
                        : 'Dedicated Service Setup'}
                    </span>
                  </div>
                </div>

                {/* Executive Summary */}
                <p className="text-xs sm:text-sm text-[#4F4638] leading-relaxed bg-[#F5F0E4] p-3.5 rounded-lg border border-[#E5DECD]">
                  {blueprint.executiveSummary}
                </p>

                {/* Financial Allocation Split Bar */}
                <div>
                  <div className="text-xs font-semibold uppercase text-[#736A5B] tracking-wider mb-2 flex justify-between">
                    <span>Budget Allocation Breakdown:</span>
                    <span className="tabular-nums">Total: ₹{budget.toLocaleString()}</span>
                  </div>

                  {/* Multi-colored Segment Bar */}
                  <div className="w-full h-3 rounded-full overflow-hidden flex bg-[#EAE5D8]">
                    {blueprint.venuePercentage > 0 && (
                      <div
                        style={{ width: `${blueprint.venuePercentage}%` }}
                        className="bg-[#2E4057] h-full"
                        title={`Venue: ${blueprint.venuePercentage}%`}
                      />
                    )}
                    {blueprint.cateringPercentage > 0 && (
                      <div
                        style={{ width: `${blueprint.cateringPercentage}%` }}
                        className="bg-[#B88E3E] h-full"
                        title={`Catering: ${blueprint.cateringPercentage}%`}
                      />
                    )}
                    {blueprint.decorPercentage > 0 && (
                      <div
                        style={{ width: `${blueprint.decorPercentage}%` }}
                        className="bg-[#78281F] h-full"
                        title={`Decor: ${blueprint.decorPercentage}%`}
                      />
                    )}
                    {blueprint.logisticsBufferPercentage > 0 && (
                      <div
                        style={{ width: `${blueprint.logisticsBufferPercentage}%` }}
                        className="bg-[#566573] h-full"
                        title={`Buffer: ${blueprint.logisticsBufferPercentage}%`}
                      />
                    )}
                  </div>

                  {/* Allocation Legend */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
                    {blueprint.venuePercentage > 0 && (
                      <div className="p-2 bg-white rounded border border-[#E8E2D5]">
                        <span className="text-[11px] text-[#7A7160] block">Venue ({blueprint.venuePercentage}%)</span>
                        <span className="font-bold text-[#1A1612] tabular-nums">₹{blueprint.venueAmount.toLocaleString()}</span>
                      </div>
                    )}
                    {blueprint.cateringPercentage > 0 && (
                      <div className="p-2 bg-white rounded border border-[#E8E2D5]">
                        <span className="text-[11px] text-[#7A7160] block">Catering ({blueprint.cateringPercentage}%)</span>
                        <span className="font-bold text-[#1A1612] tabular-nums">₹{blueprint.cateringAmount.toLocaleString()}</span>
                      </div>
                    )}
                    {blueprint.decorPercentage > 0 && (
                      <div className="p-2 bg-white rounded border border-[#E8E2D5]">
                        <span className="text-[11px] text-[#7A7160] block">Decor ({blueprint.decorPercentage}%)</span>
                        <span className="font-bold text-[#1A1612] tabular-nums">₹{blueprint.decorAmount.toLocaleString()}</span>
                      </div>
                    )}
                    {blueprint.logisticsBufferPercentage > 0 && (
                      <div className="p-2 bg-white rounded border border-[#E8E2D5]">
                        <span className="text-[11px] text-[#7A7160] block">Reserve Buffer</span>
                        <span className="font-bold text-[#1A1612] tabular-nums">₹{blueprint.logisticsBufferAmount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recommended Matched Partners */}
                <div>
                  <div className="text-xs font-semibold uppercase text-[#736A5B] tracking-wider mb-2">
                    AI Matched Network Partners:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {matchedHall && (
                      <div className="p-3 bg-white border border-[#E2DDD2] rounded-xl flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#856525] tracking-wide block">
                            Marriage Hall
                          </span>
                          <h4 className="text-xs font-bold text-[#1A1612] mt-0.5 line-clamp-1">
                            {matchedHall.name}
                          </h4>
                          <p className="text-[11px] text-[#6E6554] mt-1 tabular-nums">
                            ₹{matchedHall.pricePerUnit.toLocaleString()} / day
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onSelectSingleVendor(matchedHall)}
                          className="mt-2 text-[11px] text-[#856525] hover:text-[#1A1612] font-semibold text-left"
                        >
                          View Hall Specs →
                        </button>
                      </div>
                    )}

                    {matchedCaterer && (
                      <div className="p-3 bg-white border border-[#E2DDD2] rounded-xl flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#856525] tracking-wide block">
                            Master Caterer
                          </span>
                          <h4 className="text-xs font-bold text-[#1A1612] mt-0.5 line-clamp-1">
                            {matchedCaterer.name}
                          </h4>
                          <p className="text-[11px] text-[#6E6554] mt-1 tabular-nums">
                            ₹{matchedCaterer.pricePerUnit.toLocaleString()} / plate
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onSelectSingleVendor(matchedCaterer)}
                          className="mt-2 text-[11px] text-[#856525] hover:text-[#1A1612] font-semibold text-left"
                        >
                          View Menu &amp; Tasting →
                        </button>
                      </div>
                    )}

                    {matchedDecor && (
                      <div className="p-3 bg-white border border-[#E2DDD2] rounded-xl flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#856525] tracking-wide block">
                            Mandap &amp; Styling
                          </span>
                          <h4 className="text-xs font-bold text-[#1A1612] mt-0.5 line-clamp-1">
                            {matchedDecor.name}
                          </h4>
                          <p className="text-[11px] text-[#6E6554] mt-1 tabular-nums">
                            ₹{matchedDecor.pricePerUnit.toLocaleString()} / setup
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onSelectSingleVendor(matchedDecor)}
                          className="mt-2 text-[11px] text-[#856525] hover:text-[#1A1612] font-semibold text-left"
                        >
                          View Floral Portfolio →
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bespoke Menu Blueprint */}
                {blueprint.customMenuRecommendation && (
                  <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E6E0D2] space-y-3">
                    <div className="flex items-center justify-between border-b border-[#ECE6D8] pb-2">
                      <span className="text-xs font-bold text-[#1A1612] uppercase tracking-wide">
                        Curated Wedding Menu Blueprint
                      </span>
                      <span className="text-[11px] text-[#856525] font-medium">
                        Based on {cuisine}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="font-semibold text-[#1A1612] block mb-1">Welcome &amp; Starters:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-[#5C5344] text-[11px]">
                          {blueprint.customMenuRecommendation.welcomeDrinks?.slice(0, 2).map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                          {blueprint.customMenuRecommendation.starters?.slice(0, 2).map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-semibold text-[#1A1612] block mb-1">Live Counters &amp; Mains:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-[#5C5344] text-[11px]">
                          {blueprint.customMenuRecommendation.liveCounters?.slice(0, 2).map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                          {blueprint.customMenuRecommendation.mainCourse?.slice(0, 2).map((m, i) => (
                            <li key={i}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Budget-Saving Hacks */}
                {blueprint.savingHacks && blueprint.savingHacks.length > 0 && (
                  <div className="text-xs space-y-1.5">
                    <span className="font-semibold text-[#736A5B] uppercase tracking-wider block text-[11px]">
                      AI Optimization Tips:
                    </span>
                    {blueprint.savingHacks.map((hack, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[#52493A]">
                        <span className="text-[#856525] font-bold">✓</span>
                        <span className="text-[11px]">{hack}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action CTA */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (scope === 'bundle') {
                        onSelectVendorBundle({
                          hall: matchedHall,
                          caterer: matchedCaterer,
                          decor: matchedDecor,
                        });
                      } else if (scope === 'caterer' && matchedCaterer) {
                        onSelectSingleVendor(matchedCaterer);
                      } else if (scope === 'marriage_hall' && matchedHall) {
                        onSelectSingleVendor(matchedHall);
                      } else if (scope === 'decor' && matchedDecor) {
                        onSelectSingleVendor(matchedDecor);
                      }
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#1A1612] hover:bg-[#332C24] text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap text-center"
                  >
                    Lock This Match &amp; Open Customizer
                  </button>
                  <span className="text-[11px] text-[#7A7160]">
                    Direct vendor rates with zero platform commissions.
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center my-auto py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#F4EDE0] border border-[#DFD5C2] flex items-center justify-center text-[#856525] text-xl font-serif font-bold">
                  ₹
                </div>
                <h3 className="text-lg font-serif font-bold text-[#1A1612]">
                  Ready to Calculate Your Ideal Wedding Allocation?
                </h3>
                <p className="text-xs text-[#6E6554] max-w-md">
                  Choose between a full end-to-end package (Banquet + Catering + Decor) or focus solely on caterers, halls, or decorators. Click &quot;Generate AI Budget Blueprint&quot; on the left.
                </p>
                <button
                  type="button"
                  onClick={handleRunAiMatch}
                  className="px-5 py-2.5 bg-[#1A1612] text-white text-xs font-semibold rounded-lg hover:bg-[#332C24] transition-colors mt-2"
                >
                  Start With Current Inputs
                </button>
              </div>
            )}

            {errorMessage && (
              <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
