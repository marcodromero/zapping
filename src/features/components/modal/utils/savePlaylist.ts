import { useAlertStore } from '../../../../store/alertStore';
import { useChannelStore } from '../../../../store/channelStore';
import { useModalStore } from '../../../../store/modalStore';
import { isM3UPlaylist } from '../../../../utils/validators';

export default async function savePlaylist(url: string | null): Promise<void> {
  const { showAlert } = useAlertStore.getState();
  const { fetchChannels } = useChannelStore.getState();

  if (!url || url.trim() === '') return;

  try {
    const rawData = localStorage.getItem('playlists');
    let savedPlaylists: string[] = [];
    try {
      savedPlaylists = rawData ? JSON.parse(rawData) : [];
    } catch {
      savedPlaylists = [];
    }

    if (savedPlaylists.includes(url))
      throw new Error('Ya existe una Playlist con esa URL');

    const response = await fetch(url);
    if (!response.ok) throw new Error('No se pudo acceder a la URL');

    const content = await response.text();

    if (!isM3UPlaylist(content)) {
      throw new Error('No es una Playlist M3U valida');
    }

    savedPlaylists.push(url);
    localStorage.setItem('playlists', JSON.stringify(savedPlaylists));

    await fetchChannels();
    useModalStore.setState({ isActive: false });
    showAlert('success', '');
    return;
  } catch (error: unknown) {
    if (error instanceof Error) showAlert('error', error.message);
    return;
  }
}
