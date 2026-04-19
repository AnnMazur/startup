import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/lib/types";
import { UserRole } from "@/lib/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  showAuthModal: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  toggleFavorite: (venueId: string) => void;
  isFavorite: (venueId: string) => boolean;
}

// Mock user for demo
const mockUser: User = {
  id: "u1",
  email: "demo@fanfan.ru",
  name: "Анна Иванова",
  phone: "+7 (999) 123-45-67",
  role: UserRole.USER,
  favoriteVenueIds: ["v1", "v3"],
  createdAt: new Date("2026-01-15"),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      showAuthModal: false,

      login: async (email: string, _password: string) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        set({
          user: { ...mockUser, email },
          isAuthenticated: true,
          isLoading: false,
          showAuthModal: false,
        });
      },

      register: async (name: string, email: string, _password: string) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        set({
          user: { ...mockUser, name, email, favoriteVenueIds: [] },
          isAuthenticated: true,
          isLoading: false,
          showAuthModal: false,
        });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      openAuthModal: () => {
        set({ showAuthModal: true });
      },

      closeAuthModal: () => {
        set({ showAuthModal: false });
      },

      toggleFavorite: (venueId: string) => {
        const { user, isAuthenticated, openAuthModal } = get();
        if (!isAuthenticated || !user) {
          openAuthModal();
          return;
        }

        const favorites = user.favoriteVenueIds;
        const isFav = favorites.includes(venueId);
        const newFavorites = isFav
          ? favorites.filter((id) => id !== venueId)
          : [...favorites, venueId];

        set({
          user: { ...user, favoriteVenueIds: newFavorites },
        });
      },

      isFavorite: (venueId: string) => {
        const { user } = get();
        return user?.favoriteVenueIds.includes(venueId) ?? false;
      },
    }),
    {
      name: "fanfan-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
