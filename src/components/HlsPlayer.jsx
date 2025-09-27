import { useRef, useEffect } from 'react';

export default function HlsPlayer({ url }) {
	const videoRef = useRef(null);

	useEffect(() => {
		if (window.Hls) {
			const hls = new window.Hls();
			hls.loadSource(url);
			hls.attachMedia(videoRef.current);

			return () => {
				hls.destroy();
			};
		}
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
