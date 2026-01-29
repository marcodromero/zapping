import { isM3UPlaylist } from '../../../../utils/validators';
import type { ChannelType } from '../../../../types/channelTypes';
import { parseM3U } from './parseM3U';

export default async function getChannels(): Promise<ChannelType[]> {
  let playlists: string[] = [];
  try {
    const rawData = localStorage.getItem('playlists');
    if (!rawData) return [];

    playlists = JSON.parse(rawData);

    if (!Array.isArray(playlists)) {
      throw new Error('Formato de playlists inválido en LocalStorage');
    }
  } catch (error) {
    console.error('Error al leer playlists de LocalStorage:', error);
    return [];
  }

  const fetchPromises = playlists.map(async (url: string) => {
    try {
      //Para forzar la petición en el navegador haciendole creer que es una url nueva
      const cacheBuster = `t=${new Date().getTime()}`;
      const separator = url.includes('?') ? '&' : '?';
      const finalUrl = `${url}${separator}${cacheBuster}`;
      //
      const response = await fetch(finalUrl, { cache: 'no-store' });
      if (!response.ok) throw new Error('Error al obtener el archivo M3U.');
      const content = await response.text();
      return isM3UPlaylist(content) ? parseM3U(content) : [];
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      return [];
    }
  });

  const results = await Promise.all(fetchPromises);
  return results.flat();
}
