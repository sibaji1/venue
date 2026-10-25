'use client';

import React, { useState } from 'react';

interface ConsultationModalProps {
  summary: string;
  onClose: () => void;
}

export function ConsultationModal({ summary, onClose }: ConsultationModalProps) {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [city, setCity] = useState<string>('Mumbai');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [refId, setRefId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setRefId('AF-HOLD-' + Math.floor(100000 + Math.random() * 900000));
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 border border-[#E2DDD2] shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-xs font-bold text-[#7A7160] hover:text-[#1A1612]"
        >
          ✕
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#856525] block">
                Direct Venue &amp; Catering Hold
              </span>
              <h3 className="text-xl font-serif font-bold text-[#1A1612]">
                Request Date Reservation
              </h3>
              <p className="text-xs text-[#6B6252] mt-1">
                Holds vendor slots for 14 days without obligation.
              </p>
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[#E8E2D5] rounded-lg text-xs text-[#52493A]">
              <span className="font-semibold block text-[#1A1612] mb-0.5">Package Details:</span>
              <p>{summary}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#1A1612] mb-1">
                  Primary Contact Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Roy &amp; Kabir"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DDD6C8] rounded-lg px-3 py-2 text-[#1A1612] focus:outline-none focus:border-[#B88E3E]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1A1612] mb-1">
                  WhatsApp Contact Number:
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98110 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DDD6C8] rounded-lg px-3 py-2 text-[#1A1612] focus:outline-none focus:border-[#B88E3E]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1A1612] mb-1">
                  Event Location:
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DDD6C8] rounded-lg px-3 py-2 text-[#1A1612] focus:outline-none focus:border-[#B88E3E]"
                >
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Goa">Goa</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#1A1612] hover:bg-[#332C24] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
              >
                Submit Date Hold Request
              </button>
            </div>
          </form>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-serif font-bold text-[#1A1612]">
              Date Hold Registered!
            </h3>
            <p className="text-xs text-[#52493A] max-w-sm mx-auto">
              Our Senior Banquet Concierge will reach out via WhatsApp at <span className="font-semibold text-[#1A1612]">{phone}</span> within 2 hours with venue floorplans and chef schedules.
            </p>

            <div className="p-3 bg-[#FAF8F5] border border-[#E8E2D5] rounded-lg max-w-xs mx-auto">
              <span className="text-[10px] uppercase text-[#7A7160] block font-semibold">
                Hold Tracking Reference
              </span>
              <span className="text-sm font-mono font-bold text-[#856525] tracking-wider">
                {refId}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-[#1A1612] text-white text-xs font-semibold rounded-lg hover:bg-[#332C24] transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
