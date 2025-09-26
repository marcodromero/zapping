export default function getYoutubeChannelId(url) {
	const channelIdMatch = url.match(
		/(?:youtube\.com)\/(?:channel|c)\/([\w-]{24})/
	);

	const youtubeChannelId = channelIdMatch ? channelIdMatch[1] : null;

	if (!youtubeChannelId) {
		return null;
	}

	return youtubeChannelId;
}
