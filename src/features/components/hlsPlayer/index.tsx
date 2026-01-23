import Hls from 'hls.js';
import { useRef, useEffect } from 'react';

type HlsPlayerProps = {
  url: string | null;
};

export default function HlsPlayer({ url }: HlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!Hls.isSupported() || !videoElement || !url) return;

    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(videoElement);

    return () => {
      hls.destroy();
      videoElement.pause();
      videoElement.removeAttribute('src');
      videoElement.load();
      videoElement.src = '';
    };
  }, [url]);

  return (
    <video
      ref={videoRef}
      controls
      className='h-full'
      onLoadedData={() => {
        if (!videoRef.current) return;
        if (videoRef.current.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          videoRef.current.play();
        }
      }}
    ></video>
  );
}
