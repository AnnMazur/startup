"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VenueCard } from "@/components/venues/venue-card";
import { VenueCardSkeleton } from "@/components/ui/skeletons";
import type { Venue } from "@/lib/types";

interface PromotedVenuesProps {
  venues: Venue[];
  isLoading?: boolean;
}

export function PromotedVenues({ venues, isLoading }: PromotedVenuesProps) {
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
              Рекомендуем
            </h2>
            <p className="mt-2 text-muted-foreground">
              Лучшие площадки по версии наших пользователей
            </p>
          </div>
          <Button variant="ghost" className="hidden gap-2 sm:flex" asChild>
            <Link href="/venues">
              Все площадки
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <VenueCardSkeleton key={i} />
              ))
            : venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 sm:hidden">
          <Button className="w-full gap-2" asChild>
            <Link href="/venues">
              Все площадки
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
