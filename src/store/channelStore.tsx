import { create } from 'zustand';

type ChannelStore = {
  currentChannelUrl: string;
  playerType: 'twitch' | 'youtube' | 'hls' | '';
  setCurrentChannelUrl: (url: string) => void;
  setPlayerType: (type: 'twitch' | 'youtube' | 'hls' | '') => void;
};

export const useChannelStore = create<ChannelStore>((set) => ({
  currentChannelUrl: '',
  playerType: '',
  setCurrentChannelUrl: (url: string) =>
    set(() => ({ currentChannelUrl: url })),
  setPlayerType: (type: 'twitch' | 'youtube' | 'hls' | '') =>
    set(() => ({ playerType: type })),
}));
