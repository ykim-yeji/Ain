import { create } from 'zustand';

interface StoreState {
     mergeInput: string,
     genderInput: string|null,
     mbti: string,
     imageUrl: string,
     characterName: string,
     imageFile: Blob|null
  }
  
const useCreateStore = create<StoreState>(set => ({
    mergeInput: '',
    genderInput: null,
    mbti: '',
    imageUrl: '',
    characterName: '',
    imageFile: null
}))
  
export default useCreateStore;