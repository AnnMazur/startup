import { venues } from "@/lib/data/venues";
import type { Venue, VenueFilters } from "@/lib/types";

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getVenues(filters?: VenueFilters): Promise<Venue[]> {
  await delay(300);

  let result = [...venues];

  if (filters) {
    if (filters.eventType) {
      result = result.filter((v) => v.eventTypes.includes(filters.eventType!));
    }
    if (filters.city) {
      result = result.filter((v) => v.city === filters.city);
    }
    if (filters.capacityMin) {
      result = result.filter((v) => v.capacityMax >= filters.capacityMin!);
    }
    if (filters.capacityMax) {
      result = result.filter((v) => v.capacityMin <= filters.capacityMax!);
    }
    if (filters.priceMin) {
      result = result.filter((v) => v.basePrice >= filters.priceMin!);
    }
    if (filters.priceMax) {
      result = result.filter((v) => v.basePrice <= filters.priceMax!);
    }
    if (filters.features && filters.features.length > 0) {
      result = result.filter((v) =>
        filters.features!.some((f) => v.features.includes(f))
      );
    }
  }

  return result;
}

export async function getVenueById(id: string): Promise<Venue | null> {
  await delay(200);
  return venues.find((v) => v.id === id) ?? null;
}

export async function getPromotedVenues(): Promise<Venue[]> {
  await delay(200);
  return venues.filter((v) => v.isPromoted);
}

export async function searchVenues(query: string): Promise<Venue[]> {
  await delay(300);
  const lowerQuery = query.toLowerCase();
  return venues.filter(
    (v) =>
      v.name.toLowerCase().includes(lowerQuery) ||
      v.description.toLowerCase().includes(lowerQuery) ||
      v.city.toLowerCase().includes(lowerQuery)
  );
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatCapacity(min: number, max: number): string {
  if (min === max) return `${min} гостей`;
  return `${min}-${max} гостей`;
}
