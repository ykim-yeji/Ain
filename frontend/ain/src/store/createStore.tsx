import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

interface StoreState {
  isSave: boolean;
  mergeInput: string;
  genderInput: string;
  mbti: string;
  imageUrl: string;
  characterName: string;
  imageFile: string | null; // base64 문자열로 변경
  setImageFile: (file: Blob) => void;
  getImageFile: () => Blob | null;
}

const useCreateStore = create(
  devtools(
    persist<StoreState>(
      (set, get) => ({
        isSave: false,
        mergeInput: '',
        genderInput: '',
        mbti: '',
        imageUrl: '',
        characterName: '',
        imageFile: null,
        setImageFile: (file: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            set({ imageFile: reader.result as string });
          };
          reader.readAsDataURL(file);
        },
        getImageFile: () => {
          const state = get();
          if (state.imageFile) {
            const binary = atob(state.imageFile.split(',')[1]);
            const array = [];
            for (let i = 0; i < binary.length; i++) {
              array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
          }
          return null;
        },
      }),
      {
        name: 'create',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export default useCreateStore;
