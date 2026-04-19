import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  MapPin,
  Users,
  Star,
  Check,
  Heart,
  Cake,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VenueGallery } from "@/components/venues/venue-gallery";
import { BookingCard } from "@/components/venues/booking-card";
import { VenueCard } from "@/components/venues/venue-card";
import { venues } from "@/lib/data/venues";
import { formatCapacity } from "@/lib/services/venues";
import { EventType } from "@/lib/types";

const eventTypeConfig = {
  [EventType.WEDDING]: { icon: Heart, label: "Свадьба" },
  [EventType.BIRTHDAY]: { icon: Cake, label: "День рождения" },
  [EventType.CORPORATE]: { icon: Briefcase, label: "Корпоратив" },
  [EventType.ANNIVERSARY]: { icon: Heart, label: "Юбилей" },
  [EventType.OTHER]: { icon: Star, label: "Другое" },
};

interface VenueDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function VenueDetailPage({ params }: VenueDetailPageProps) {
  const { id } = await params;
  const venue = venues.find((v) => v.id === id);

  if (!venue) {
    notFound();
  }

  // Get similar venues (same event types, excluding current)
  const similarVenues = venues
    .filter(
      (v) =>
        v.id !== venue.id &&
        v.eventTypes.some((type) => venue.eventTypes.includes(type))
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
          <Button variant="ghost" size="sm" className="gap-2" asChild>
            <Link href="/venues">
              <ChevronLeft className="h-4 w-4" />
              Все площадки
            </Link>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Gallery */}
        <VenueGallery images={venue.images} venueName={venue.name} />

        {/* Content grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Left column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {venue.eventTypes.map((type) => {
                  const config = eventTypeConfig[type];
                  const Icon = config.icon;
                  return (
                    <Badge key={type} variant="secondary" className="gap-1">
                      <Icon className="h-3 w-3" />
                      {config.label}
                    </Badge>
                  );
                })}
              </div>

              <h1 className="mt-4 text-3xl font-bold text-foreground lg:text-4xl">
                {venue.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {venue.address}, {venue.city}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{formatCapacity(venue.capacityMin, venue.capacityMax)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium text-foreground">{venue.rating}</span>
                  <span>({venue.reviewCount} отзывов)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                О площадке
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {venue.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Удобства и услуги
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {venue.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Расположение
              </h2>
              <div className="mt-4 aspect-[16/9] overflow-hidden rounded-xl border border-border bg-secondary">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">
                      {venue.address}, {venue.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Booking */}
          <div>
            <BookingCard venue={venue} />
          </div>
        </div>

        {/* Similar venues */}
        {similarVenues.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground">
              Похожие площадки
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarVenues.map((v) => (
                <VenueCard key={v.id} venue={v} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return venues.map((venue) => ({
    id: venue.id,
  }));
}
