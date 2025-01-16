import { create } from "zustand";

export interface IItem {
  name: string;
  category: string;
  quantity: string;
  price: string;
  value: string;
  disabled?: boolean;
}

interface IInventoryStore {
  items: IItem[];
  isLoading: boolean;
  disableItem: (name: string) => void;
  editItem: (name: string, payload: object) => void;
  deleteItem: (name: string) => void;
  initializeStore: () => void;
  totalProducts?: () => number;
  totalStoreValue?: () => number;
  outOfStock?: () => number;
  noOfCategories?: () => number;
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
  editItem: (name: string, payload) => {
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
  totalProducts: (): number => {
    const items = useInventoryStore.getState().items;
    return items.filter((item) => !item.disabled).length;
  },
  totalStoreValue: (): number => {
    const items = useInventoryStore.getState().items;
    return items
      .filter((item) => !item.disabled)
      .reduce(
        (total, item) => total + parseFloat(item.value.replace("$", "")),
        0
      );
  },
  outOfStock: (): number =>
    useInventoryStore.getState().items.filter((item) => item.quantity == "0")
      .length,
  noOfCategories: (): number =>
    new Set(useInventoryStore.getState().items.map((item) => item.category))
      .size,
}));
useInventoryStore.getState().initializeStore();
export default useInventoryStore;
