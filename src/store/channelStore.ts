import { create } from 'zustand';
import type { ChannelType, playerType } from '../types/channelTypes';
import getChannels from '../features/components/channelGuide/utils/getChannels';

type ChannelStore = {
  activeChannel: string;
  activePlayer: playerType;
  channels: ChannelType[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  setActiveChannel: (channelUrl: string) => void;
  setActivePlayer: (playerName: playerType) => void;
  fetchChannels: () => Promise<void>;
  setSearchTerm: (term: string) => void;
};

export const useChannelStore = create<ChannelStore>((set, get) => ({
  channels: [],
  activeChannel: '',
  activePlayer: undefined,
  searchTerm: '',
  isLoading: false,
  error: null,
  setActiveChannel: (channelUrl) => set({ activeChannel: channelUrl }),
  setActivePlayer: (playerName) => set({ activePlayer: playerName }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  fetchChannels: async () => {
    if (get().isLoading) {
      console.log('Petición bloqueada: ya hay una carga en curso.');
      return;
    }
    set({ isLoading: true, error: null });
    try {
      const channelsData = await getChannels();
      if (!channelsData) throw new Error('No se obtuvieron datos de canales.');
      set({ channels: channelsData });
    } catch (err: unknown) {
      if (err instanceof Error) set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
