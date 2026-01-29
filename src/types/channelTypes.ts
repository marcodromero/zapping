export type playerType = 'twitch' | 'youtube' | 'hls';

export type ChannelType = {
  duration: number;
  tvgId: string;
  tvgLogo: string;
  group: string;
  name: string;
  url: string;
  player: playerType;
};
