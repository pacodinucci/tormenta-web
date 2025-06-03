import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  colors: string[];
  images: { url: string; color: string }[];
}

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  setProducts: (products: Product[]) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,
  setProducts: (products) => set({ products }),
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      set({ products: data, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Error al cargar productos", loading: false });
    }
  },
}));
