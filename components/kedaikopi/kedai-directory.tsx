"use client";

import { useState, useMemo, useEffect } from "react";
import { searchKedai } from "@/lib/search";
import { addDistanceAndSort } from "@/lib/location";
import LocationPermission from "./location-permission";
import SearchBar from "./search-bar";
import Filters from "./filters";
import KedaiGrid from "./kedai-grid";
import type { 
  KedaiKopi, 
  KedaiWithDistance, 
  UserLocation, 
  KedaiType, 
  Amenity, 
  PriceRange, 
  State 
} from "@/types/kedai";

interface KedaiDirectoryProps {
  kedaiList: KedaiKopi[];
}

export default function KedaiDirectory({ kedaiList }: KedaiDirectoryProps) {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<KedaiType | "all">("all");
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | "all">("all");
  const [selectedState, setSelectedState] = useState<State | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  const handleLocationUpdate = (location: UserLocation | null) => {
    setUserLocation(location);
  };

  const handleAmenityToggle = (amenity: Amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleResetFilters = () => {
    setSelectedType("all");
    setSelectedAmenities([]);
    setSelectedPriceRange("all");
    setSelectedState("all");
  };

  // Filter and sort kedai
  const filteredKedaiList = useMemo(() => {
    // Start with search results
    let results = searchQuery ? searchKedai(kedaiList, searchQuery) : kedaiList;

    // Apply filters
    results = results.filter((kedai) => {
      if (selectedType !== "all" && kedai.type !== selectedType) return false;
      if (selectedState !== "all" && kedai.location.state !== selectedState) return false;
      if (selectedPriceRange !== "all" && kedai.priceRange !== selectedPriceRange) return false;
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(amenity =>
          kedai.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }
      return true;
    });

    // Sort by distance if location is available
    if (userLocation) {
      return addDistanceAndSort(results, userLocation);
    }

    // Sort featured first, then by rating
    return results.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      if (a.rating && b.rating) return b.rating - a.rating;
      if (a.rating && !b.rating) return -1;
      if (!a.rating && b.rating) return 1;
      return 0;
    }).map(kedai => ({ ...kedai, distance: undefined })) as KedaiWithDistance[];
  }, [kedaiList, searchQuery, selectedType, selectedAmenities, selectedPriceRange, selectedState, userLocation]);

  // Check for active filters
  const hasActiveFilters = selectedType !== "all" || selectedAmenities.length > 0 || selectedPriceRange !== "all" || selectedState !== "all";

  return (
    <div className="space-y-6">
      {/* Location Permission */}
      <LocationPermission onLocationUpdate={handleLocationUpdate} />

      {/* Search */}
      <SearchBar onSearch={setSearchQuery} />

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs text-white">
                {[selectedType !== "all" ? 1 : 0, selectedAmenities.length, selectedPriceRange !== "all" ? 1 : 0, selectedState !== "all" ? 1 : 0].reduce((a, b) => a + b, 0)}
              </span>
            )}
          </button>

          {/* Quick stats */}
          <div className="text-sm text-[var(--muted)]">
            {userLocation ? "Sorted by distance" : "Showing featured first"}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Filters
          selectedType={selectedType}
          selectedAmenities={selectedAmenities}
          selectedPriceRange={selectedPriceRange}
          selectedState={selectedState}
          onTypeChange={setSelectedType}
          onAmenityToggle={handleAmenityToggle}
          onPriceRangeChange={setSelectedPriceRange}
          onStateChange={setSelectedState}
          onReset={handleResetFilters}
        />
      )}

      {/* Results */}
      <KedaiGrid kedaiList={filteredKedaiList} userLocation={userLocation} />
    </div>
  );
}