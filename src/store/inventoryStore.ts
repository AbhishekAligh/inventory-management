import { create } from "zustand";

interface IItems {
  name: string;
  category: string;
  quantity: string;
  price: string;
  value: string;
  disabled?: boolean;
}

interface IInventoryStore {
  items: IItems[];
  isLoading: boolean;
  disableItem: (name: string) => void;
  editItem: (name: string, payload: IItems) => void;
  deleteItem: (name: string) => void;
  initializeStore: () => void;
  totalProducts?: () => number;
  totalStoreValue?: number;
  outOfStock?: number;
  noOfCategories?: number;
}

const useInventoryStore = create<IInventoryStore>((set) => ({
  items: [],
  isLoading: true,
  initializeStore: async () => {
    try {
      const response = await fetch(
        "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
      );
      const data = await response.json();
      set({ items: data });
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
      set({ items: [] });
    }
  },
  editItem: (name: string, payload: IItems) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.name === name ? { ...item, ...payload } : item
      ),
    }));
  },
  disableItem: (name: string) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.name === name
          ? { ...item, disabled: !item.disabled ? true : false }
          : item
      ),
    }));
  },
  deleteItem: (name: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.name !== name),
    }));
  },
  setItems: (newItems: IItems[]) => set({ items: newItems }),
}));
useInventoryStore.getState().initializeStore();
export default useInventoryStore;
