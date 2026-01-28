import { useAlertStore } from '../../../../store/alertStore';
import { useChannelStore } from '../../../../store/channelStore';
import { useModalStore } from '../../../../store/modalStore';
import { isM3UPlaylist } from '../../../../utils/validators';

export default async function savePlaylist(
  url: string | null,
): Promise<boolean> {
  const { showAlert } = useAlertStore.getState();
  const { fetchChannels } = useChannelStore.getState();

  try {
    if (!url || url.trim() === '') return false;

    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        throw new Error();
      }
    } catch (e) {
      console.error('URL inválida:', url);
      showAlert('error');
      return false;
    }

    const response = await fetch(url);

    if (!response) {
      showAlert('error');
      return false;
    }

    const content = await response.text();

    if (!isM3UPlaylist(content)) {
      showAlert('error');
      return false;
    }

    const oldData = localStorage.getItem('url');

    const rawData = localStorage.getItem('playlists');
    let savedPlaylists: string[] = rawData ? JSON.parse(rawData) : [];

    //si existen datos de la version antigua de la app los vuelca al array
    if (oldData) {
      savedPlaylists.push(oldData);
      localStorage.removeItem(url);
    }

    savedPlaylists.push(url);
    localStorage.setItem('playlists', JSON.stringify(savedPlaylists));

    await fetchChannels();
    useModalStore.setState({ isActive: false });
    return true;
  } catch (error) {
    showAlert('error');
    return false;
  }
}
