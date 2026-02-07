import Hls from 'hls.js';
import { useRef, useEffect } from 'react';

type HlsPlayerProps = {
  activeChannel: string | null;
};

export default function HlsPlayer({ activeChannel }: HlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleLoadData = () => {
    if (!videoRef.current) return;
    if (videoRef.current.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      videoRef.current.play();
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!Hls.isSupported() || !videoElement || !activeChannel) return;

    const hls = new Hls();
    hls.loadSource(activeChannel);
    hls.attachMedia(videoElement);

    return () => {
      hls.destroy();
      videoElement.pause();
      videoElement.removeAttribute('src');
      videoElement.load();
      videoElement.src = '';
    };
  }, [activeChannel]);

  return (
    <video
      ref={videoRef}
      controls
      className='h-full'
      onLoadedData={handleLoadData}
    ></video>
  );
}
