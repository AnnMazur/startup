"use client";

import { useState } from "react";
import {
  Building2,
  Sparkles,
  Users,
  TrendingUp,
  Check,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { cities } from "@/lib/data/venues";

const benefits = [
  {
    icon: Users,
    title: "Новые клиенты",
    description: "Получайте заявки от целевой аудитории, которая активно ищет площадки",
  },
  {
    icon: TrendingUp,
    title: "Рост продаж",
    description: "Увеличьте загрузку вашей площадки в среднем на 30%",
  },
  {
    icon: Building2,
    title: "Простое управление",
    description: "Удобный личный кабинет для управления бронированиями",
  },
  {
    icon: Sparkles,
    title: "Продвижение",
    description: "Ваша площадка в подборках и рекомендациях платформы",
  },
];

export default function PartnerPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    contactName: "",
    email: "",
    phone: "",
    city: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Укажите название компании";
    }
    if (!formData.businessType) {
      newErrors.businessType = "Выберите тип бизнеса";
    }
    if (!formData.contactName.trim()) {
      newErrors.contactName = "Укажите контактное лицо";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Укажите email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Укажите телефон";
    }
    if (!formData.city) {
      newErrors.city = "Выберите город";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center lg:px-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#9FD0A3]/20">
            <Check className="h-10 w-10 text-[#5A8A5E]" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-foreground">
            Заявка отправлена!
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Спасибо за интерес к партнёрству с Фан-Фан. Мы свяжемся с вами в
            течение 2-3 рабочих дней для обсуждения условий сотрудничества.
          </p>
          <Button className="mt-8" asChild>
            <a href="/">Вернуться на главную</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-16 lg:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Станьте партнёром
            <span className="block text-primary">Фан-Фан</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground lg:text-xl">
            Присоединяйтесь к платформе и получайте новых клиентов для вашей
            площадки или услуг. Мы поможем вам развивать бизнес.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-foreground lg:text-3xl">
          Преимущества партнёрства
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card key={benefit.title} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Form section */}
      <div className="bg-secondary/30 py-16">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
              Оставить заявку
            </h2>
            <p className="mt-2 text-muted-foreground">
              Заполните форму, и мы свяжемся с вами в ближайшее время
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                {/* Business name */}
                <div className="space-y-2">
                  <Label htmlFor="businessName">Название компании *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) =>
                      handleChange("businessName", e.target.value)
                    }
                    placeholder="ООО «Ваша компания»"
                    className={errors.businessName ? "border-destructive" : ""}
                  />
                  {errors.businessName && (
                    <p className="text-sm text-destructive">
                      {errors.businessName}
                    </p>
                  )}
                </div>

                {/* Business type */}
                <div className="space-y-2">
                  <Label htmlFor="businessType">Тип бизнеса *</Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) =>
                      handleChange("businessType", value)
                    }
                  >
                    <SelectTrigger
                      className={errors.businessType ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="venue">Площадка / Ресторан</SelectItem>
                      <SelectItem value="service">Услуги (кейтеринг, фото, декор)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.businessType && (
                    <p className="text-sm text-destructive">
                      {errors.businessType}
                    </p>
                  )}
                </div>

                {/* Contact name */}
                <div className="space-y-2">
                  <Label htmlFor="contactName">Контактное лицо *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleChange("contactName", e.target.value)}
                    placeholder="Иван Иванов"
                    className={errors.contactName ? "border-destructive" : ""}
                  />
                  {errors.contactName && (
                    <p className="text-sm text-destructive">
                      {errors.contactName}
                    </p>
                  )}
                </div>

                {/* Email and Phone */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="email@company.ru"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+7 (999) 123-45-67"
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city">Город *</Label>
                  <Select
                    value={formData.city}
                    onValueChange={(value) => handleChange("city", value)}
                  >
                    <SelectTrigger
                      className={errors.city ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Выберите город" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                      <SelectItem value="other">Другой город</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.city && (
                    <p className="text-sm text-destructive">{errors.city}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Расскажите о вашем бизнесе
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Опишите вашу площадку или услуги, вместимость, особенности..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              size="lg"
              className="w-full gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Отправка..."
              ) : (
                <>
                  Отправить заявку
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь с{" "}
              <a href="/privacy" className="text-primary hover:underline">
                политикой конфиденциальности
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
