export function isM3UPlaylist(content: string): boolean {
  if (!content) throw Error('Falta contenido');
  if (content.trim().startsWith('#EXTM3U')) return true;
  return false;
}
