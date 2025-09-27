import { useRef, useEffect } from 'react';

export default function HlsPlayer({ url }) {
	const videoRef = useRef(null);

	useEffect(() => {
		const videoElement = videoRef.current;

		if (window.Hls && videoElement) {
			const hls = new window.Hls();

			hls.loadSource(url);
			hls.attachMedia(videoElement);

			return () => {
				hls.destroy();
				videoElement.pause();
				videoElement.removeAttribute('src');
				videoElement.load();
				videoElement.src = '';
			};
		}

		return;
	}, [url]);

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
