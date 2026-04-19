import type { FeedPost } from "@/lib/types";

export const feedPosts: FeedPost[] = [
  {
    id: "f1",
    type: "collection",
    title: "Свадьба под ключ",
    description:
      "Подборка лучших площадок для свадебного торжества с полным пакетом услуг",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    ],
    linkUrl: "/venues?eventType=wedding",
    linkText: "Смотреть подборку",
    createdAt: new Date("2026-04-15"),
  },
  {
    id: "f2",
    type: "venue",
    title: "Усадьба Царицыно",
    description:
      "Историческая усадьба с живописным парком. Скидка 15% на бронирование в мае!",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    ],
    venueId: "v1",
    linkUrl: "/venues/v1",
    linkText: "Подробнее",
    createdAt: new Date("2026-04-14"),
  },
  {
    id: "f3",
    type: "idea",
    title: "Идея для свидания",
    description:
      "Романтический ужин на яхте с видом на закат. Создайте незабываемые воспоминания",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    ],
    venueId: "v6",
    linkUrl: "/venues/v6",
    linkText: "Забронировать",
    createdAt: new Date("2026-04-13"),
  },
  {
    id: "f4",
    type: "collection",
    title: "Детский праздник мечты",
    description:
      "Лучшие площадки для детского дня рождения с аниматорами и развлечениями",
    images: [
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80",
    ],
    linkUrl: "/venues?eventType=birthday",
    linkText: "Смотреть подборку",
    createdAt: new Date("2026-04-12"),
  },
  {
    id: "f5",
    type: "promo",
    title: "Весенняя акция",
    description:
      "Забронируйте площадку до конца апреля и получите скидку 20% на декор",
    images: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    ],
    linkUrl: "/venues",
    linkText: "Выбрать площадку",
    createdAt: new Date("2026-04-11"),
  },
  {
    id: "f6",
    type: "venue",
    title: "Лофт Factory",
    description:
      "Современное пространство для креативных мероприятий. Новые даты в мае!",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    ],
    venueId: "v2",
    linkUrl: "/venues/v2",
    linkText: "Подробнее",
    createdAt: new Date("2026-04-10"),
  },
  {
    id: "f7",
    type: "idea",
    title: "Корпоратив на природе",
    description:
      "Загородный клуб с барбекю, баней и активностями для команды",
    images: [
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
    ],
    venueId: "v4",
    linkUrl: "/venues/v4",
    linkText: "Узнать больше",
    createdAt: new Date("2026-04-09"),
  },
  {
    id: "f8",
    type: "collection",
    title: "Камерные площадки",
    description:
      "Уютные места для небольших торжеств до 50 гостей",
    images: [
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80",
    ],
    linkUrl: "/venues?capacityMax=50",
    linkText: "Смотреть подборку",
    createdAt: new Date("2026-04-08"),
  },
];
