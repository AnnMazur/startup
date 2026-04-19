"use client";

import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Планируйте праздники легко
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Создавайте праздники
            <span className="block text-primary">как конструктор</span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg text-muted-foreground lg:text-xl text-pretty">
            Находите идеальные площадки, собирайте команду подрядчиков и
            планируйте мероприятие шаг за шагом. Свадьбы, дни рождения,
            корпоративы - всё в одном месте.
          </p>

          {/* Search */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Найти площадку..."
                className="h-12 pl-10 pr-4 text-base"
              />
            </div>
            <Button size="lg" className="h-12 gap-2" asChild>
              <Link href="/venues">
                Найти
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Quick links */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-muted-foreground">Популярное:</span>
            <Link
              href="/venues?eventType=wedding"
              className="rounded-full bg-card px-3 py-1 text-foreground transition-colors hover:bg-secondary"
            >
              Свадебные площадки
            </Link>
            <Link
              href="/venues?eventType=birthday"
              className="rounded-full bg-card px-3 py-1 text-foreground transition-colors hover:bg-secondary"
            >
              День рождения
            </Link>
            <Link
              href="/venues?eventType=corporate"
              className="rounded-full bg-card px-3 py-1 text-foreground transition-colors hover:bg-secondary"
            >
              Корпоратив
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "500+", label: "Площадок" },
            { value: "1000+", label: "Мероприятий" },
            { value: "50+", label: "Городов" },
            { value: "4.8", label: "Средний рейтинг" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-card p-4 text-center shadow-sm"
            >
              <p className="text-2xl font-bold text-primary lg:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
