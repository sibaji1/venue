import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import { AiMatchRequest, AiBudgetBreakdown } from '@/lib/types';
import { ALL_VENDORS } from '@/data/mockVendors';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const body: AiMatchRequest = await req.json();

    const {
      serviceScope = 'bundle',
      totalBudget = 1000000,
      guestCount = 400,
      eventType = 'Grand Wedding & Reception',
      cuisinePreference = 'Royal Awadhi & Mughlai',
      decorTheme = 'Royal Heritage Palace',
      city = 'Mumbai',
      eventDate = '2026-12-15',
      dietaryRestrictions = [],
      specialRequests = '',
    } = body;

    // Available vendor catalogue summary for Gemini grounding
    const vendorsContext = ALL_VENDORS.map((v) => ({
      id: v.id,
      category: v.category,
      name: v.name,
      city: v.city,
      pricePerUnit: v.pricePerUnit,
      unitLabel: v.unitLabel,
      capacityRange: v.capacityRange,
      cuisines: v.cuisines,
      decorThemes: v.decorThemes,
    }));

    const prompt = `You are the Chief Wedding Operations & Catering Director for AuraFeast.
A couple or family is planning an event with the following parameters:
- Service Scope Requested: ${serviceScope} (Choices: 'bundle' = complete end-to-end Marriage Hall + Caterer + Decor, or single focus: 'caterer', 'marriage_hall', 'decor')
- Total Available Budget: ₹${totalBudget.toLocaleString()}
- Expected Guest Count: ${guestCount} guests
- Event Type: ${eventType}
- Preferred Cuisine Style: ${cuisinePreference}
- Preferred Decor & Atmosphere: ${decorTheme}
- City / Region: ${city}
- Target Date: ${eventDate}
- Dietary Restraints: ${dietaryRestrictions.join(', ') || 'None specified'}
- Special Notes: ${specialRequests || 'Standard royal hospitality'}

Available Partner Vendors in our Network:
${JSON.stringify(vendorsContext, null, 2)}

TASK:
Analyze the budget math thoroughly:
1. If serviceScope is 'bundle':
   - Allocate the total budget logically:
     - Venue/Marriage Hall (approx 25% - 35%)
     - Food Catering (approx 40% - 55%, calculate per-plate budget by dividing catering total by ${guestCount})
     - Decor & Stage/Mandap (approx 12% - 20%)
     - Logistics, Service Staff & Emergency Buffer (approx 5% - 10%)
   - Match the best vendor IDs from our network for hall, caterer, and decor that fit within or closest to these brackets.
2. If serviceScope is single focus (e.g. 'caterer' only):
   - Allocate 85-90% to catering and 10-15% to tasting/staffing/buffer. Match the best caterer.
3. If serviceScope is 'marriage_hall' only:
   - Allocate 85-90% to hall rental and 10-15% to buffer. Match the best hall.
4. If serviceScope is 'decor' only:
   - Allocate 85-90% to floral/stage setup and 10-15% to buffer. Match the best decor vendor.
5. Create a bespoke, mouth-watering menu recommendation (drinks, starters, live counters, main course, desserts) tailored specifically to the couple's requested cuisine (${cuisinePreference}).
6. Propose a cohesive styling concept (color palette, stage concept, dining ambience).
7. Provide 3 high-impact budget-saving hacks and 2 negotiation pointers.

Respond STRICTLY in valid JSON matching this exact structure:
{
  "venuePercentage": number (e.g. 30),
  "venueAmount": number,
  "cateringPercentage": number (e.g. 50),
  "cateringAmount": number,
  "decorPercentage": number (e.g. 15),
  "decorAmount": number,
  "logisticsBufferPercentage": number (e.g. 5),
  "logisticsBufferAmount": number,
  "estimatedCostPerPlate": number,
  "feasibilityAssessment": "Comfortable Surplus" | "Optimally Balanced" | "Budget Constrained",
  "executiveSummary": "string explaining the budget strategy",
  "matchedHallId": "string (valid id from network or null if single focus not hall)",
  "matchedCatererId": "string (valid id from network or null if single focus not caterer)",
  "matchedDecorId": "string (valid id from network or null if single focus not decor)",
  "matchRationale": "string detailing why these vendors were selected",
  "customMenuRecommendation": {
    "welcomeDrinks": ["string", "string"],
    "starters": ["string", "string", "string"],
    "liveCounters": ["string", "string"],
    "mainCourse": ["string", "string", "string"],
    "desserts": ["string", "string"]
  },
  "decorConcept": {
    "colorPalette": ["#hex1", "#hex2", "#hex3"],
    "stageConcept": "string description",
    "diningAmbience": "string description"
  },
  "savingHacks": ["string", "string", "string"],
  "negotiationTips": ["string", "string"]
}`;

    let resultData: AiBudgetBreakdown;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const responseText = response.text || '';
      resultData = JSON.parse(responseText);
    } catch (geminiError) {
      console.warn('Gemini API call failed or key missing, falling back to heuristic engine:', geminiError);

      // Intelligent deterministic calculation fallback
      const isBundle = serviceScope === 'bundle';
      const isCatererOnly = serviceScope === 'caterer';
      const isHallOnly = serviceScope === 'marriage_hall';
      const isDecorOnly = serviceScope === 'decor';

      let venuePct = isBundle ? 32 : isHallOnly ? 85 : 0;
      let caterPct = isBundle ? 48 : isCatererOnly ? 88 : 0;
      let decorPct = isBundle ? 15 : isDecorOnly ? 85 : 0;
      let buffPct = 100 - (venuePct + caterPct + decorPct);

      const caterAmt = Math.round((totalBudget * caterPct) / 100);
      const venueAmt = Math.round((totalBudget * venuePct) / 100);
      const decorAmt = Math.round((totalBudget * decorPct) / 100);
      const buffAmt = totalBudget - (caterAmt + venueAmt + decorAmt);
      const perPlate = isCatererOnly || isBundle ? Math.max(700, Math.round(caterAmt / Math.max(50, guestCount))) : 0;

      // Select matching IDs
      let matchedHallId = 'hall-1';
      if (guestCount > 800) matchedHallId = 'hall-3';
      else if (totalBudget < 800000) matchedHallId = 'hall-2';

      let matchedCatererId = 'caterer-1';
      if (cuisinePreference.toLowerCase().includes('south')) matchedCatererId = 'caterer-2';
      else if (cuisinePreference.toLowerCase().includes('veg') || cuisinePreference.toLowerCase().includes('jain')) matchedCatererId = 'caterer-4';
      else if (cuisinePreference.toLowerCase().includes('fusion') || cuisinePreference.toLowerCase().includes('asian')) matchedCatererId = 'caterer-3';

      let matchedDecorId = 'decor-1';
      if (decorTheme.toLowerCase().includes('heritage') || decorTheme.toLowerCase().includes('marigold')) matchedDecorId = 'decor-2';
      else if (decorTheme.toLowerCase().includes('modern') || decorTheme.toLowerCase().includes('luxe')) matchedDecorId = 'decor-3';
      else if (decorTheme.toLowerCase().includes('boho') || decorTheme.toLowerCase().includes('lawn')) matchedDecorId = 'decor-4';

      resultData = {
        venuePercentage: venuePct,
        venueAmount: venueAmt,
        cateringPercentage: caterPct,
        cateringAmount: caterAmt,
        decorPercentage: decorPct,
        decorAmount: decorAmt,
        logisticsBufferPercentage: buffPct,
        logisticsBufferAmount: buffAmt,
        estimatedCostPerPlate: perPlate,
        feasibilityAssessment: perPlate >= 1200 || isHallOnly || isDecorOnly ? 'Optimally Balanced' : perPlate >= 900 ? 'Optimally Balanced' : 'Budget Constrained',
        executiveSummary: `For ₹${totalBudget.toLocaleString()} covering ${guestCount} guests, our AI blueprint aligns ₹${caterAmt.toLocaleString()} (${caterPct}%) for culinary excellence at ~₹${perPlate}/plate, ₹${venueAmt.toLocaleString()} for venue leasing, and ₹${decorAmt.toLocaleString()} for bespoke stage design.`,
        matchedHallId: isDecorOnly || isCatererOnly ? undefined : matchedHallId,
        matchedCatererId: isHallOnly || isDecorOnly ? undefined : matchedCatererId,
        matchedDecorId: isHallOnly || isCatererOnly ? undefined : matchedDecorId,
        matchRationale: `Selected top verified local partners optimized for ${guestCount} attendees with ${cuisinePreference} specialty and ${decorTheme} decor capability.`,
        customMenuRecommendation: {
          welcomeDrinks: ['Royal Kesar Badam Sharbat', 'Cold Pressed Kokum Mint Cooler'],
          starters: ['Melt-in-Mouth Galouti Kebabs on Coin Sheermal', 'Paneer Angara Tikka with Mint Coulis', 'Crispy Lotus Stem in Sweet Chili'],
          liveCounters: ['Banarasi Palak Patta Chaat & Puchka Bar', 'Artisanal Woodfire Bread & Tandoor Station'],
          mainCourse: ['Slow Simmered Dal Bukhara (24hr pot)', 'Royal Shahi Paneer Kaju Masala', 'Dum Subz Biryani with Burani Raita'],
          desserts: ['Hot Kesari Jalebi with Pistachio Rabdi', 'Baked Gulab Jamun Tartlets']
        },
        decorConcept: {
          colorPalette: ['#FAF7F2', '#D4AF37', '#800020'],
          stageConcept: 'Bespoke arched mandap flanked by fresh fragrant tuberoses, gold lattice jali and soft amber wash lights.',
          diningAmbience: 'Round banquet tables draped in ivory raw silk, brass candle candelabras and custom printed menu cards.'
        },
        savingHacks: [
          'Choose seasonal local blooms for table centerpieces while keeping exotic orchids concentrated on the couple stage.',
          'Consolidate welcome drinks to 2 signature craft beverages instead of open beverage cans to reduce waste by 30%.',
          'Opt for 4 curated live food counters rather than a 40-dish stationary cold buffet to elevate dining freshness.'
        ],
        negotiationTips: [
          'Inquire about complimentary pre-event food tasting session for 6 family members prior to contract execution.',
          'Request venue management to include overnight green room access and basic sound rigging within the rental price.'
        ]
      };
    }

    return NextResponse.json(resultData);
  } catch (error) {
    console.error('API Error in /api/ai-match:', error);
    return NextResponse.json(
      { error: 'Failed to process AI budget match request. Please check inputs and try again.' },
      { status: 500 }
    );
  }
}
