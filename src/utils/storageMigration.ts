const CURRENT_VERSION = 3;

export function migrateStorage(): void {
  const storedVersion = parseInt(localStorage.getItem('app_version') || '1');

  if (storedVersion >= CURRENT_VERSION) return;

  if (storedVersion < 2) {
    const oldUrl = localStorage.getItem('url');
    if (oldUrl) {
      localStorage.setItem('playlists', JSON.stringify([oldUrl]));
      localStorage.removeItem('url');
    }
  }

  if (storedVersion < 3) {
    const rawData = localStorage.getItem('playlists');
    if (rawData) {
      const playlists = JSON.parse(rawData);
      const newPlaylists = playlists.map((url: string) => ({
        url,
        playlistName: 'Playlist',
      }));

      localStorage.setItem('playlists', JSON.stringify(newPlaylists));
    }
  }

  localStorage.setItem('app_version', CURRENT_VERSION.toString());
}
