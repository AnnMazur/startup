"use client";

import { Heart, Cake, Briefcase, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { EventTemplate } from "@/lib/types";
import { EventType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface EventTemplateCardProps {
  template: EventTemplate;
  onSelect: (template: EventTemplate) => void;
}

const iconMap = {
  rings: Heart,
  cake: Cake,
  briefcase: Briefcase,
};

const colorMap = {
  [EventType.WEDDING]: {
    bg: "bg-[#FFE5EC]",
    icon: "text-[#E88B7A]",
    hover: "hover:border-[#E88B7A]",
  },
  [EventType.BIRTHDAY]: {
    bg: "bg-primary/10",
    icon: "text-primary",
    hover: "hover:border-primary",
  },
  [EventType.CORPORATE]: {
    bg: "bg-secondary",
    icon: "text-muted-foreground",
    hover: "hover:border-muted-foreground",
  },
  [EventType.ANNIVERSARY]: {
    bg: "bg-[#9FD0A3]/20",
    icon: "text-[#5A8A5E]",
    hover: "hover:border-[#9FD0A3]",
  },
  [EventType.OTHER]: {
    bg: "bg-muted",
    icon: "text-muted-foreground",
    hover: "hover:border-muted",
  },
};

export function EventTemplateCard({
  template,
  onSelect,
}: EventTemplateCardProps) {
  const Icon = iconMap[template.icon as keyof typeof iconMap] || Calendar;
  const colors = colorMap[template.type];

  return (
    <Card
      className={cn(
        "group cursor-pointer overflow-hidden border-2 border-border transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        colors.hover
      )}
      onClick={() => onSelect(template)}
    >
      <CardContent className="p-6">
        {/* Icon */}
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl",
            colors.bg
          )}
        >
          <Icon className={cn("h-8 w-8", colors.icon)} />
        </div>

        {/* Content */}
        <h3 className="mt-4 text-xl font-semibold text-foreground">
          {template.name}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {template.description}
        </p>

        {/* Steps count */}
        <p className="mt-4 text-sm text-muted-foreground">
          {template.steps.length} шагов в чеклисте
        </p>

        {/* CTA */}
        <Button
          variant="link"
          className="mt-4 h-auto gap-2 p-0 text-primary hover:text-accent"
        >
          Начать планирование
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
