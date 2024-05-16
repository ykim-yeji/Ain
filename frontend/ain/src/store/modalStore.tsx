import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface StoreState {
  headerDropDown: boolean;
  setHeaderDropDown: () => void;
  setHeaderDropDownFalse: () => void;
  nicknameModalState: boolean;
  setNicknameModalState: () => void;
  testNum: number;
  increaseTestNum: () => void;
  navOverlay: boolean;
  toggleNavOverlay: () => void;
  idealDetailModalOpen: boolean;
  setIdealDetailModalTrue: () => void;
  setIdealDetailModalFalse: () => void;
  idealDropDown: boolean;
  setIdealDropDownTrue: () => void;
  setIdealDropDownFalse: () => void;
  idealNicknameModalState: boolean;
  setIdealNicknameModalState: () => void;
  hideIdealList: boolean;
  setHideIdealListTrue: () => void;
  setHideIdealListFalse: () => void;
  isNicknameModified: number;
  setIsNicknameModified: () => void;
}

const useModalStore = create<StoreState>((set, get) => ({
  headerDropDown: false,
  setHeaderDropDown: () =>
    set((state) => ({
      headerDropDown: !state.headerDropDown,
      idealDropDown: false,
    })),
  setHeaderDropDownFalse: () => set({ headerDropDown: false }),
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
  idealDetailModalOpen: false,
  setIdealDetailModalTrue: () => set({ idealDetailModalOpen: true }),
  setIdealDetailModalFalse: () => set({ idealDetailModalOpen: false }),
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
  hideIdealList: false,
  setHideIdealListTrue: () => {
    set({ hideIdealList: true });
  },
  setHideIdealListFalse: () => {
    set({ hideIdealList: false });
  },
  isNicknameModified: 0,
  setIsNicknameModified: () => {
    set((state) => ({
      isNicknameModified: state.isNicknameModified + 1,
    }));
  },
}));

export default useModalStore;
