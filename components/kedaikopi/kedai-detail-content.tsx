"use client";

import Link from "next/link";
import { getDirectionsUrl } from "@/lib/location";
import type { KedaiKopi } from "@/types/kedai";

interface KedaiDetailContentProps {
  kedai: KedaiKopi;
  relatedKedai: KedaiKopi[];
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

export default function KedaiDetailContent({ kedai, relatedKedai }: KedaiDetailContentProps) {
  return (
    <>
      {/* Kedai Header */}
      <div className="mb-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--accent-subtle)] text-2xl font-bold text-[var(--accent)]">
            {kedai.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">
                  {kedai.name}
                </h1>
                <p className="text-[var(--muted)] mb-2">
                  {kedai.location.address}
                </p>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-sm font-medium ${getKedaiTypeColor(kedai.type)}`}>
                    {kedai.type}
                  </span>
                  {kedai.rating && (
                    <div className="flex items-center gap-1 text-sm text-[var(--muted)]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      {kedai.rating.toFixed(1)}
                    </div>
                  )}
                  <span className="text-sm text-[var(--muted)]">{kedai.priceRange}</span>
                </div>
              </div>
              {kedai.featured && (
                <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-sm font-semibold text-white">
                  Featured
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {kedai.description && (
          <p className="mt-4 text-[var(--muted)] leading-relaxed">
            {kedai.description}
          </p>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              const directionsUrl = getDirectionsUrl(null, kedai.location.coordinates);
              window.open(directionsUrl, "_blank");
            }}
            className="flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 11l19-9-9 19-2-8-8-2z" />
            </svg>
            Get Directions
          </button>
          {kedai.contact?.phone && (
            <a
              href={`tel:${kedai.contact.phone}`}
              className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call
            </a>
          )}
          {kedai.contact?.website && (
            <a
              href={kedai.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
              Website
            </a>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Details */}
        <div className="space-y-6">
          {/* Specialties */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">
              Specialties
            </h2>
            <div className="flex flex-wrap gap-2">
              {kedai.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="rounded-lg bg-[var(--coffee-brown)]/10 border border-[var(--coffee-brown)]/20 px-3 py-1.5 text-sm font-medium text-[var(--coffee-brown)]"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">
              Amenities
            </h2>
            <div className="flex flex-wrap gap-2">
              {kedai.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="flex items-center gap-2 rounded-lg bg-[var(--accent-subtle)] border border-[var(--accent)]/20 px-3 py-1.5 text-sm font-medium text-[var(--accent)]"
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
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          {/* Hours & Contact */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">
              Information
            </h2>
            <div className="space-y-3">
              {kedai.openHours && (
                <div className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" className="mt-0.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                  <div>
                    <p className="font-medium text-[var(--foreground)]">Hours</p>
                    <p className="text-sm text-[var(--muted)]">{kedai.openHours}</p>
                  </div>
                </div>
              )}
              {kedai.contact?.phone && (
                <div className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" className="mt-0.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <div>
                    <p className="font-medium text-[var(--foreground)]">Phone</p>
                    <p className="text-sm text-[var(--muted)]">{kedai.contact.phone}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" className="mt-0.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <p className="font-medium text-[var(--foreground)]">Address</p>
                  <p className="text-sm text-[var(--muted)]">{kedai.location.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Kedai */}
          {relatedKedai.length > 0 && (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">
                More in {kedai.location.state}
              </h2>
              <div className="space-y-3">
                {relatedKedai.map((related) => (
                  <Link
                    key={related.id}
                    href={`/kedai/${related.slug}`}
                    className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-3 transition-colors hover:border-[var(--accent)]/50 hover:bg-[var(--surface)]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-subtle)] text-sm font-bold text-[var(--accent)]">
                      {related.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[var(--foreground)] truncate">
                        {related.name}
                      </p>
                      <p className="text-xs text-[var(--muted)]">
                        {related.location.city} • {related.type}
                      </p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}