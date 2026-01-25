export function isTwitchURL(url: string): boolean {
  if (!url) throw Error('Falta URL');
  const regexTwitch = /(?:https?:\/\/)?(?:www\.)?twitch\.tv\b/;
  return regexTwitch.test(url);
}

export function isYoutubeURL(url: string): boolean {
  if (!url) throw Error('Falta URL');
  const regexYoutube = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\b/;
  return regexYoutube.test(url);
}
