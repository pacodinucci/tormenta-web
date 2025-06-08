import { create } from "zustand";

export interface Stock {
  id: string;
  productId: string;
  color: string;
  size: string;
  quantity: number;
}

interface StockStore {
  stocks: Stock[];
  loading: boolean;
  error: string | null;
  fetchStocks: () => Promise<void>;
  fetchStocksByColor: (productId: string, color: string) => Promise<void>; // 🔥 nuevo
  getStockByAttributes: (
    productId: string,
    color: string,
    size: string
  ) => Stock | undefined;
  getStocksByColor: (productId: string, color: string) => Stock[];
}

export const useStockStore = create<StockStore>((set, get) => ({
  stocks: [],
  loading: false,
  error: null,

  fetchStocks: async () => {
    try {
      set({ loading: true, error: null });

      const res = await fetch("/api/stocks");
      const data = await res.json();

      set({ stocks: data, loading: false });
    } catch (err) {
      console.error("Error al cargar stocks", err);
      set({ error: "Error al cargar stocks", loading: false });
    }
  },

  fetchStocksByColor: async (productId, color) => {
    try {
      set({ loading: true, error: null });

      const res = await fetch(
        `/api/stock?productId=${productId}&color=${color}`
      );
      if (!res.ok) throw new Error("Error al buscar stock por color");

      const data = await res.json();
      set({ stocks: data, loading: false });
    } catch (err) {
      console.error("Error al buscar stock por color", err);
      set({ error: "Error al buscar stock", loading: false });
    }
  },

  getStockByAttributes: (productId, color, size) => {
    return get().stocks.find(
      (s) =>
        s.productId === productId &&
        s.color.toLowerCase() === color.toLowerCase() &&
        s.size.toLowerCase() === size.toLowerCase()
    );
  },

  getStocksByColor: (productId, color) => {
    return get().stocks.filter(
      (s) =>
        s.productId === productId &&
        s.color.toLowerCase() === color.toLowerCase()
    );
  },
}));
