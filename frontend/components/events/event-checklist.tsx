"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Check,
  Circle,
  Plus,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useEventStore } from "@/lib/store/event-store";
import type { Event, EventStep } from "@/lib/types";
import { cn } from "@/lib/utils";

interface EventChecklistProps {
  event: Event;
  steps: EventStep[];
}

export function EventChecklist({ event, steps }: EventChecklistProps) {
  const { updateChecklistItem, getEventProgress } = useEventStore();
  const [expandedSteps, setExpandedSteps] = useState<string[]>([steps[0]?.id]);

  const progress = getEventProgress(event.id);

  const toggleStep = (stepId: string) => {
    setExpandedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    );
  };

  const isStepCompleted = (stepId: string) => {
    return event.checklist.find((item) => item.stepId === stepId)?.completed ?? false;
  };

  const handleToggleComplete = (stepId: string) => {
    const currentState = isStepCompleted(stepId);
    updateChecklistItem(event.id, stepId, { completed: !currentState });
  };

  return (
    <div className="space-y-6">
      {/* Progress header */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">
              Прогресс планирования
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {event.checklist.filter((i) => i.completed).length} из{" "}
              {steps.length} шагов выполнено
            </p>
          </div>
          <div className="text-3xl font-bold text-primary">{progress}%</div>
        </div>
        <Progress value={progress} className="mt-4 h-3" />
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isExpanded = expandedSteps.includes(step.id);
          const isCompleted = isStepCompleted(step.id);
          const checklistItem = event.checklist.find(
            (item) => item.stepId === step.id
          );

          return (
            <div
              key={step.id}
              className={cn(
                "rounded-xl border transition-colors",
                isCompleted
                  ? "border-[#9FD0A3] bg-[#9FD0A3]/5"
                  : "border-border bg-card"
              )}
            >
              {/* Step header */}
              <button
                onClick={() => toggleStep(step.id)}
                className="flex w-full items-center gap-4 p-4 text-left"
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    isCompleted
                      ? "bg-[#9FD0A3] text-card"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4
                      className={cn(
                        "font-medium",
                        isCompleted ? "text-[#5A8A5E]" : "text-foreground"
                      )}
                    >
                      {step.title}
                    </h4>
                    {step.isRequired && (
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                        Обязательно
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground line-clamp-1">
                    {step.description}
                  </p>
                </div>

                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                )}
              </button>

              {/* Step content */}
              {isExpanded && (
                <div className="border-t border-border px-4 py-4">
                  <p className="text-muted-foreground">{step.description}</p>

                  {/* Actions */}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {/* Mark complete */}
                    <label className="flex cursor-pointer items-center gap-2">
                      <Checkbox
                        checked={isCompleted}
                        onCheckedChange={() => handleToggleComplete(step.id)}
                      />
                      <span className="text-sm text-foreground">
                        Отметить как выполненное
                      </span>
                    </label>

                    {/* Add venue/service */}
                    {step.itemType === "venue" && (
                      <Button variant="outline" size="sm" className="gap-2" asChild>
                        <Link href="/venues">
                          <MapPin className="h-4 w-4" />
                          Выбрать площадку
                        </Link>
                      </Button>
                    )}

                    {step.itemType === "service" && (
                      <Button variant="outline" size="sm" className="gap-2">
                        <Sparkles className="h-4 w-4" />
                        Найти услугу
                      </Button>
                    )}

                    <Button variant="ghost" size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Добавить заметку
                    </Button>
                  </div>

                  {/* Linked item */}
                  {checklistItem?.linkedItemId && (
                    <div className="mt-4 rounded-lg bg-secondary p-3">
                      <div className="flex items-center gap-2">
                        {checklistItem.linkedItemType === "venue" ? (
                          <MapPin className="h-4 w-4 text-primary" />
                        ) : (
                          <Sparkles className="h-4 w-4 text-primary" />
                        )}
                        <span className="text-sm font-medium text-foreground">
                          Привязано: {checklistItem.linkedItemId}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {checklistItem?.notes && (
                    <div className="mt-4 rounded-lg bg-secondary/50 p-3">
                      <p className="text-sm text-muted-foreground">
                        {checklistItem.notes}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
