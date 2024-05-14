import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface StoreState {
  mergeInput: string;
  genderInput: string;
  mbti: string;
  imageUrl: string;
  characterName: string;
  imageFile: Blob | null;
}

const useCreateStore = create(
  persist<StoreState>(
    (set) => ({
      mergeInput: '',
      genderInput: '',
      mbti: '',
      imageUrl: '',
      characterName: '',
      imageFile: null,
    }),
    {
      name: 'create',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCreateStore;
