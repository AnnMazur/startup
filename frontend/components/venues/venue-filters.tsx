"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { EventType, type VenueFilters as FiltersType } from "@/lib/types";
import { cities, allFeatures } from "@/lib/data/venues";
import { cn } from "@/lib/utils";

interface VenueFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  className?: string;
}

const eventTypeLabels = {
  [EventType.WEDDING]: "Свадьба",
  [EventType.BIRTHDAY]: "День рождения",
  [EventType.CORPORATE]: "Корпоратив",
  [EventType.ANNIVERSARY]: "Юбилей",
  [EventType.OTHER]: "Другое",
};

export function VenueFilters({
  filters,
  onFiltersChange,
  className,
}: VenueFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const updateFilter = <K extends keyof FiltersType>(
    key: K,
    value: FiltersType[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== undefined && (Array.isArray(v) ? v.length > 0 : true)
  );

  const toggleFeature = (feature: string) => {
    const current = filters.features || [];
    const updated = current.includes(feature)
      ? current.filter((f) => f !== feature)
      : [...current, feature];
    updateFilter("features", updated.length > 0 ? updated : undefined);
  };

  const displayedFeatures = showAllFeatures
    ? allFeatures
    : allFeatures.slice(0, 8);

  return (
    <div className={cn("rounded-xl border border-border bg-card p-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium text-foreground">Фильтры</span>
          {hasActiveFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {Object.values(filters).filter(
                (v) => v !== undefined && (Array.isArray(v) ? v.length > 0 : true)
              ).length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 gap-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              Сбросить
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 lg:hidden"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Filters content */}
      <div
        className={cn(
          "mt-4 space-y-6",
          !isExpanded && "hidden lg:block"
        )}
      >
        {/* Event Type */}
        <div className="space-y-2">
          <Label>Тип мероприятия</Label>
          <Select
            value={filters.eventType || "all"}
            onValueChange={(value) =>
              updateFilter(
                "eventType",
                value === "all" ? undefined : (value as EventType)
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Все типы" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы</SelectItem>
              {Object.entries(eventTypeLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label>Город</Label>
          <Select
            value={filters.city || "all"}
            onValueChange={(value) =>
              updateFilter("city", value === "all" ? undefined : value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Все города" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все города</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Guest Count */}
        <div className="space-y-3">
          <Label>Количество гостей</Label>
          <Slider
            value={[filters.capacityMin || 10, filters.capacityMax || 500]}
            min={10}
            max={500}
            step={10}
            onValueChange={([min, max]) => {
              updateFilter("capacityMin", min);
              updateFilter("capacityMax", max);
            }}
            className="py-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.capacityMin || 10} гостей</span>
            <span>{filters.capacityMax || 500} гостей</span>
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label>Бюджет</Label>
          <Slider
            value={[
              (filters.priceMin || 20000) / 1000,
              (filters.priceMax || 400000) / 1000,
            ]}
            min={20}
            max={400}
            step={10}
            onValueChange={([min, max]) => {
              updateFilter("priceMin", min * 1000);
              updateFilter("priceMax", max * 1000);
            }}
            className="py-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{((filters.priceMin || 20000) / 1000).toFixed(0)}K</span>
            <span>{((filters.priceMax || 400000) / 1000).toFixed(0)}K</span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3">
          <Label>Удобства</Label>
          <div className="grid grid-cols-2 gap-2">
            {displayedFeatures.map((feature) => (
              <label
                key={feature}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-2 transition-colors hover:bg-secondary"
              >
                <Checkbox
                  checked={(filters.features || []).includes(feature)}
                  onCheckedChange={() => toggleFeature(feature)}
                />
                <span className="text-sm text-foreground">{feature}</span>
              </label>
            ))}
          </div>
          {allFeatures.length > 8 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllFeatures(!showAllFeatures)}
              className="w-full"
            >
              {showAllFeatures ? "Скрыть" : `Показать все (${allFeatures.length})`}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
