"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Users, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";
import { formatPrice, formatCapacity } from "@/lib/services/venues";
import type { Venue } from "@/lib/types";
import { cn } from "@/lib/utils";

interface VenueCardProps {
  venue: Venue;
  variant?: "default" | "compact";
}

export function VenueCard({ venue, variant = "default" }: VenueCardProps) {
  const { toggleFavorite, isFavorite } = useAuthStore();
  const isFav = isFavorite(venue.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(venue.id);
  };

  return (
    <Link href={`/venues/${venue.id}`}>
      <Card
        className={cn(
          "group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
          "border-border bg-card"
        )}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={venue.images[0]}
            alt={venue.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

          {/* Favorite button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-3 top-3 h-9 w-9 rounded-full bg-card/80 backdrop-blur-sm",
              "transition-all hover:bg-card hover:scale-110",
              isFav && "text-destructive"
            )}
            onClick={handleFavoriteClick}
          >
            <Heart
              className={cn("h-5 w-5", isFav && "fill-current")}
            />
          </Button>

          {/* Promoted badge */}
          {venue.isPromoted && (
            <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
              Рекомендуем
            </Badge>
          )}

          {/* Price overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div>
              <p className="text-lg font-bold text-card">
                от {formatPrice(venue.basePrice)}
              </p>
              {venue.pricePerPerson && (
                <p className="text-sm text-card/80">
                  {formatPrice(venue.pricePerPerson)} / гость
                </p>
              )}
            </div>
            <div className="flex items-center gap-1 rounded-full bg-card/90 px-2 py-1 backdrop-blur-sm">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium text-foreground">
                {venue.rating}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <CardContent className={cn("p-4", variant === "compact" && "p-3")}>
          <h3
            className={cn(
              "font-semibold text-foreground line-clamp-1",
              variant === "default" ? "text-lg" : "text-base"
            )}
          >
            {venue.name}
          </h3>

          <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="line-clamp-1">{venue.city}</span>
          </div>

          <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4 shrink-0" />
            <span>{formatCapacity(venue.capacityMin, venue.capacityMax)}</span>
          </div>

          {variant === "default" && (
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
              {venue.shortDescription}
            </p>
          )}

          {/* Features preview */}
          {variant === "default" && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {venue.features.slice(0, 3).map((feature) => (
                <Badge
                  key={feature}
                  variant="secondary"
                  className="text-xs font-normal"
                >
                  {feature}
                </Badge>
              ))}
              {venue.features.length > 3 && (
                <Badge variant="outline" className="text-xs font-normal">
                  +{venue.features.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
