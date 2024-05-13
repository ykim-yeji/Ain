import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface StoreState {
  selectedIdealName: string;
  selectedIdealId: number;
  selectedIdealThreadId: string;
  setTempIdealName: (selectedIdealName: string) => void;
  setTempIdealId: (selectedIdealId: number) => void;
  setTempIdealThreadId: (selectedIdealThreadId: string) => void;
}

const useIdealStore = create(
  persist<StoreState>(
    (set, get) => ({
      selectedIdealName: '',
      selectedIdealId: 0,
      selectedIdealThreadId: '',
      setTempIdealName: (name: string) =>
        set({
          selectedIdealName: name,
        }),
      setTempIdealId: (id: number) => set({ selectedIdealId: id }),
      setTempIdealThreadId: (threadId: string) => set({ selectedIdealThreadId: threadId }),
    }),
    {
      name: 'ideal',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useIdealStore;
