import { useAlertStore } from '../../../../store/alertStore';
import { useChannelStore } from '../../../../store/channelStore';
import { usePlaylistManagerStore } from '../../../../store/playlistManagerStore';
import type { playlistType } from '../../../../types/channelTypes';
import { isM3UPlaylist } from '../../../../utils/validators';

export default async function savePlaylist({
  url,
  playlistName = 'Playlist',
}: playlistType): Promise<void> {
  const { showAlert } = useAlertStore.getState();
  const { fetchChannels } = useChannelStore.getState();

  if (!url || url.trim() === '') return;

  try {
    const rawData = localStorage.getItem('playlists');
    let savedPlaylists: playlistType[] = [];
    try {
      savedPlaylists = rawData ? JSON.parse(rawData) : [];
    } catch {
      savedPlaylists = [];
    }

    const isDuplicate = savedPlaylists.some((item) => item.url === url);

    if (isDuplicate) {
      throw new Error('Esta URL ya está en tu lista');
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error('No se pudo acceder a la URL');

    const content = await response.text();

    if (!isM3UPlaylist(content)) {
      throw new Error('No es una Playlist M3U valida');
    }

    savedPlaylists.push({ url, playlistName });
    localStorage.setItem('playlists', JSON.stringify(savedPlaylists));

    await fetchChannels();
    usePlaylistManagerStore.setState({ isActive: false });
    showAlert('success', '');
    return;
  } catch (error: unknown) {
    if (error instanceof Error) showAlert('error', error.message);
    return;
  }
}
