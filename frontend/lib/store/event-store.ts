import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Event, ChecklistItem } from "@/lib/types";
import { EventStatus, EventType } from "@/lib/types";

interface EventState {
  events: Event[];
  currentEventId: string | null;
  createEvent: (templateId: string, type: EventType, name: string) => string;
  updateEvent: (eventId: string, updates: Partial<Event>) => void;
  deleteEvent: (eventId: string) => void;
  setCurrentEvent: (eventId: string | null) => void;
  getCurrentEvent: () => Event | null;
  updateChecklistItem: (
    eventId: string,
    stepId: string,
    updates: Partial<ChecklistItem>
  ) => void;
  getEventProgress: (eventId: string) => number;
}

export const useEventStore = create<EventState>()(
  persist(
    (set, get) => ({
      events: [],
      currentEventId: null,

      createEvent: (templateId: string, type: EventType, name: string) => {
        const id = `e${Date.now()}`;
        const newEvent: Event = {
          id,
          userId: "u1", // Will be replaced with actual user ID
          name,
          type,
          status: EventStatus.DRAFT,
          templateId,
          checklist: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          events: [...state.events, newEvent],
          currentEventId: id,
        }));

        return id;
      },

      updateEvent: (eventId: string, updates: Partial<Event>) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === eventId
              ? { ...event, ...updates, updatedAt: new Date() }
              : event
          ),
        }));
      },

      deleteEvent: (eventId: string) => {
        set((state) => ({
          events: state.events.filter((event) => event.id !== eventId),
          currentEventId:
            state.currentEventId === eventId ? null : state.currentEventId,
        }));
      },

      setCurrentEvent: (eventId: string | null) => {
        set({ currentEventId: eventId });
      },

      getCurrentEvent: () => {
        const { events, currentEventId } = get();
        return events.find((e) => e.id === currentEventId) ?? null;
      },

      updateChecklistItem: (
        eventId: string,
        stepId: string,
        updates: Partial<ChecklistItem>
      ) => {
        set((state) => ({
          events: state.events.map((event) => {
            if (event.id !== eventId) return event;

            const existingItemIndex = event.checklist.findIndex(
              (item) => item.stepId === stepId
            );

            let newChecklist: ChecklistItem[];
            if (existingItemIndex >= 0) {
              newChecklist = event.checklist.map((item, index) =>
                index === existingItemIndex ? { ...item, ...updates } : item
              );
            } else {
              newChecklist = [
                ...event.checklist,
                { stepId, completed: false, ...updates },
              ];
            }

            return { ...event, checklist: newChecklist, updatedAt: new Date() };
          }),
        }));
      },

      getEventProgress: (eventId: string) => {
        const { events } = get();
        const event = events.find((e) => e.id === eventId);
        if (!event || event.checklist.length === 0) return 0;

        const completed = event.checklist.filter((item) => item.completed).length;
        return Math.round((completed / event.checklist.length) * 100);
      },
    }),
    {
      name: "fanfan-events",
    }
  )
);
