export interface Coordinates {
  lat: number;
  lng: number;
}

export interface KedaiKopi {
  id: string;
  name: string;
  slug: string;
  description?: string;
  location: {
    address: string;
    state: string;
    city: string;
    coordinates: Coordinates;
  };
  contact?: {
    phone?: string;
    website?: string;
  };
  type: "Traditional Kopitiam" | "Modern Coffee Shop" | "Chain" | "Mamak" | "Cafe";
  specialties: string[];
  amenities: string[];
  openHours?: string;
  priceRange: "RM 2-8" | "RM 5-15" | "RM 8-25" | "RM 15-35";
  rating?: number;
  images?: string[];
  featured?: boolean;
}

export type KedaiType = KedaiKopi["type"];
export type Amenity = 
  | "WiFi" 
  | "Parking" 
  | "Air Con" 
  | "Outdoor Seating"
  | "Takeaway" 
  | "Delivery"
  | "Card Payment"
  | "Halal"
  | "24 Hours"
  | "Drive Thru";

export type PriceRange = KedaiKopi["priceRange"];

export interface UserLocation {
  lat: number;
  lng: number;
  timestamp: number;
}

export interface KedaiWithDistance extends KedaiKopi {
  distance?: number; // in km
}

export const MALAYSIAN_STATES = [
  "Kuala Lumpur",
  "Selangor",
  "Penang", 
  "Johor",
  "Perak",
  "Kedah",
  "Kelantan",
  "Terengganu",
  "Pahang",
  "Negeri Sembilan",
  "Melaka",
  "Sabah",
  "Sarawak",
  "Perlis",
  "Putrajaya",
  "Labuan"
] as const;

export type State = typeof MALAYSIAN_STATES[number];