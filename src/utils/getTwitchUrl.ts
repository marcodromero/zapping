export default function getTwitchUrl(url: string): string {
  if (!url) throw new Error('Falta URL');

  const regexTwitchChannel =
    /(?:https?:\/\/(?:www\.)?)twitch\.tv\/([a-zA-Z0-9]\w{2,24})\/?$/i;

  const result = url.match(regexTwitchChannel);

  return `https://player.twitch.tv/?channel=${result && result[1]}&parent=zapping-sooty.vercel.app&muted=false`;
}
