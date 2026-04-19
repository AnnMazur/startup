"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  Users,
  Wallet,
  Settings,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EventChecklist } from "@/components/events/event-checklist";
import { useEventStore } from "@/lib/store/event-store";
import { useAuthStore } from "@/lib/store/auth-store";
import { eventTemplates } from "@/lib/data/event-templates";
import { EventStatus } from "@/lib/types";

const statusConfig = {
  [EventStatus.DRAFT]: { label: "Черновик", color: "bg-muted text-muted-foreground" },
  [EventStatus.PLANNING]: { label: "Планируется", color: "bg-primary/10 text-primary" },
  [EventStatus.CONFIRMED]: { label: "Подтверждено", color: "bg-[#9FD0A3]/20 text-[#5A8A5E]" },
  [EventStatus.COMPLETED]: { label: "Завершено", color: "bg-secondary text-muted-foreground" },
};

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { events, deleteEvent, updateEvent } = useEventStore();
  const { isAuthenticated, openAuthModal } = useAuthStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const event = events.find((e) => e.id === id);
  const template = event
    ? eventTemplates.find((t) => t.id === event.templateId)
    : null;

  useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal();
    }
  }, [isAuthenticated, openAuthModal]);

  if (!event || !template) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center lg:px-8">
          <h1 className="text-2xl font-bold text-foreground">
            Мероприятие не найдено
          </h1>
          <p className="mt-2 text-muted-foreground">
            Возможно, оно было удалено или ссылка неверна
          </p>
          <Button className="mt-6" asChild>
            <Link href="/events">Создать мероприятие</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    deleteEvent(event.id);
    router.push("/my");
  };

  const handleStatusChange = () => {
    const statuses = [
      EventStatus.DRAFT,
      EventStatus.PLANNING,
      EventStatus.CONFIRMED,
      EventStatus.COMPLETED,
    ];
    const currentIndex = statuses.indexOf(event.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    updateEvent(event.id, { status: nextStatus });
  };

  const statusInfo = statusConfig[event.status];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
          <Button variant="ghost" size="sm" className="gap-2" asChild>
            <Link href="/my">
              <ChevronLeft className="h-4 w-4" />
              Мои мероприятия
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Event header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                <Badge variant="outline">{template.name}</Badge>
              </div>

              <h1 className="mt-4 text-3xl font-bold text-foreground">
                {event.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-muted-foreground">
                {event.date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(event.date).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
                {event.guestCount && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{event.guestCount} гостей</span>
                  </div>
                )}
                {event.budget && (
                  <div className="flex items-center gap-1">
                    <Wallet className="h-4 w-4" />
                    <span>{event.budget.toLocaleString("ru-RU")} руб.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Checklist */}
            <EventChecklist event={event} steps={template.steps} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground">Управление</h3>

              <div className="mt-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={handleStatusChange}
                >
                  <Settings className="h-4 w-4" />
                  Изменить статус
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="h-4 w-4" />
                  Удалить мероприятие
                </Button>
              </div>
            </div>

            {/* Quick links */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground">Быстрые действия</h3>

              <div className="mt-4 space-y-3">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/venues">Найти площадку</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/my">Избранные площадки</Link>
                </Button>
              </div>
            </div>

            {/* Info */}
            <div className="rounded-xl bg-secondary/50 p-4 text-sm text-muted-foreground">
              <p>
                Создано:{" "}
                {new Date(event.createdAt).toLocaleDateString("ru-RU")}
              </p>
              <p className="mt-1">
                Обновлено:{" "}
                {new Date(event.updatedAt).toLocaleDateString("ru-RU")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl bg-card p-8 shadow-xl">
            <h2 className="text-xl font-bold text-foreground">
              Удалить мероприятие?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Это действие нельзя отменить. Все данные мероприятия будут удалены.
            </p>
            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Отмена
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleDelete}
              >
                Удалить
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
