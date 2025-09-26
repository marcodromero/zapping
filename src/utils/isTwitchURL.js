export default function isTwitchURL(url) {
	if (!url) throw Error('Falta URL');
	const regexTwitch = /(?:https?:\/\/)?(?:www\.)?twitch\.tv\b/;
	return regexTwitch.test(url);
}
