import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

const authStore = (set) => ({
  accessToken: null,
  searchProduct:null,
  setAccessToken: (token) => set({ accessToken: token }),
  setSearchProduct: (search) => set({ searchProduct: search }),
  clearAccessToken: () => set({ accessToken: null,searchProduct:null}),
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
