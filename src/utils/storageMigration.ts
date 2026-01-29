const CURRENT_VERSION = 2;

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

  localStorage.setItem('app_version', CURRENT_VERSION.toString());
}
