import { useRef } from 'react';

export default function HlsPlayer({ url }) {
	const videoRef = useRef(null);
	const hls = new window.Hls();
	hls.loadSource(url);
	hls.attachMedia(videoRef.current);
	return (
		<video
			ref={videoRef}
			controls
			className="h-full"
			onLoadedData={() => {
				if (videoRef.current.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
					videoRef.current.play();
				}
			}}
		></video>
	);
}
