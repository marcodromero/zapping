import validateM3U from './validateM3U';

export default async function updateM3UURL() {
	try {
		const url = document.getElementById('inputURL').value;
		const response = await fetch(url);

		if (!response.ok) {
			console.error(
				`Error: El servidor respondió con el estado ${response.status}`
			);
			return false;
		}

		const content = await response.text();

		if (validateM3U(content)) {
			localStorage.setItem('url', url);
			return true;
		} else {
			console.error('El contenido del archivo no es un M3U válido.');
			return false;
		}
	} catch (error) {
		console.error('Error al intentar acceder al link:', error);
		return false;
	}
}
