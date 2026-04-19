"use client";

import { useState } from "react";
import { Calendar, Users, Heart, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/lib/store/auth-store";
import { formatPrice } from "@/lib/services/venues";
import type { Venue } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BookingCardProps {
  venue: Venue;
}

export function BookingCard({ venue }: BookingCardProps) {
  const { toggleFavorite, isFavorite, isAuthenticated, openAuthModal } =
    useAuthStore();
  const [guestCount, setGuestCount] = useState(venue.capacityMin);
  const [showSuccess, setShowSuccess] = useState(false);
  const isFav = isFavorite(venue.id);

  const estimatedPrice = venue.pricePerPerson
    ? venue.basePrice + guestCount * venue.pricePerPerson
    : venue.basePrice;

  const handleBookingRequest = () => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Card className="sticky top-24 border-border bg-card shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-baseline justify-between">
          <span>
            от{" "}
            <span className="text-2xl text-primary">
              {formatPrice(venue.basePrice)}
            </span>
          </span>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-9 w-9 shrink-0",
              isFav && "text-destructive"
            )}
            onClick={() => toggleFavorite(venue.id)}
          >
            <Heart className={cn("h-5 w-5", isFav && "fill-current")} />
          </Button>
        </CardTitle>
        {venue.pricePerPerson && (
          <p className="text-sm text-muted-foreground">
            + {formatPrice(venue.pricePerPerson)} за гостя
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date input */}
        <div className="space-y-2">
          <Label htmlFor="date" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Дата мероприятия
          </Label>
          <Input id="date" type="date" min={new Date().toISOString().split("T")[0]} />
        </div>

        {/* Guest count */}
        <div className="space-y-2">
          <Label htmlFor="guests" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Количество гостей
          </Label>
          <Input
            id="guests"
            type="number"
            min={venue.capacityMin}
            max={venue.capacityMax}
            value={guestCount}
            onChange={(e) => setGuestCount(parseInt(e.target.value) || venue.capacityMin)}
          />
          <p className="text-xs text-muted-foreground">
            от {venue.capacityMin} до {venue.capacityMax} гостей
          </p>
        </div>

        {/* Estimated price */}
        <div className="rounded-lg bg-secondary p-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Примерная стоимость</span>
            <span className="text-xl font-bold text-foreground">
              {formatPrice(estimatedPrice)}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Окончательная цена уточняется при бронировании
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            className="w-full"
            size="lg"
            onClick={handleBookingRequest}
          >
            Оставить заявку
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-2" asChild>
              <a href="tel:+74951234567">
                <Phone className="h-4 w-4" />
                Позвонить
              </a>
            </Button>
            <Button variant="outline" className="flex-1 gap-2" asChild>
              <a href="https://wa.me/74951234567" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>

        {/* Success message */}
        {showSuccess && (
          <div className="rounded-lg bg-[#9FD0A3]/20 p-4 text-center">
            <p className="font-medium text-[#5A8A5E]">
              Заявка отправлена!
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Мы свяжемся с вами в ближайшее время
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
