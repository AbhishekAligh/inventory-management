import { create } from "zustand";
type UserRole = {
  isAdmin: boolean;
  toggleRole: () => void;
};

const useUserStore = create<UserRole>((set) => ({
  isAdmin: true,
  toggleRole: () => set((state) => ({ isAdmin: state.isAdmin ? false : true })),
}));

export default useUserStore;
