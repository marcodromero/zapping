import { create } from 'zustand';

type ChannelStore = {
  isActive: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModalStore = create<ChannelStore>((set) => ({
  isActive: false,
  openModal: () => set(() => ({ isActive: true })),
  closeModal: () => set(() => ({ isActive: false })),
}));
