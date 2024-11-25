import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

const orderStore = (set, get) => ({
  orders: [],
  favouriteList: [],
  customerDetail:{
    contact:null,
    customerId:null
  },
  noOfOrder: 0,
  noOfFavourite: 0,
  addOrder: (order) => {
    set((state) => ({
      orders: [{ ...order, quantity: 1 }, ...state.orders],
      noOfOrder: state.noOfOrder + 1,
    }));
  },
  addFavourite: (order) => {
    set((state) => ({
      favouriteList: [order, ...state.favouriteList],
      noOfFavourite: state.noOfFavourite + 1,
    }));
  },
  removeOrder: (orderId) => {
    set((state) => ({
      orders: state.orders.filter((item) => item.id !== orderId),
      noOfOrder: state.noOfOrder > 0 ? state.noOfOrder - 1 : 0,
    }));
  },
  removeFavourite: (orderId) => {
    set((state) => ({
      favouriteList: state.favouriteList.filter((item) => item.id !== orderId),
      noOfFavourite: state.noOfFavourite > 0 ? state.noOfFavourite - 1 : 0,
    }));
  },

  updateOrderQuantity: (orderId, quantity) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? { ...order, quantity: order.quantity + quantity }
          : order
      ),
    }));
  },

  setCustomerDetail: ({contact,customerId}) => {
    set(() => ({
      customerDetail: {
        contact,
        customerId
       }
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
