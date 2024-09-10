import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

const orderStore = (set, get) => ({
  orders: [],
  noOfOrder: 0,
  addOrder: (order) => {
    set((state) => ({
      orders: [order, ...state.orders],
      noOfOrder: state.noOfOrder + 1,
    }));
  },
  removeOrder: (orderId) => {
    set((state) => ({
      orders: state.orders.filter((item) => item !== orderId),
      noOfOrder: state.noOfOrder - 1,
    }));
  },
  reset: () => {
    set({
      orders: [],
      noOfOrder: 0,
    });
  },
});

const useOrderStore = create(
  devtools(
    persist(orderStore, {
      name: "orders",
      storage: createJSONStorage(() => localStorage),
    })
  )
);

export default useOrderStore;
