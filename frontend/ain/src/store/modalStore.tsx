import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface StoreState {
  headerDropDown: boolean;
  setHeaderDropDown: () => void;
  nicknameModalState: boolean;
  setNicknameModalState: () => void;
  testNum: number;
  increaseTestNum: () => void;
  navOverlay: boolean;
  toggleNavOverlay: () => void;
  idealDropDown: boolean;
  setIdealDropDownTrue: () => void;
  setIdealDropDownFalse: () => void;
  idealNicknameModalState: boolean;
  setIdealNicknameModalState: () => void;
}

const useModalStore = create<StoreState>((set, get) => ({
  headerDropDown: false,
  setHeaderDropDown: () =>
    set((state) => ({
      headerDropDown: !state.headerDropDown,
      idealDropDown: false,
    })),
  nicknameModalState: false,
  setNicknameModalState: () =>
    set((state) => ({
      nicknameModalState: !state.nicknameModalState,
      headerDropDown: false,
      navOverlay: !state.navOverlay,
    })),
  testNum: 1,
  increaseTestNum: () => set((state) => ({ testNum: state.testNum + 1 })),
  navOverlay: false,
  toggleNavOverlay: () =>
    set((state) => ({
      navOverlay: !state.navOverlay,
    })),
  idealDropDown: false,
  setIdealDropDownTrue: () =>
    set({
      idealDropDown: true,
    }),
  setIdealDropDownFalse: () =>
    set({
      idealDropDown: false,
    }),
  idealNicknameModalState: false,
  setIdealNicknameModalState: () =>
    set((state) => ({
      idealNicknameModalState: !state.idealNicknameModalState,
      // headerDropDown: false,
      idealDropDown: false,
      // navOverlay: !state.navOverlay,
    })),
}));

export default useModalStore;
