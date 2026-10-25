export type ServiceCategory = 'all' | 'bundle' | 'marriage_hall' | 'caterer' | 'decor';

export interface MenuItem {
  id: string;
  name: string;
  category: 'Welcome Drinks' | 'Starters' | 'Live Counters' | 'Main Course' | 'Breads & Rice' | 'Desserts';
  isVeg: boolean;
  isSpecialty?: boolean;
  description?: string;
}

export interface Vendor {
  id: string;
  category: 'marriage_hall' | 'caterer' | 'decor';
  name: string;
  tagline: string;
  rating: number;
  reviewsCount: number;
  city: string;
  area: string;
  pricePerUnit: number;
  unitLabel: string; // e.g. "per plate", "per day rental", "per setup"
  capacityRange?: string; // for halls, e.g. "400 - 1,200 guests"
  minGuests?: number;
  maxGuests?: number;
  description: string;
  image: string;
  features: string[];
  cuisines?: string[]; // for caterers
  decorThemes?: string[]; // for decor
  hallType?: string[]; // e.g. ["Centrally AC", "Lawn + Ballroom", "Bridal Suites", "Valet Parking"]
  sampleMenu?: MenuItem[];
  badges: string[];
  contactPerson: string;
  phone: string;
  experienceYears: number;
  completedWeddings: number;
}

export interface CuratedBundle {
  id: string;
  title: string;
  subtitle: string;
  tier: 'Royal Splendor' | 'Classic Elegance' | 'Intimate Chic' | 'Grand Festive';
  guestCapacity: string;
  approxTotalCost: number;
  costPerGuest: number;
  hall: Vendor;
  caterer: Vendor;
  decor: Vendor;
  bundleDiscountPercent: number;
  highlights: string[];
}

export interface AiMatchRequest {
  serviceScope: 'bundle' | 'caterer' | 'marriage_hall' | 'decor';
  totalBudget: number; // in local currency (e.g., INR ₹)
  guestCount: number;
  eventType: string; // e.g., 'Grand Wedding & Reception', 'Engagement Ceremony', 'Sangeet & Mehendi', 'Anniversary Celebration'
  cuisinePreference: string; // e.g., 'Royal Awadhi & Mughlai', 'Traditional South Indian Feast', 'Pure Sattvic Veg & Chaat Live', 'Pan-Asian & Continental Fusion'
  decorTheme: string; // e.g., 'Royal Heritage Palace', 'Floral Enchantment & Orchids', 'Modern Minimalist Luxe', 'Boho Chic & Fairy Lights'
  city: string;
  eventDate?: string;
  dietaryRestrictions?: string[]; // e.g., ['Pure Veg', 'No Onion/Garlic', 'Halal Certified', 'Gluten Free']
  specialRequests?: string;
}

export interface AiBudgetBreakdown {
  venuePercentage: number;
  venueAmount: number;
  cateringPercentage: number;
  cateringAmount: number;
  decorPercentage: number;
  decorAmount: number;
  logisticsBufferPercentage: number;
  logisticsBufferAmount: number;
  estimatedCostPerPlate: number;
  feasibilityAssessment: 'Comfortable Surplus' | 'Optimally Balanced' | 'Budget Constrained';
  executiveSummary: string;
  matchedHallId?: string;
  matchedCatererId?: string;
  matchedDecorId?: string;
  matchRationale: string;
  customMenuRecommendation: {
    welcomeDrinks: string[];
    starters: string[];
    liveCounters: string[];
    mainCourse: string[];
    desserts: string[];
  };
  decorConcept: {
    colorPalette: string[];
    stageConcept: string;
    diningAmbience: string;
  };
  savingHacks: string[];
  negotiationTips: string[];
}
