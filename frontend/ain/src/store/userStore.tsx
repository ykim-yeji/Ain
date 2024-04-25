import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface StoreState {
  isLogin: boolean;
  setIsLogin: () => void;
}

const useUserStore = create(
  persist<StoreState>(
    (set, get) => ({
      isLogin: false,
      setIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
