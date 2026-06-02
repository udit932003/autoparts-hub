"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
};

type CartState = { items: CartItem[] };

type Action =
  | { type: "ADD"; item: Omit<CartItem, "quantity">; quantity?: number }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; state: CartState };

const STORAGE_KEY = "autoparts_cart";

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.item.id);
      const addQty = action.quantity ?? 1;
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.item.id
              ? { ...i, quantity: Math.min(i.quantity + addQty, i.stock) }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { ...action.item, quantity: addQty }],
      };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "SET_QTY":
      return {
        items: state.items.map((i) =>
          i.id === action.id
            ? { ...i, quantity: Math.max(1, Math.min(action.quantity, i.stock)) }
            : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return action.state;
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        dispatch({ type: "HYDRATE", state: JSON.parse(saved) });
      } catch {
        /* ignore corrupt cart */
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem: (item, quantity) => dispatch({ type: "ADD", item, quantity }),
        removeItem: (id) => dispatch({ type: "REMOVE", id }),
        setQuantity: (id, quantity) => dispatch({ type: "SET_QTY", id, quantity }),
        clear: () => dispatch({ type: "CLEAR" }),
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
