import { makeAutoObservable, runInAction } from "mobx";

interface IProduct {
  name: string;
  category: string;
  price: string;
  value: string;
  quantity: string;
}

class InventoryStore {
  data: IProduct[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    // Initialize data when store is created
    this.getInventory();
  }

  async getInventory() {
    try {
      this.isLoading = true;
      const response = await fetch(
        "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch inventory");
      }
      const data = await response.json();

      // Use runInAction when modifying observable state after async operation
      runInAction(() => {
        this.data = data;
        this.error = null;
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : "An error occurred";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  addItem(item: IProduct) {
    this.data.push(item);
  }

  // Helper method to check if data is ready
  get isReady(): boolean {
    return !this.isLoading && !this.error && this.data.length > 0;
  }
}

const inventoryStore = new InventoryStore();
export default inventoryStore;
