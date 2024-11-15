import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

const authStore = (set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
});

const useAuthStore = create()(
  devtools(
    persist(authStore, {
      name: "auth", // The localStorage key to persist the state
      storage: createJSONStorage(() => localStorage), // Using localStorage for persistence
    })
  )
);

export default useAuthStore;
