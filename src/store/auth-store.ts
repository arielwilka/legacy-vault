// ============================================================
// Legacy Vault — Auth Store (Zustand)
// Dummy authentication state for the frontend mockup
// ============================================================

import { create } from "zustand";
import { User } from "@/types";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  /** Dummy login — just sets a mock user */
  login: (email, password) => {
    console.log("[Auth] Login attempt:", { email, password });
    set({
      user: {
        id: "user-001",
        name: email.split("@")[0],
        email,
      },
      isAuthenticated: true,
    });
  },

  /** Dummy register — creates a mock user */
  register: (name, email, password) => {
    console.log("[Auth] Register attempt:", { name, email, password });
    set({
      user: {
        id: "user-001",
        name,
        email,
      },
      isAuthenticated: true,
    });
  },

  /** Logout — clears user state */
  logout: () => {
    console.log("[Auth] Logout");
    set({ user: null, isAuthenticated: false });
  },
}));
