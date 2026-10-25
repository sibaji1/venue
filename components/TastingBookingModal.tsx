'use client';

import React, { useState } from 'react';
import { Vendor } from '@/lib/types';

interface TastingBookingModalProps {
  caterer: Vendor | null;
  onClose: () => void;
  defaultDate?: string;
}

export function TastingBookingModal({
  caterer,
  onClose,
  defaultDate = '2026-11-28',
}: TastingBookingModalProps) {
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [tastingDate, setTastingDate] = useState<string>(defaultDate);
  const [attendees, setAttendees] = useState<number>(4);
  const [dietaryNotes, setDietaryNotes] = useState<string>('Pure Vegetarian & Jain Counter');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  if (!caterer) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;

    const randomId = 'AF-TASTE-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(randomId);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 border border-[#E2DDD2] shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-xs font-bold text-[#7A7160] hover:text-[#1A1612]"
        >
          ✕
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#856525] block">
                VIP Tasting Concierge
              </span>
              <h3 className="text-xl font-serif font-bold text-[#1A1612]">
                Schedule Pre-Wedding Food Tasting
              </h3>
              <p className="text-xs text-[#6B6252] mt-1">
                Experience a private chef tasting with {caterer.name}. Complimentary for up to 6 family members.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#1A1612] mb-1">
                  Full Name (Bride / Groom / Host):
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Sharma &amp; Siddharth"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DDD6C8] rounded-lg px-3 py-2 text-[#1A1612] focus:outline-none focus:border-[#B88E3E]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1A1612] mb-1">
                  Mobile / WhatsApp Number:
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98200 00000"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DDD6C8] rounded-lg px-3 py-2 text-[#1A1612] focus:outline-none focus:border-[#B88E3E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1A1612] mb-1">
                    Preferred Date:
                  </label>
                  <input
                    type="date"
                    required
                    value={tastingDate}
                    onChange={(e) => setTastingDate(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#DDD6C8] rounded-lg px-3 py-2 text-[#1A1612] focus:outline-none focus:border-[#B88E3E]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1A1612] mb-1">
                    Family Attendees:
                  </label>
                  <select
                    value={attendees}
                    onChange={(e) => setAttendees(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-[#DDD6C8] rounded-lg px-3 py-2 text-[#1A1612] focus:outline-none focus:border-[#B88E3E]"
                  >
                    <option value={2}>2 Guests</option>
                    <option value={4}>4 Guests (Recommended)</option>
                    <option value={6}>6 Guests (Max Free Tier)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1A1612] mb-1">
                  Special Tasting Dishes / Dietary Preferences:
                </label>
                <textarea
                  rows={2}
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  placeholder="e.g. Test Biryani, Galouti Kebab, Jain options, and Rabdi Jalebi..."
                  className="w-full bg-[#FAF8F5] border border-[#DDD6C8] rounded-lg px-3 py-2 text-[#1A1612] focus:outline-none focus:border-[#B88E3E]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#1A1612] hover:bg-[#332C24] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
              >
                Confirm Food Tasting Appointment
              </button>
              <p className="text-[10px] text-[#7A7160] text-center mt-2">
                The Master Chef will prepare 6 live sample portions at the test kitchen or at your residence.
              </p>
            </div>
          </form>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-serif font-bold text-[#1A1612]">
              Tasting Session Reserved!
            </h3>
            <p className="text-xs text-[#52493A] max-w-sm mx-auto">
              Your appointment with <span className="font-semibold text-[#1A1612]">{caterer.name}</span> has been confirmed for {tastingDate} for {attendees} guests.
            </p>

            <div className="p-3 bg-[#FAF8F5] border border-[#E8E2D5] rounded-lg max-w-xs mx-auto">
              <span className="text-[10px] uppercase text-[#7A7160] block font-semibold">
                Passcode / Ref ID
              </span>
              <span className="text-sm font-mono font-bold text-[#856525] tracking-wider">
                {confirmationCode}
              </span>
            </div>

            <p className="text-[11px] text-[#7A7160]">
              Head Chef contact: {caterer.contactPerson} ({caterer.phone}). A WhatsApp invitation has been dispatched.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-[#1A1612] text-white text-xs font-semibold rounded-lg hover:bg-[#332C24] transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
