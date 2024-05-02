import { create } from 'zustand';

interface StoreState {
     mergeInput: string,
     genderInput: number
  }
  
const useCreateStore = create<StoreState>(set => ({
    mergeInput: '',
    genderInput: 0
}))
  
export default useCreateStore;