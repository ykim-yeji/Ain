import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface StoreState {
  isLogin: boolean;
  setIsLogin: () => void;
  accessToken: string;
  setAccessToken: (token: string) => void;
  refreshToken: string;
  setRefreshToken: (refreshToken: string) => void;
  memeberId: number;
}

const useUserStore = create(
  persist<StoreState>(
    (set, get) => ({
      isLogin: false,
      setIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),
      accessToken: '',
      // getAccessToken: () => get().accessToken,
      setAccessToken: (token: string) => set({ accessToken: token }),
      refreshToken: '',
      setRefreshToken: (refreshToken: string) =>
        set({
          refreshToken: refreshToken,
        }),
      memeberId: 0,
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
