"use client";

import type { KedaiType, Amenity, PriceRange, State } from "@/types/kedai";
import { MALAYSIAN_STATES } from "@/types/kedai";

interface FiltersProps {
  selectedType: KedaiType | "all";
  selectedAmenities: Amenity[];
  selectedPriceRange: PriceRange | "all";
  selectedState: State | "all";
  onTypeChange: (type: KedaiType | "all") => void;
  onAmenityToggle: (amenity: Amenity) => void;
  onPriceRangeChange: (range: PriceRange | "all") => void;
  onStateChange: (state: State | "all") => void;
  onReset: () => void;
}

const KEDAI_TYPES: KedaiType[] = [
  "Traditional Kopitiam",
  "Modern Coffee Shop", 
  "Chain",
  "Mamak",
  "Cafe"
];

const AMENITIES: Amenity[] = [
  "WiFi",
  "Parking", 
  "Air Con",
  "Outdoor Seating",
  "Takeaway",
  "Delivery",
  "Card Payment",
  "Halal",
  "24 Hours",
  "Drive Thru"
];

const PRICE_RANGES: PriceRange[] = [
  "RM 2-8",
  "RM 5-15",
  "RM 8-25", 
  "RM 15-35"
];

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
        active
          ? "bg-[var(--accent)] text-white"
          : "bg-[var(--surface-2)] text-[var(--muted)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
      }`}
    >
      {label}
    </button>
  );
}

export default function Filters({
  selectedType,
  selectedAmenities,
  selectedPriceRange,
  selectedState,
  onTypeChange,
  onAmenityToggle,
  onPriceRangeChange,
  onStateChange,
  onReset,
}: FiltersProps) {
  const hasActiveFilters =
    selectedType !== "all" ||
    selectedAmenities.length > 0 ||
    selectedPriceRange !== "all" ||
    selectedState !== "all";

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-[var(--accent)] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Type */}
      <div>
        <h4 className="mb-2 text-xs font-medium text-[var(--muted)]">Type</h4>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All Types"
            active={selectedType === "all"}
            onClick={() => onTypeChange("all")}
          />
          {KEDAI_TYPES.map((type) => (
            <FilterChip
              key={type}
              label={type}
              active={selectedType === type}
              onClick={() => onTypeChange(type)}
            />
          ))}
        </div>
      </div>

      {/* State */}
      <div>
        <h4 className="mb-2 text-xs font-medium text-[var(--muted)]">State</h4>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All States"
            active={selectedState === "all"}
            onClick={() => onStateChange("all")}
          />
          {MALAYSIAN_STATES.map((state) => (
            <FilterChip
              key={state}
              label={state}
              active={selectedState === state}
              onClick={() => onStateChange(state)}
            />
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="mb-2 text-xs font-medium text-[var(--muted)]">Price Range</h4>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="Any Price"
            active={selectedPriceRange === "all"}
            onClick={() => onPriceRangeChange("all")}
          />
          {PRICE_RANGES.map((range) => (
            <FilterChip
              key={range}
              label={range}
              active={selectedPriceRange === range}
              onClick={() => onPriceRangeChange(range)}
            />
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h4 className="mb-2 text-xs font-medium text-[var(--muted)]">Amenities</h4>
        <div className="flex flex-wrap gap-2">
          {AMENITIES.map((amenity) => (
            <FilterChip
              key={amenity}
              label={amenity}
              active={selectedAmenities.includes(amenity)}
              onClick={() => onAmenityToggle(amenity)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}