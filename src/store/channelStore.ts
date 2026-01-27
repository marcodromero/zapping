import { create } from 'zustand';
import type { ChannelType, playerType } from '../types/channelTypes';
import getChannels from '../features/components/channelGuide/utils/getChannels';

type ChannelStore = {
  currentChannelUrl: string;
  player: playerType;
  setCurrentChannelUrl: (url: string) => void;
  setPlayer: (type: playerType) => void;
  channels: ChannelType[] | undefined;
  fetchChannels: () => Promise<void>;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export const useChannelStore = create<ChannelStore>((set) => ({
  channels: undefined,
  currentChannelUrl: '',
  player: undefined,
  setCurrentChannelUrl: (url) => set(() => ({ currentChannelUrl: url })),
  setPlayer: (type: playerType) => set(() => ({ player: type })),
  fetchChannels: async () => {
    const data = await getChannels();
    set({ channels: data });
  },
  searchTerm: '',
  setSearchTerm: (searchTerm) => set({ searchTerm }),
}));
