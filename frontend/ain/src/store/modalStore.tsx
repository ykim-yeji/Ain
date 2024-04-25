import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface StoreState {
  nicknameModalState: boolean;
  setNicknameModalState: () => void;
}

const useModalStore = create(
  persist<StoreState>(
    (set, get) => ({
      nicknameModalState: false,
      setNicknameModalState: () => set((state) => ({ nicknameModalState: !state.nicknameModalState })),
    }),
    {
      name: 'modal',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useModalStore;
