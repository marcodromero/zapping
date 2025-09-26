export default function TwitchPlayer({ channel }) {
	return (
		<iframe
			src={`https://player.twitch.tv/?channel=${channel}&parent=localhost&muted=false`}
			allowfullscreen
			className="h-full w-full"
		></iframe>
	);
}
