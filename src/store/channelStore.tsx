import { create } from 'zustand';

type ChannelStore = {
  currentChannelUrl: string;
  setCurrentChannelUrl: (url: string) => void;
};

export const useChannelStore = create<ChannelStore>((set) => ({
  currentChannelUrl: '',
  setCurrentChannelUrl: (url: string) =>
    set(() => ({ currentChannelUrl: url })),
}));
