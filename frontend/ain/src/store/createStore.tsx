import { create } from 'zustand';

interface StoreState {
     mergeInput: string
  }
  
const useCreateStore = create<StoreState>(set => ({
    mergeInput: ''
}))
  
export default useCreateStore;