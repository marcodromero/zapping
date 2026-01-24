export default function getYoutubeUrl(url: string): string {
  if (!url) throw Error('Falta URL');

  const result = url.match(/(?:youtube\.com)\/(?:channel|c)\/([\w-]{24})/);

  return `https://www.youtube.com/embed/live_stream?channel=${result && result[1]}&autoplay=1`;
}
