"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Calendar, BookOpen, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { VenueCard } from "@/components/venues/venue-card";
import { VenueCardSkeleton } from "@/components/ui/skeletons";
import { useAuthStore } from "@/lib/store/auth-store";
import { useEventStore } from "@/lib/store/event-store";
import { venues } from "@/lib/data/venues";
import { eventTemplates } from "@/lib/data/event-templates";
import { EventStatus } from "@/lib/types";

const statusConfig = {
  [EventStatus.DRAFT]: { label: "Черновик", color: "bg-muted text-muted-foreground" },
  [EventStatus.PLANNING]: { label: "Планируется", color: "bg-primary/10 text-primary" },
  [EventStatus.CONFIRMED]: { label: "Подтверждено", color: "bg-[#9FD0A3]/20 text-[#5A8A5E]" },
  [EventStatus.COMPLETED]: { label: "Завершено", color: "bg-secondary text-muted-foreground" },
};

export default function MyDashboardPage() {
  const { user, isAuthenticated, openAuthModal } = useAuthStore();
  const { events, getEventProgress } = useEventStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal();
    }
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [isAuthenticated, openAuthModal]);

  // Get favorite venues
  const favoriteVenues = user
    ? venues.filter((v) => user.favoriteVenueIds.includes(v.id))
    : [];

  // Get user events
  const userEvents = events;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center lg:px-8">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground" />
          <h1 className="mt-4 text-2xl font-bold text-foreground">
            Войдите в аккаунт
          </h1>
          <p className="mt-2 text-muted-foreground">
            Чтобы просматривать избранное и мероприятия, необходимо войти
          </p>
          <Button className="mt-6" onClick={openAuthModal}>
            Войти
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-secondary/30 py-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground lg:text-4xl">
            Привет, {user?.name.split(" ")[0]}!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Управляйте избранным и мероприятиями
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="mb-8 w-full justify-start">
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="h-4 w-4" />
              Избранное
              {favoriteVenues.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {favoriteVenues.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2">
              <Calendar className="h-4 w-4" />
              Мои мероприятия
              {userEvents.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {userEvents.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="bookings" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Брони
            </TabsTrigger>
          </TabsList>

          {/* Favorites tab */}
          <TabsContent value="favorites">
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <VenueCardSkeleton key={i} />
                ))}
              </div>
            ) : favoriteVenues.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <Heart className="mx-auto h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Нет избранных площадок
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Добавляйте понравившиеся площадки в избранное, нажимая на
                  сердечко
                </p>
                <Button className="mt-6" asChild>
                  <Link href="/venues">Найти площадки</Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteVenues.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Events tab */}
          <TabsContent value="events">
            {/* Create event CTA */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                {userEvents.length} мероприятий
              </p>
              <Button className="gap-2" asChild>
                <Link href="/events">
                  <Plus className="h-4 w-4" />
                  Создать
                </Link>
              </Button>
            </div>

            {userEvents.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <Calendar className="mx-auto h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Нет мероприятий
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Создайте своё первое мероприятие и начните планирование
                </p>
                <Button className="mt-6" asChild>
                  <Link href="/events">Создать мероприятие</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {userEvents.map((event) => {
                  const template = eventTemplates.find(
                    (t) => t.id === event.templateId
                  );
                  const progress = getEventProgress(event.id);
                  const statusInfo = statusConfig[event.status];

                  return (
                    <Link
                      key={event.id}
                      href={`/events/${event.id}`}
                      className="group block rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge className={statusInfo.color}>
                              {statusInfo.label}
                            </Badge>
                            <Badge variant="outline">{template?.name}</Badge>
                          </div>
                          <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary">
                            {event.name}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {event.date
                              ? new Date(event.date).toLocaleDateString("ru-RU", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })
                              : "Дата не указана"}
                            {event.guestCount && ` | ${event.guestCount} гостей`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            {progress}%
                          </p>
                          <p className="text-sm text-muted-foreground">готово</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <ArrowRight className="ml-4 h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Bookings tab */}
          <TabsContent value="bookings">
            <div className="rounded-xl border border-border bg-card p-12 text-center">
              <BookOpen className="mx-auto h-16 w-16 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Нет бронирований
              </h3>
              <p className="mt-2 text-muted-foreground">
                Здесь будут отображаться ваши брони площадок и услуг
              </p>
              <Button className="mt-6" asChild>
                <Link href="/venues">Найти площадку</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
