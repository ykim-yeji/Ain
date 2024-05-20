import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface StoreState {
  selectedIdealName: string;
  selectedIdealFullName: string;
  selectedIdealId: number;
  selectedIdealThreadId: string;
  selectedIdealImageUrl: string;
  setTempIdealName: (selectedIdealName: string) => void;
  setTempIdealFullName: (selectedIdealOriginName: string) => void;
  setTempIdealId: (selectedIdealId: number) => void;
  setTempIdealThreadId: (selectedIdealThreadId: string) => void;
  setTempIdealImageUrl: (selectedIdealImageUrl: string) => void;
}

const useIdealStore = create(
  persist<StoreState>(
    (set, get) => ({
      selectedIdealName: '',
      selectedIdealFullName: '',
      selectedIdealId: 0,
      selectedIdealThreadId: '',
      selectedIdealImageUrl: '',
      setTempIdealName: (name: string) => set({ selectedIdealName: name }),
      setTempIdealFullName: (fullName: string) => set({ selectedIdealFullName: fullName }),
      setTempIdealId: (id: number) => set({ selectedIdealId: id }),
      setTempIdealThreadId: (threadId: string) => set({ selectedIdealThreadId: threadId }),
      setTempIdealImageUrl: (imageUrl: string) => set({ selectedIdealImageUrl: imageUrl }),
    }),
    {
      name: 'ideal',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useIdealStore;
