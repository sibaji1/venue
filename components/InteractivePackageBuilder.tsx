'use client';

import React, { useState } from 'react';
import { Vendor } from '@/lib/types';
import { ALL_VENDORS } from '@/data/mockVendors';

interface InteractivePackageBuilderProps {
  selectedHall?: Vendor;
  selectedCaterer?: Vendor;
  selectedDecor?: Vendor;
  onUpdateHall: (vendor?: Vendor) => void;
  onUpdateCaterer: (vendor?: Vendor) => void;
  onUpdateDecor: (vendor?: Vendor) => void;
  onScheduleTasting: (caterer?: Vendor) => void;
  onBookConsultation: (summary: string) => void;
}

interface AddOnOption {
  id: string;
  name: string;
  type: 'per_guest' | 'flat';
  cost: number;
  category: 'catering' | 'hall' | 'decor';
  description: string;
}

const ADD_ON_OPTIONS: AddOnOption[] = [
  {
    id: 'addon-chaat',
    name: 'Live Banarasi Chaat & Puchka Pavilion (5 flavored waters)',
    type: 'per_guest',
    cost: 120,
    category: 'catering',
    description: 'Live chef preparing crispy palak patta chaat, dahi bhalla and spicy mint puchkas.',
  },
  {
    id: 'addon-mocktail',
    name: 'Liquid Nitrogen & Artisanal Mocktail Bar',
    type: 'per_guest',
    cost: 160,
    category: 'catering',
    description: 'Dry ice smoky berry coolers, smoked rosemary lemonade and fresh tender coconut coladas.',
  },
  {
    id: 'addon-valet',
    name: 'Uniformed Valet Parking Concierge (8 drivers + supervisor)',
    type: 'flat',
    cost: 25000,
    category: 'hall',
    description: 'Smooth arrival logistics and baggage assistance for all arriving cars.',
  },
  {
    id: 'addon-mirror-aisle',
    name: 'High-Gloss Mirror Reflective Aisle with Warm Uplighters',
    type: 'flat',
    cost: 35000,
    category: 'decor',
    description: 'Gleaming 60-foot bridal entrance walkway reflecting chandelier light.',
  },
];

