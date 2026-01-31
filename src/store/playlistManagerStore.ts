import { create } from 'zustand';

type PlaylistManagerStore = {
  isActive: boolean;
  openPlaylistManager: () => void;
  closePlaylistManager: () => void;
};

export const usePlaylistManagerStore = create<PlaylistManagerStore>((set) => ({
  isActive: false,
  openPlaylistManager: () => set(() => ({ isActive: true })),
  closePlaylistManager: () => set(() => ({ isActive: false })),
}));
