import getTwitchUrl from './getTwitchUrl';
import getYoutubeUrl from './getYoutubeUrl';
import { isM3UPlaylist } from '../../../../utils/validators';
import type { playerType } from '../../../../types/channelTypes';

type ChannelType = {
  duration: number;
  tvgId: string;
  tvgLogo: string;
  group: string;
  name: string;
  url: string;
  player: playerType;
};

const regexMetadata =
  /#EXTINF:(-?\d+)\s+tvg-id="([^"]*)"\s+tvg-logo="([^"]*)"\s+group-title="([^"]*)",(.*)/;
const regexURL = /(https?:\/\/[^\s]+)/g;

export default async function getChannels(): Promise<
  ChannelType[] | undefined
> {
  const oldRawData = localStorage.getItem('url');

  if (oldRawData) {
    localStorage.setItem('playlists', JSON.stringify([oldRawData]));
    localStorage.removeItem('url');
  }

  const rawData = localStorage.getItem('playlists');
  if (!rawData) return;
  const playlists = JSON.parse(rawData);

  let channels: ChannelType[] = [];
  let currentMetadata: ChannelType | null = null;
  let channelUrl: string = '';
  let metadataMatch: RegExpMatchArray | null;
  let urlMatch: RegExpMatchArray | null;
  let trimmedLine: string = '';
  let player: 'twitch' | 'youtube' | 'hls' | '' = '';

  //////
  for (const playlist of playlists) {
    const response = await fetch(playlist);
    if (!response.ok) throw new Error('Error al obtener el archivo M3U.');
    const content = await response.text();

    if (!isM3UPlaylist(content)) throw Error('No es un M3U valido.');

    let lines = content.split('\n');
    for (const line of lines) {
      trimmedLine = line.trim();
      if (!trimmedLine) continue;

      metadataMatch = trimmedLine.match(regexMetadata);
      urlMatch = trimmedLine.match(regexURL);

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
        if (urlMatch[0].includes('twitch.tv')) {
          channelUrl = getTwitchUrl(urlMatch[0]);
          player = 'twitch';
        } else if (
          urlMatch[0].includes('youtube.com') ||
          urlMatch[0].includes('youtu.be')
        ) {
          channelUrl = getYoutubeUrl(urlMatch[0]);
          player = 'youtube';
        } else {
          channelUrl = urlMatch[0];
          player = 'hls';
        }

        channels.push({
          ...currentMetadata,
          url: channelUrl,
          player,
        });

        currentMetadata = null;
      }
    }

    /////
  }

  return channels;
}
