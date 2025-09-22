import validateM3U from './validateM3U';

export default async function getChannels() {
	const url = localStorage.getItem('url');
	if (!url) return;

	const response = await fetch(url);
	const M3UFile = await response.text();

	if (!validateM3U(M3UFile)) throw Error('No es un M3U valido.');

	let channels = [];
	let currentChannel = null;

	let textLines = M3UFile.split('\n');

	const regexMetadata =
		/#EXTINF:(-?\d+)\s+tvg-id="([^"]*)"\s+tvg-logo="([^"]*)"\s+group-title="([^"]*)",(.*)/;
	const regexURL = /(https?:\/\/[^\s]+)/g;

	textLines.forEach((line) => {
		const metadataMatch = line.match(regexMetadata);
		let urlMatch = line.match(regexURL);

		if (metadataMatch) {
			currentChannel = {
				duration: parseInt(metadataMatch[1]),
				tvgId: metadataMatch[2],
				tvgLogo: metadataMatch[3],
				group: metadataMatch[4],
				name: metadataMatch[5].trim(),
			};
		} else if (currentChannel && urlMatch) {
			channels.push({
				...currentChannel,
				url: urlMatch[0],
			});

			currentChannel = null;
		}
	});
	return channels;
}
