// Fan-Fan Event Planning Platform - TypeScript Types

export enum EventType {
  WEDDING = "wedding",
  BIRTHDAY = "birthday",
  CORPORATE = "corporate",
  ANNIVERSARY = "anniversary",
  OTHER = "other",
}

export enum UserRole {
  USER = "user",
  PARTNER = "partner",
  ADMIN = "admin",
}

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

export enum EventStatus {
  DRAFT = "draft",
  PLANNING = "planning",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  favoriteVenueIds: string[];
  createdAt: Date;
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  address: string;
  city: string;
  capacityMin: number;
  capacityMax: number;
  basePrice: number;
  pricePerPerson?: number;
  images: string[];
  features: string[];
  eventTypes: EventType[];
  rating: number;
  reviewCount: number;
  isPromoted?: boolean;
  partnerId: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  basePrice: number;
  priceType: "fixed" | "per_person" | "per_hour";
  images: string[];
  partnerId: string;
}

export enum ServiceCategory {
  CATERING = "catering",
  PHOTOGRAPHY = "photography",
  MUSIC = "music",
  DECORATION = "decoration",
  ENTERTAINMENT = "entertainment",
  TRANSPORT = "transport",
  OTHER = "other",
}

export interface EventTemplate {
  id: string;
  type: EventType;
  name: string;
  description: string;
  icon: string;
  steps: EventStep[];
}

export interface EventStep {
  id: string;
  order: number;
  title: string;
  description: string;
  isRequired: boolean;
  itemType: "venue" | "service" | "task";
}

export interface Event {
  id: string;
  userId: string;
  name: string;
  type: EventType;
  date?: Date;
  guestCount?: number;
  budget?: number;
  status: EventStatus;
  templateId: string;
  checklist: ChecklistItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChecklistItem {
  stepId: string;
  completed: boolean;
  linkedItemId?: string;
  linkedItemType?: "venue" | "service";
  notes?: string;
}

export interface Booking {
  id: string;
  userId: string;
  eventId?: string;
  venueId?: string;
  serviceId?: string;
  date: Date;
  guestCount: number;
  totalPrice: number;
  status: BookingStatus;
  notes?: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  venueId?: string;
  serviceId?: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
}

export interface PartnerApplication {
  id: string;
  businessName: string;
  businessType: "venue" | "service";
  contactName: string;
  email: string;
  phone: string;
  city: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

export interface FeedPost {
  id: string;
  type: "collection" | "promo" | "idea" | "venue";
  title: string;
  description: string;
  images: string[];
  linkUrl?: string;
  linkText?: string;
  venueId?: string;
  createdAt: Date;
}

export interface FeedCollection {
  id: string;
  title: string;
  description: string;
  items: FeedPost[];
}

// Filter types
export interface VenueFilters {
  eventType?: EventType;
  city?: string;
  capacityMin?: number;
  capacityMax?: number;
  priceMin?: number;
  priceMax?: number;
  features?: string[];
}
