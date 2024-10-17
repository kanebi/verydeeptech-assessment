import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}
export interface CartProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  quantity: number;
  image: string | undefined;
}

interface UserState {
  isLoggedIn: boolean;
  user: {
    email: string;
  } | null;
}

interface CartState {
  items: CartProduct[];
}

interface StoreState extends UserState, CartState {
  login: (email: string) => void;
  logout: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  deleteFromCart: (productId: number) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // User state
      isLoggedIn: false,
      user: null,
      login: (email: string) => set({ isLoggedIn: true, user: { email } }),
      logout: () => set({ isLoggedIn: false, user: null }),

      // Cart state
      items: [],
      addToCart: (product: Product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return { items: [...state.items, { ...product, quantity: 1 }] };
          }
        }),
      removeFromCart: (productId: number) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartProduct[]),
        })),
      deleteFromCart: (productId: number) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.id != productId) {
              acc.push(item);
            }
            return acc;
          }, [] as CartProduct[]),
        })),
    }),
    {
      name: "store-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
