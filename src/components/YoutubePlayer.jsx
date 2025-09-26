export default function YoutubePlayer({ channel }) {
	return (
		<iframe
			src={`https://www.youtube.com/embed/live_stream?channel=${channel}&autoplay=1`}
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
