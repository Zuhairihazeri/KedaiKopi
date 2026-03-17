import haversine from "haversine";
import type { Coordinates, UserLocation, KedaiKopi, KedaiWithDistance } from "@/types/kedai";

/**
 * Calculate distance between two coordinates using haversine formula
 */
export function calculateDistance(
  from: Coordinates,
  to: Coordinates
): number {
  // Haversine expects latitude/longitude keys, not lat/lng
  const fromPoint = { latitude: from.lat, longitude: from.lng };
  const toPoint = { latitude: to.lat, longitude: to.lng };
  return haversine(fromPoint, toPoint, { unit: "km" });
}

/**
 * Get user's current GPS location
 */
export function getCurrentLocation(): Promise<UserLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: Date.now(),
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes cache
      }
    );
  });
}

/**
 * Add distance to kedai list and sort by proximity
 */
export function addDistanceAndSort(
  kedaiList: KedaiKopi[],
  userLocation: UserLocation
): KedaiWithDistance[] {
  return kedaiList
    .map((kedai) => ({
      ...kedai,
      distance: calculateDistance(userLocation, kedai.location.coordinates),
    }))
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));
}

/**
 * Format distance for display
 */
export function formatDistance(distance?: number): string {
  if (!distance) return "";
  
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  
  if (distance < 10) {
    return `${distance.toFixed(1)}km`;
  }
  
  return `${Math.round(distance)}km`;
}

/**
 * Generate Google Maps directions URL
 */
export function getDirectionsUrl(
  userLocation: UserLocation | null,
  kedaiCoordinates: Coordinates
): string {
  const destination = `${kedaiCoordinates.lat},${kedaiCoordinates.lng}`;
  
  if (userLocation) {
    const origin = `${userLocation.lat},${userLocation.lng}`;
    return `https://www.google.com/maps/dir/${origin}/${destination}`;
  }
  
  return `https://www.google.com/maps/search/?api=1&query=${destination}`;
}

/**
 * Check if location permission is granted
 */
export async function checkLocationPermission(): Promise<PermissionState> {
  if (!navigator.permissions) {
    return "prompt"; // Fallback for older browsers
  }
  
  const result = await navigator.permissions.query({ name: "geolocation" });
  return result.state;
}