export function InteractivePackageBuilder({
  selectedHall,
  selectedCaterer,
  selectedDecor,
  onUpdateHall,
  onUpdateCaterer,
  onUpdateDecor,
  onScheduleTasting,
  onBookConsultation,
}: InteractivePackageBuilderProps) {
  const [guests, setGuests] = useState<number>(400);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'addon-chaat',
  ]);
  const [targetDate, setTargetDate] = useState<string>('2026-12-18');
  const [showInvoiceDraft, setShowInvoiceDraft] = useState<boolean>(false);
  const [invoiceRefId, setInvoiceRefId] = useState<string>('AF-2026-84920');

  // Financial calculations
  const hallCost = selectedHall ? selectedHall.pricePerUnit : 0;
  const cateringCost = selectedCaterer ? selectedCaterer.pricePerUnit * guests : 0;
  const decorCost = selectedDecor ? selectedDecor.pricePerUnit : 0;

  // Add-ons calculation
  let addonsCost = 0;
  selectedAddons.forEach((addonId) => {
    const item = ADD_ON_OPTIONS.find((a) => a.id === addonId);
    if (item) {
      if (item.type === 'per_guest') {
        addonsCost += item.cost * guests;
      } else {
        addonsCost += item.cost;
      }
    }
  });

  const subtotal = hallCost + cateringCost + decorCost + addonsCost;
  // Apply 10% bundle discount if all 3 vendor categories are selected
  const isCompleteBundle = Boolean(selectedHall && selectedCaterer && selectedDecor);
  const bundleDiscount = isCompleteBundle ? Math.round(subtotal * 0.1) : 0;
  const gstTax = Math.round((subtotal - bundleDiscount) * 0.08); // average effective GST
  const grandTotal = subtotal - bundleDiscount + gstTax;
  const perGuestTotal = guests > 0 ? Math.round(grandTotal / guests) : 0;

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleDownloadInvoice = () => {
    setInvoiceRefId(`AF-2026-${Math.floor(10000 + Math.random() * 90000)}`);
    setShowInvoiceDraft(true);
  };

  return (
    <section id="package-builder" className="py-14 sm:py-20 bg-white border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#9A7B38] mb-1">
            Live Package Customizer
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1612] tracking-tight">
            Build &amp; Price Your Dream Wedding
          </h2>
          <p className="mt-1 text-sm text-[#615746]">
            Add, swap or remove vendors. Adjust guest count and catering live-counters to see real-time price updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vendor Slots & Addons */}
          <div className="lg:col-span-7 space-y-6">
            {/* Guest Slider Box */}
            <div className="p-4 sm:p-5 bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-semibold uppercase text-[#736A5B] tracking-wider block">
                    Expected Number of Guests
                  </label>
                  <span className="text-xs text-[#8C8372]">
                    Recalculates per-plate catering food, seating &amp; cutlery charges
                  </span>
                </div>
                <span className="text-xl font-bold font-serif text-[#1A1612] tabular-nums">
                  {guests} Guests
                </span>
              </div>

              <input
                type="range"
                min={100}
                max={1500}
                step={25}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full accent-[#B88E3E] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#8C8372] tabular-nums">
                <span>100 Guests</span>
                <span>500 Guests</span>
                <span>1,500 Guests</span>
              </div>
            </div>

            {/* Vendor Slots: 1. Marriage Hall */}
            <div className="p-4 sm:p-5 bg-white border border-[#E2DDD2] rounded-xl space-y-3">
              <div className="flex items-center justify-between border-b border-[#EFECE4] pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A1612]">
                  1. Marriage Hall / Banquet
                </span>
                {selectedHall && (
                  <button
                    type="button"
                    onClick={() => onUpdateHall(undefined)}
                    className="text-[11px] text-red-600 hover:text-red-800"
                  >
                    Remove Hall
                  </button>
                )}
              </div>

              {selectedHall ? (
                <div className="flex items-start justify-between gap-4 pt-1">
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1612]">
                      {selectedHall.name}
                    </h4>
                    <p className="text-xs text-[#6B6252] mt-0.5">
                      {selectedHall.city} · {selectedHall.capacityRange}
                    </p>
                    <span className="inline-block mt-1 text-[11px] text-[#856525] font-medium">
                      AC Ballroom &amp; 2 Bridal Suites Included
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-[#1A1612] tabular-nums">
                      ₹{selectedHall.pricePerUnit.toLocaleString()}
                    </span>
                    <span className="block text-[10px] text-[#8C8372]">full day rental</span>
                  </div>
                </div>
              ) : (
                <div className="py-4 text-center border border-dashed border-[#DDD6C8] rounded-lg">
                  <p className="text-xs text-[#7A7160] mb-2">No hall selected (focusing on food only?)</p>
                  <select
                    onChange={(e) => {
                      const found = ALL_VENDORS.find((v) => v.id === e.target.value);
                      if (found) onUpdateHall(found);
                    }}
                    defaultValue=""
                    className="text-xs bg-[#FAF8F5] border border-[#DDD6C8] rounded-md px-3 py-1.5 text-[#1A1612]"
                  >
                    <option value="" disabled>+ Choose a Marriage Hall</option>
                    {ALL_VENDORS.filter((v) => v.category === 'marriage_hall').map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} (₹{h.pricePerUnit.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Vendor Slots: 2. Gourmet Caterer */}
            <div className="p-4 sm:p-5 bg-white border border-[#E2DDD2] rounded-xl space-y-3">
              <div className="flex items-center justify-between border-b border-[#EFECE4] pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A1612]">
                  2. Gourmet Caterers &amp; Kitchen
                </span>
                {selectedCaterer && (
                  <button
                    type="button"
                    onClick={() => onUpdateCaterer(undefined)}
                    className="text-[11px] text-red-600 hover:text-red-800"
                  >
                    Remove Caterer
                  </button>
                )}
              </div>

              {selectedCaterer ? (
                <div className="flex items-start justify-between gap-4 pt-1">
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1612]">
                      {selectedCaterer.name}
                    </h4>
                    <p className="text-xs text-[#6B6252] mt-0.5">
                      {selectedCaterer.cuisines?.join(' · ')}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onScheduleTasting(selectedCaterer)}
                        className="text-xs text-[#856525] font-semibold hover:underline"
                      >
                        Schedule Free Food Tasting Session →
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-[#1A1612] tabular-nums">
                      ₹{selectedCaterer.pricePerUnit.toLocaleString()}
                    </span>
                    <span className="block text-[10px] text-[#8C8372]">
                      / plate × {guests} guests
                    </span>
                    <span className="block text-xs font-semibold text-[#856525] mt-1 tabular-nums">
                      ₹{(selectedCaterer.pricePerUnit * guests).toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-4 text-center border border-dashed border-[#DDD6C8] rounded-lg">
                  <p className="text-xs text-[#7A7160] mb-2">No caterer selected</p>
                  <select
                    onChange={(e) => {
                      const found = ALL_VENDORS.find((v) => v.id === e.target.value);
                      if (found) onUpdateCaterer(found);
                    }}
                    defaultValue=""
                    className="text-xs bg-[#FAF8F5] border border-[#DDD6C8] rounded-md px-3 py-1.5 text-[#1A1612]"
                  >
                    <option value="" disabled>+ Choose a Master Caterer</option>
                    {ALL_VENDORS.filter((v) => v.category === 'caterer').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} (₹{c.pricePerUnit}/plate)
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Vendor Slots: 3. Decor & Styling */}
            <div className="p-4 sm:p-5 bg-white border border-[#E2DDD2] rounded-xl space-y-3">
              <div className="flex items-center justify-between border-b border-[#EFECE4] pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A1612]">
                  3. Decor &amp; Mandap Stylist
                </span>
                {selectedDecor && (
                  <button
                    type="button"
                    onClick={() => onUpdateDecor(undefined)}
                    className="text-[11px] text-red-600 hover:text-red-800"
                  >
                    Remove Decor
                  </button>
                )}
              </div>

              {selectedDecor ? (
                <div className="flex items-start justify-between gap-4 pt-1">
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1612]">
                      {selectedDecor.name}
                    </h4>
                    <p className="text-xs text-[#6B6252] mt-0.5">
                      {selectedDecor.decorThemes?.join(' · ')}
                    </p>
                    <span className="inline-block mt-1 text-[11px] text-[#856525] font-medium">
                      Stage Mandap, Floral Entrance &amp; Dining Table Ambience
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-[#1A1612] tabular-nums">
                      ₹{selectedDecor.pricePerUnit.toLocaleString()}
                    </span>
                    <span className="block text-[10px] text-[#8C8372]">full setup</span>
                  </div>
                </div>
              ) : (
                <div className="py-4 text-center border border-dashed border-[#DDD6C8] rounded-lg">
                  <p className="text-xs text-[#7A7160] mb-2">No decorator selected</p>
                  <select
                    onChange={(e) => {
                      const found = ALL_VENDORS.find((v) => v.id === e.target.value);
                      if (found) onUpdateDecor(found);
                    }}
                    defaultValue=""
                    className="text-xs bg-[#FAF8F5] border border-[#DDD6C8] rounded-md px-3 py-1.5 text-[#1A1612]"
                  >
                    <option value="" disabled>+ Choose a Decor Vendor</option>
                    {ALL_VENDORS.filter((v) => v.category === 'decor').map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} (₹{d.pricePerUnit.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Culinary & Venue Add-ons */}
            <div className="p-4 sm:p-5 bg-white border border-[#E2DDD2] rounded-xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A1612] block border-b border-[#EFECE4] pb-2">
                Recommended Live Counters &amp; Upgrades
              </span>

              <div className="space-y-2.5">
                {ADD_ON_OPTIONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  const itemCost =
                    addon.type === 'per_guest' ? addon.cost * guests : addon.cost;
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-start justify-between gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                        isChecked
                          ? 'border-[#B88E3E] bg-[#FAF6EE]'
                          : 'border-[#EAE5D8] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddon(addon.id)}
                          className="mt-0.5 accent-[#B88E3E]"
                        />
                        <div>
                          <div className="text-xs font-semibold text-[#1A1612]">
                            {addon.name}
                          </div>
                          <div className="text-[11px] text-[#6B6252] mt-0.5">
                            {addon.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-[#1A1612] tabular-nums">
                          +₹{itemCost.toLocaleString()}
                        </span>
                        <span className="block text-[10px] text-[#8C8372]">
                          {addon.type === 'per_guest' ? `(₹${addon.cost}/head)` : 'flat'}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Itemized Receipt & Checkout Box */}
          <div className="lg:col-span-5 bg-[#FCFBF9] border border-[#E2DDD2] rounded-2xl p-6 sm:p-7 space-y-6 sticky top-28">
            <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-3">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#7A7160] font-semibold">
                  Live Quotation Summary
                </span>
                <h3 className="text-lg font-serif font-bold text-[#1A1612]">
                  {isCompleteBundle ? 'Complete Royal Wedding Bundle' : 'Customized Service Package'}
                </h3>
              </div>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="text-xs font-medium bg-white border border-[#DDD6C8] rounded px-2 py-1 text-[#1A1612]"
              />
            </div>

            {/* Receipt Table */}
            <div className="space-y-3 text-xs">
              {selectedHall && (
                <div className="flex items-center justify-between">
                  <span className="text-[#595042]">Marriage Hall Rental ({selectedHall.city})</span>
                  <span className="font-semibold text-[#1A1612] tabular-nums">
                    ₹{hallCost.toLocaleString()}
                  </span>
                </div>
              )}

              {selectedCaterer && (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[#595042]">Catering ({guests} Guests × ₹{selectedCaterer.pricePerUnit})</span>
                  </div>
                  <span className="font-semibold text-[#1A1612] tabular-nums">
                    ₹{cateringCost.toLocaleString()}
                  </span>
                </div>
              )}

              {selectedDecor && (
                <div className="flex items-center justify-between">
                  <span className="text-[#595042]">Mandap &amp; Floral Styling</span>
                  <span className="font-semibold text-[#1A1612] tabular-nums">
                    ₹{decorCost.toLocaleString()}
                  </span>
                </div>
              )}

              {addonsCost > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-[#595042]">Selected Live Counters &amp; Add-ons</span>
                  <span className="font-semibold text-[#1A1612] tabular-nums">
                    ₹{addonsCost.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="border-t border-[#EFECE4] pt-2 flex items-center justify-between">
                <span className="text-[#7A7160]">Subtotal</span>
                <span className="font-semibold text-[#1A1612] tabular-nums">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>

              {isCompleteBundle && (
                <div className="flex items-center justify-between text-[#856525]">
                  <span>Bundle Booking Discount (10%)</span>
                  <span className="font-bold tabular-nums">-₹{bundleDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[#7A7160]">
                <span>Estimated Taxes &amp; Service Charge</span>
                <span className="font-medium tabular-nums">+₹{gstTax.toLocaleString()}</span>
              </div>

              <div className="border-t-2 border-[#1A1612] pt-3 flex items-baseline justify-between">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1A1612] block">
                    Estimated Grand Total
                  </span>
                  <span className="text-[11px] text-[#7A7160]">
                    Effective ~₹{perGuestTotal.toLocaleString()} per guest
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-serif font-bold text-[#1A1612] tabular-nums">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() =>
                  onBookConsultation(
                    `Inquiry for ${guests} guests on ${targetDate}. Total Estimate: ₹${grandTotal.toLocaleString()}.`
                  )
                }
                className="w-full py-3.5 px-4 bg-[#1A1612] hover:bg-[#332C24] text-white font-semibold text-xs tracking-wider uppercase rounded-xl shadow-sm transition-all text-center block"
              >
                Request Date Hold &amp; Formal Quote
              </button>

              {selectedCaterer && (
                <button
                  type="button"
                  onClick={() => onScheduleTasting(selectedCaterer)}
                  className="w-full py-2.5 px-4 bg-[#FAF6EE] hover:bg-[#F2ECE1] text-[#856525] border border-[#DFCFA8] font-semibold text-xs rounded-xl transition-all text-center block"
                >
                  Schedule Free Food Tasting Session
                </button>
              )}

              <button
                type="button"
                onClick={handleDownloadInvoice}
                className="w-full py-2 px-4 bg-transparent hover:bg-[#F2ECE1] text-[#736A5B] font-medium text-xs rounded-lg transition-all text-center block"
              >
                📄 Preview Printable Estimate Sheet
              </button>
            </div>

            <p className="text-[11px] text-[#8C8372] text-center leading-relaxed">
              Price lock guarantee for 14 days upon formal date hold request. Direct vendor contracts with zero hidden broker fees.
            </p>
          </div>
        </div>
      </div>

      {/* Printable Invoice Modal */}
      {showInvoiceDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 border border-[#E2DDD2] shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#1A1612]">
                  AuraFeast Formal Quotation Draft
                </h3>
                <span className="text-xs text-[#7A7160]">
                  Reference ID: {invoiceRefId}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowInvoiceDraft(false)}
                className="text-sm font-bold text-[#7A7160] hover:text-[#1A1612]"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#4F4638]">
              <div className="grid grid-cols-2 gap-4 p-3 bg-[#FAF8F5] rounded-lg">
                <div>
                  <span className="text-[11px] text-[#7A7160] block">Guest Count:</span>
                  <span className="font-bold text-[#1A1612]">{guests} Attendees</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#7A7160] block">Event Date:</span>
                  <span className="font-bold text-[#1A1612]">{targetDate}</span>
                </div>
              </div>

              <div className="space-y-2 border-b border-[#EFECE4] pb-4">
                <span className="font-bold text-[#1A1612] block">Line Item Breakdown:</span>
                {selectedHall && (
                  <div className="flex justify-between">
                    <span>Venue: {selectedHall.name}</span>
                    <span className="tabular-nums font-medium">₹{hallCost.toLocaleString()}</span>
                  </div>
                )}
                {selectedCaterer && (
                  <div className="flex justify-between">
                    <span>Catering: {selectedCaterer.name} ({guests} × ₹{selectedCaterer.pricePerUnit})</span>
                    <span className="tabular-nums font-medium">₹{cateringCost.toLocaleString()}</span>
                  </div>
                )}
                {selectedDecor && (
                  <div className="flex justify-between">
                    <span>Decor: {selectedDecor.name}</span>
                    <span className="tabular-nums font-medium">₹{decorCost.toLocaleString()}</span>
                  </div>
                )}
                {addonsCost > 0 && (
                  <div className="flex justify-between">
                    <span>Add-on Live Counters &amp; Upgrades</span>
                    <span className="tabular-nums font-medium">₹{addonsCost.toLocaleString()}</span>
                  </div>
                )}
                {bundleDiscount > 0 && (
                  <div className="flex justify-between text-[#856525]">
                    <span>10% Package Discount</span>
                    <span className="tabular-nums font-medium">-₹{bundleDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#7A7160]">
                  <span>GST &amp; Service Charges</span>
                  <span className="tabular-nums font-medium">+₹{gstTax.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between pt-2 text-sm font-bold text-[#1A1612]">
                <span>Total Payable Amount</span>
                <span className="text-xl font-serif tabular-nums">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 border border-[#DDD6C8] text-xs font-semibold rounded-lg hover:bg-[#FAF8F5]"
              >
                Print / Save PDF
              </button>
              <button
                type="button"
                onClick={() => setShowInvoiceDraft(false)}
                className="px-4 py-2 bg-[#1A1612] text-white text-xs font-semibold rounded-lg hover:bg-[#332C24]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
