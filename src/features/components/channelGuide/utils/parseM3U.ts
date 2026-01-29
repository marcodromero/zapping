import type { ChannelType, playerType } from '../../../../types/channelTypes';
import getTwitchUrl from './getTwitchUrl';
import getYoutubeUrl from './getYoutubeUrl';

const regexMetadata =
  /#EXTINF:(-?\d+)\s+tvg-id="([^"]*)"\s+tvg-logo="([^"]*)"\s+group-title="([^"]*)",(.*)/;
const regexURL = /(https?:\/\/[^\s]+)/g;

export function parseM3U(content: string): ChannelType[] {
  const channels: ChannelType[] = [];
  const lines = content.split('\n');
  let currentMetadata: ChannelType | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const metadataMatch = trimmedLine.match(regexMetadata);
    const urlMatch = trimmedLine.match(regexURL);

    if (metadataMatch) {
      currentMetadata = {
        duration: parseInt(metadataMatch[1]),
        tvgId: metadataMatch[2],
        tvgLogo: metadataMatch[3],
        group: metadataMatch[4],
        name: metadataMatch[5].trim(),
        url: '',
        player: undefined,
      };
    } else if (currentMetadata && urlMatch) {
      const playerInfo = getPlayerInfo(urlMatch[0]);

      channels.push({
        ...currentMetadata,
        url: playerInfo.channelUrl,
        player: playerInfo.player,
      });

      currentMetadata = null;
    }
  }
  return channels;
}

function getPlayerInfo(url: string): {
  channelUrl: string;
  player: playerType;
} {
  if (url.includes('twitch.tv')) {
    return { channelUrl: getTwitchUrl(url), player: 'twitch' };
  }

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return {
      channelUrl: getYoutubeUrl(url),
      player: 'youtube',
    };
  }

  return {
    channelUrl: url,
    player: 'hls',
  };
}
