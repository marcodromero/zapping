export default function isYoutubeURL(url) {
	if (!url) throw Error('Falta URL');
	const regexYoutube = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\b/;
	return regexYoutube.test(url);
}
