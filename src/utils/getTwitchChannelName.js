export default function getTwitchChannelName(url) {
	if (!url) throw new Error('Falta URL');

	const regexTwitchChannel =
		/(?:https?:\/\/(?:www\.)?)twitch\.tv\/([a-zA-Z0-9]\w{2,24})\/?$/i;

	const match = url.match(regexTwitchChannel);

	return match ? match[1] : null;
}
