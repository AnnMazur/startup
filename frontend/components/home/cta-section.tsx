"use client";

import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-8 lg:p-16">
          {/* Decorative elements */}
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-card/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-card/10 blur-2xl" />

          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl font-bold text-primary-foreground lg:text-4xl text-balance">
                Создайте своё мероприятие прямо сейчас
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Наш конструктор поможет вам шаг за шагом спланировать идеальный
                праздник. Выберите тип мероприятия и начните планирование.
              </p>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 bg-card text-foreground hover:bg-card/90"
                  asChild
                >
                  <Link href="/events">
                    <Calendar className="h-5 w-5" />
                    Начать планирование
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="gap-2 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  asChild
                >
                  <Link href="/venues">
                    Смотреть площадки
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Features list */}
            <div className="space-y-4">
              {[
                "Пошаговый чеклист для каждого типа мероприятия",
                "Сохраняйте понравившиеся площадки в избранное",
                "Сравнивайте цены и условия",
                "Бронируйте напрямую через платформу",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 rounded-xl bg-card/10 p-4 backdrop-blur-sm"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-card" />
                  <span className="text-primary-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
