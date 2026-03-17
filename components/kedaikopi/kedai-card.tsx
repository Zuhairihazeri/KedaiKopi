"use client";

import Link from "next/link";
import { formatDistance, getDirectionsUrl } from "@/lib/location";
import type { KedaiWithDistance, UserLocation } from "@/types/kedai";

interface KedaiCardProps {
  kedai: KedaiWithDistance;
  userLocation?: UserLocation | null;
}

function getKedaiTypeColor(type: string) {
  switch (type) {
    case "Traditional Kopitiam":
      return "text-[var(--coffee-brown)] bg-[var(--coffee-brown)]/10 border-[var(--coffee-brown)]/20";
    case "Modern Coffee Shop":
      return "text-[var(--accent)] bg-[var(--accent)]/10 border-[var(--accent)]/20";
    case "Chain":
      return "text-blue-400 bg-blue-400/10 border-blue-400/20";
    case "Mamak":
      return "text-green-400 bg-green-400/10 border-green-400/20";
    case "Cafe":
      return "text-purple-400 bg-purple-400/10 border-purple-400/20";
    default:
      return "text-[var(--muted)] bg-[var(--muted)]/10 border-[var(--muted)]/20";
  }
}

export default function KedaiCard({ kedai, userLocation }: KedaiCardProps) {
  const handleDirections = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const directionsUrl = getDirectionsUrl(userLocation || null, kedai.location.coordinates);
    window.open(directionsUrl, "_blank");
  };

  return (
    <Link href={`/kedai/${kedai.slug}`}>
      <div className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--accent)]/50 hover:bg-[var(--surface-2)]">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {/* Letter Avatar */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-subtle)] text-sm font-bold text-[var(--accent)]">
                {kedai.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors truncate">
                  {kedai.name}
                </h3>
                <p className="text-xs text-[var(--muted)]">
                  {kedai.location.city}, {kedai.location.state}
                </p>
              </div>
            </div>
          </div>
          {kedai.featured && (
            <div className="ml-2 rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs font-semibold text-white">
              Featured
            </div>
          )}
        </div>

        {/* Description */}
        {kedai.description && (
          <p className="mb-3 text-sm text-[var(--muted)] line-clamp-2">
            {kedai.description}
          </p>
        )}

        {/* Type and Distance */}
        <div className="mb-3 flex items-center justify-between">
          <span className={`rounded-full border px-2 py-1 text-xs font-medium ${getKedaiTypeColor(kedai.type)}`}>
            {kedai.type}
          </span>
          {kedai.distance !== undefined && (
            <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {formatDistance(kedai.distance)}
            </div>
          )}
        </div>

        {/* Specialties */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {kedai.specialties.slice(0, 3).map((specialty) => (
              <span
                key={specialty}
                className="rounded bg-[var(--surface-2)] px-2 py-0.5 text-xs text-[var(--muted)]"
              >
                {specialty}
              </span>
            ))}
            {kedai.specialties.length > 3 && (
              <span className="rounded bg-[var(--surface-2)] px-2 py-0.5 text-xs text-[var(--muted)]">
                +{kedai.specialties.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {kedai.amenities.slice(0, 4).map((amenity) => (
              <span
                key={amenity}
                className="flex items-center gap-1 rounded bg-[var(--accent-subtle)] px-2 py-0.5 text-xs text-[var(--accent)]"
              >
                {amenity === "WiFi" && "📶"}
                {amenity === "Parking" && "🚗"}
                {amenity === "Air Con" && "❄️"}
                {amenity === "24 Hours" && "🕐"}
                {amenity === "Card Payment" && "💳"}
                {amenity === "Halal" && "🥘"}
                {amenity === "Takeaway" && "📦"}
                {amenity === "Delivery" && "🛵"}
                {amenity === "Outdoor Seating" && "🪑"}
                {amenity === "Drive Thru" && "🚙"}
                <span>{amenity}</span>
              </span>
            ))}
            {kedai.amenities.length > 4 && (
              <span className="rounded bg-[var(--accent-subtle)] px-2 py-0.5 text-xs text-[var(--accent)]">
                +{kedai.amenities.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
          <div className="flex items-center gap-3">
            {/* Rating */}
            {kedai.rating && (
              <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {kedai.rating.toFixed(1)}
              </div>
            )}
            {/* Price Range */}
            <span className="text-xs text-[var(--muted)]">{kedai.priceRange}</span>
          </div>

          {/* Directions Button */}
          {userLocation && (
            <button
              type="button"
              onClick={handleDirections}
              className="flex items-center gap-1 rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 11l19-9-9 19-2-8-8-2z" />
              </svg>
              Directions
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}