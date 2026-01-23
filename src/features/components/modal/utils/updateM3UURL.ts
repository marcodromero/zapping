import { isM3UPlaylist } from '../../../../utils/validators';

export default async function updateM3UURL(
  url: string | null,
): Promise<boolean> {
  try {
    if (!url) return false;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(
        `Error: El servidor respondió con el estado ${response.status}`,
      );
      return false;
    }

    const content = await response.text();

    if (!isM3UPlaylist(content)) {
      console.error('El contenido del archivo no es un M3U válido.');
      return false;
    }
    localStorage.setItem('url', url);
    return true;
  } catch (error) {
    console.error('Error al intentar acceder al link:', error);
    return false;
  }
}
