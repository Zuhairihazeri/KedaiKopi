"use client";

import KedaiCard from "./kedai-card";
import type { KedaiWithDistance, UserLocation } from "@/types/kedai";

interface KedaiGridProps {
  kedaiList: KedaiWithDistance[];
  userLocation?: UserLocation | null;
  loading?: boolean;
}

export default function KedaiGrid({ 
  kedaiList, 
  userLocation, 
  loading = false 
}: KedaiGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 animate-pulse"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-10 w-10 rounded-full bg-[var(--surface-2)]" />
              <div className="flex-1">
                <div className="h-4 bg-[var(--surface-2)] rounded mb-1" />
                <div className="h-3 bg-[var(--surface-2)] rounded w-24" />
              </div>
            </div>
            <div className="h-3 bg-[var(--surface-2)] rounded mb-2" />
            <div className="h-3 bg-[var(--surface-2)] rounded mb-3 w-3/4" />
            <div className="flex gap-2 mb-3">
              <div className="h-6 bg-[var(--surface-2)] rounded w-16" />
              <div className="h-6 bg-[var(--surface-2)] rounded w-12" />
            </div>
            <div className="flex gap-1 mb-3">
              <div className="h-5 bg-[var(--surface-2)] rounded w-14" />
              <div className="h-5 bg-[var(--surface-2)] rounded w-12" />
              <div className="h-5 bg-[var(--surface-2)] rounded w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (kedaiList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 rounded-full bg-[var(--surface)] p-4">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--muted)"
            strokeWidth="1.5"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-[var(--foreground)]">
          No kedai kopi found
        </h3>
        <p className="text-sm text-[var(--muted)] max-w-sm">
          Try adjusting your search or filters to find more coffee shops.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Results count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-[var(--muted)]">
          Found {kedaiList.length} kedai kopi
          {userLocation && " sorted by distance"}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kedaiList.map((kedai) => (
          <KedaiCard
            key={kedai.id}
            kedai={kedai}
            userLocation={userLocation}
          />
        ))}
      </div>
    </>
  );
}