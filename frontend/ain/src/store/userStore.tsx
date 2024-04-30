import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface StoreState {
  isLogin: boolean;
  setIsLogin: () => void;
  accessToken: string;
  setAccessToken: (token: string) => void;
  deleteAccessToken: () => void;
  refreshToken: string;
  setRefreshToken: (refreshToken: string) => void;
  memberId: number;
  memberNickname: string;
  setMemberNickname: (memberNickname: string) => void;
}

const useUserStore = create(
  persist<StoreState>(
    (set, get) => ({
      isLogin: false,

      setIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),
      accessToken: '',
      // getAccessToken: () => get().accessToken,
      // isLogin: !!get().accessToken,
      setAccessToken: (token: string | undefined) => {
        if (token === undefined) {
          set({ isLogin: false });
        } else {
          set({ accessToken: token });
          set({ isLogin: true });
        }
      },
      refreshToken: '',
      setRefreshToken: (refreshToken: string) =>
        set({
          refreshToken: refreshToken,
        }),
      deleteAccessToken: () => {
        set({ accessToken: '' });
        set({ isLogin: false });
      },
      memberId: 0,
      memberNickname: '',
      setMemberNickname(memberNickname) {},
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
