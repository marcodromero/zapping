export default function getYoutubeChannelId(url: string): string | null {
  if (!url) throw Error('Falta URL');

  const channelIdMatch = url.match(
    /(?:youtube\.com)\/(?:channel|c)\/([\w-]{24})/,
  );

  return channelIdMatch ? channelIdMatch[1] : null;
}
