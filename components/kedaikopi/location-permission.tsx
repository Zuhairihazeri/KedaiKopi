"use client";

import { useState, useEffect } from "react";
import { getCurrentLocation, checkLocationPermission } from "@/lib/location";
import type { UserLocation } from "@/types/kedai";

interface LocationPermissionProps {
  onLocationUpdate: (location: UserLocation | null) => void;
}

export default function LocationPermission({
  onLocationUpdate,
}: LocationPermissionProps) {
  const [locationState, setLocationState] = useState<
    "unknown" | "requesting" | "granted" | "denied" | "error"
  >("unknown");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    checkInitialPermission();
  }, []);

  const checkInitialPermission = async () => {
    try {
      const permission = await checkLocationPermission();
      if (permission === "granted") {
        setLocationState("granted");
        requestLocation();
      } else if (permission === "denied") {
        setLocationState("denied");
      }
    } catch {
      setLocationState("unknown");
    }
  };

  const requestLocation = async () => {
    setLocationState("requesting");
    setErrorMessage("");

    try {
      const location = await getCurrentLocation();
      setLocationState("granted");
      onLocationUpdate(location);
    } catch (error) {
      setLocationState("error");
      setErrorMessage(
        error instanceof GeolocationPositionError
          ? getGeolocationErrorMessage(error.code)
          : "Failed to get location"
      );
      onLocationUpdate(null);
    }
  };

  const getGeolocationErrorMessage = (code: number): string => {
    switch (code) {
      case 1:
        return "Location access was denied. Enable location in your browser settings.";
      case 2:
        return "Location information is unavailable.";
      case 3:
        return "Location request timed out.";
      default:
        return "An unknown error occurred.";
    }
  };

  if (locationState === "granted") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-[var(--success)]/30 bg-[var(--success)]/10 px-3 py-2 text-sm text-[var(--success)]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>Location enabled — showing nearby kedai</span>
        <button
          type="button"
          onClick={requestLocation}
          className="ml-auto text-xs underline hover:no-underline"
        >
          Refresh
        </button>
      </div>
    );
  }

  if (locationState === "requesting") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-2 text-sm text-[var(--accent)]">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
        <span>Getting your location...</span>
      </div>
    );
  }

  if (locationState === "denied" || locationState === "error") {
    return (
      <div className="rounded-lg border border-[var(--warning)]/30 bg-[var(--warning)]/10 px-3 py-2 text-sm text-[var(--warning)]">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>
            {errorMessage || "Location access disabled"}
          </span>
        </div>
        <p className="mt-2 text-xs opacity-80">
          You can still browse all kedai, but distance sorting won&apos;t be available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-subtle)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-[var(--foreground)]">
            Find kedai near you
          </h3>
          <p className="text-xs text-[var(--muted)]">
            Enable location to see distance and get directions
          </p>
        </div>
        <button
          type="button"
          onClick={requestLocation}
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
        >
          Enable Location
        </button>
      </div>
    </div>
  );
}