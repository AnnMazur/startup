"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VenueCard } from "@/components/venues/venue-card";
import { VenueFilters } from "@/components/venues/venue-filters";
import { VenueCardSkeleton } from "@/components/ui/skeletons";
import { venues as allVenues } from "@/lib/data/venues";
import { EventType, type VenueFilters as FiltersType, type Venue } from "@/lib/types";

function VenuesCatalogContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FiltersType>({});

  // Initialize filters from URL
  useEffect(() => {
    const eventType = searchParams.get("eventType");
    const city = searchParams.get("city");
    const capacityMax = searchParams.get("capacityMax");

    setFilters({
      eventType: eventType as EventType | undefined,
      city: city || undefined,
      capacityMax: capacityMax ? parseInt(capacityMax) : undefined,
    });

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Filter venues
  const filteredVenues = useMemo(() => {
    let result: Venue[] = [...allVenues];

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(query) ||
          v.description.toLowerCase().includes(query) ||
          v.city.toLowerCase().includes(query)
      );
    }

    // Filters
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

    return result;
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-secondary/30 py-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground lg:text-4xl">
            Найти площадку
          </h1>
          <p className="mt-2 text-muted-foreground">
            {filteredVenues.length} площадок для вашего мероприятия
          </p>

          {/* Search bar */}
          <div className="mt-6 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск по названию, описанию или городу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-10 pr-4 text-base"
              />
            </div>
            <Button
              variant="outline"
              size="lg"
              className="h-12 gap-2 lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-5 w-5" />
              Фильтры
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside
            className={`w-full shrink-0 lg:block lg:w-72 ${
              showFilters ? "block" : "hidden"
            }`}
          >
            <VenueFilters
              filters={filters}
              onFiltersChange={setFilters}
              className="sticky top-24"
            />
          </aside>

          {/* Venues grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <VenueCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredVenues.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Площадки не найдены
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Попробуйте изменить параметры поиска или сбросить фильтры
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setFilters({});
                    setSearchQuery("");
                  }}
                >
                  Сбросить фильтры
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredVenues.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VenuesCatalogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-secondary/30 py-8">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="h-10 w-48 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-5 w-64 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    }>
      <VenuesCatalogContent />
    </Suspense>
  );
}
