export default function YoutubePlayer({ url }) {
	const channelIdMatch = url.match(
		/(?:youtube\.com)\/(?:channel|c)\/([\w-]{24})/
	);

	const youtubeChannelId = channelIdMatch ? channelIdMatch[1] : null;

	if (!youtubeChannelId) {
		return null;
	}

	return (
		<iframe
			src={`https://www.youtube.com/embed/live_stream?channel=${youtubeChannelId}&autoplay=1`}
			title="YouTube Live Stream"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerPolicy="strict-origin-when-cross-origin"
			allowFullScreen
			className="h-full w-full"
			id="youtubePlayer"
		></iframe>
	);
}
