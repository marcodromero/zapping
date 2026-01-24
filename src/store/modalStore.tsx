import { create } from 'zustand';

type ChannelStore = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModalStore = create<ChannelStore>((set) => ({
  isModalOpen: false,
  openModal: () => set(() => ({ isModalOpen: true })),
  closeModal: () => set(() => ({ isModalOpen: true })),
}));
