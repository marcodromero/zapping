import { isM3UPlaylist } from './validators';

type ChannelType = {
  duration: number;
  tvgId: string;
  tvgLogo: string;
  group: string;
  name: string;
  url: string;
};

const regexMetadata =
  /#EXTINF:(-?\d+)\s+tvg-id="([^"]*)"\s+tvg-logo="([^"]*)"\s+group-title="([^"]*)",(.*)/;
const regexURL = /(https?:\/\/[^\s]+)/g;

export default async function getChannels(): Promise<
  ChannelType[] | undefined
> {
  const url = localStorage.getItem('url');
  if (!url) return;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Error al obtener el archivo M3U.');
  const content = await response.text();

  if (!isM3UPlaylist(content)) throw Error('No es un M3U valido.');

  let channels: ChannelType[] = [];
  let currentMetadata: ChannelType | null = null;

  let lines = content.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const metadataMatch = trimmedLine.match(regexMetadata);
    let urlMatch = trimmedLine.match(regexURL);

    if (metadataMatch) {
      currentMetadata = {
        duration: parseInt(metadataMatch[1]),
        tvgId: metadataMatch[2],
        tvgLogo: metadataMatch[3],
        group: metadataMatch[4],
        name: metadataMatch[5].trim(),
        url: '',
      };
    } else if (currentMetadata && urlMatch) {
      channels.push({
        ...currentMetadata,
        url: urlMatch[0],
      });

      currentMetadata = null;
    }
  }
  return channels;
}
