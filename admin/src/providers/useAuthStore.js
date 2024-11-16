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
      name: "auth",
      storage: createJSONStorage(() => localStorage), 
    })
  )
);

export default useAuthStore;
