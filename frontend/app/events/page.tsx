"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EventTemplateCard } from "@/components/events/event-template-card";
import { eventTemplates } from "@/lib/data/event-templates";
import { useEventStore } from "@/lib/store/event-store";
import { useAuthStore } from "@/lib/store/auth-store";
import type { EventTemplate } from "@/lib/types";

type Step = "template" | "details" | "summary";

export default function EventsPage() {
  const router = useRouter();
  const { isAuthenticated, openAuthModal } = useAuthStore();
  const { createEvent } = useEventStore();

  const [step, setStep] = useState<Step>("template");
  const [selectedTemplate, setSelectedTemplate] = useState<EventTemplate | null>(
    null
  );
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState(50);
  const [budget, setBudget] = useState(100000);

  const handleTemplateSelect = (template: EventTemplate) => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    setSelectedTemplate(template);
    setStep("details");
  };

  const handleBack = () => {
    if (step === "details") {
      setStep("template");
    } else if (step === "summary") {
      setStep("details");
    }
  };

  const handleNext = () => {
    if (step === "details") {
      if (!eventName.trim()) return;
      setStep("summary");
    }
  };

  const handleCreateEvent = () => {
    if (!selectedTemplate) return;

    const eventId = createEvent(
      selectedTemplate.id,
      selectedTemplate.type,
      eventName
    );

    router.push(`/events/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-secondary/30 py-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground lg:text-4xl">
            Создать мероприятие
          </h1>
          <p className="mt-2 text-muted-foreground">
            Выберите тип и настройте параметры вашего праздника
          </p>

          {/* Progress */}
          <div className="mt-6 flex items-center gap-2">
            {[
              { key: "template", label: "Тип" },
              { key: "details", label: "Детали" },
              { key: "summary", label: "Итог" },
            ].map((s, index) => (
              <div key={s.key} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    step === s.key
                      ? "bg-primary text-primary-foreground"
                      : ["template", "details", "summary"].indexOf(step) >
                        index
                      ? "bg-[#9FD0A3] text-card"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`ml-2 hidden text-sm sm:block ${
                    step === s.key
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
                {index < 2 && (
                  <div className="mx-4 h-px w-8 bg-border sm:w-12" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Step 1: Select Template */}
        {step === "template" && (
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Выберите тип мероприятия
            </h2>
            <p className="mt-2 text-muted-foreground">
              Каждый тип имеет свой чеклист для планирования
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {eventTemplates.map((template) => (
                <EventTemplateCard
                  key={template.id}
                  template={template}
                  onSelect={handleTemplateSelect}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Event Details */}
        {step === "details" && selectedTemplate && (
          <div className="mx-auto max-w-2xl">
            <h2 className="text-xl font-semibold text-foreground">
              Детали мероприятия
            </h2>
            <p className="mt-2 text-muted-foreground">
              Укажите основные параметры для планирования
            </p>

            <div className="mt-8 space-y-6">
              {/* Event name */}
              <div className="space-y-2">
                <Label htmlFor="name">Название мероприятия</Label>
                <Input
                  id="name"
                  placeholder={`${selectedTemplate.name} Анны и Петра`}
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="h-12"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Планируемая дата
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="h-12"
                />
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
                  value={guestCount}
                  onChange={(e) =>
                    setGuestCount(parseInt(e.target.value) || 0)
                  }
                  min={1}
                  className="h-12"
                />
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <Label htmlFor="budget" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Примерный бюджет (руб.)
                </Label>
                <Input
                  id="budget"
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value) || 0)}
                  min={0}
                  step={10000}
                  className="h-12"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={handleBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Назад
              </Button>
              <Button
                onClick={handleNext}
                disabled={!eventName.trim()}
                className="gap-2"
              >
                Далее
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Summary */}
        {step === "summary" && selectedTemplate && (
          <div className="mx-auto max-w-2xl">
            <h2 className="text-xl font-semibold text-foreground">
              Подтверждение
            </h2>
            <p className="mt-2 text-muted-foreground">
              Проверьте данные и создайте мероприятие
            </p>

            {/* Summary card */}
            <div className="mt-8 rounded-xl border border-border bg-card p-6">
              <h3 className="text-2xl font-bold text-foreground">
                {eventName}
              </h3>
              <p className="mt-1 text-muted-foreground">
                {selectedTemplate.name}
              </p>

              <div className="mt-6 space-y-4">
                {eventDate && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">
                      {new Date(eventDate).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">{guestCount} гостей</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">
                    {budget.toLocaleString("ru-RU")} руб.
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-secondary p-4">
                <p className="text-sm font-medium text-foreground">
                  Чеклист: {selectedTemplate.steps.length} шагов
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {selectedTemplate.steps.slice(0, 4).map((step) => (
                    <li key={step.id}>- {step.title}</li>
                  ))}
                  {selectedTemplate.steps.length > 4 && (
                    <li>и ещё {selectedTemplate.steps.length - 4}...</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={handleBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Назад
              </Button>
              <Button onClick={handleCreateEvent} className="gap-2">
                Создать мероприятие
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
