type YoutubePlayerProps = {
  activeChannel: string | undefined;
};

export default function YoutubePlayer({
  activeChannel = undefined,
}: YoutubePlayerProps) {
  return (
    <iframe
      src={activeChannel}
      title='YouTube Live Stream'
      frameBorder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      referrerPolicy='strict-origin-when-cross-origin'
      allowFullScreen
      className='h-full w-full'
      id='youtubePlayer'
    ></iframe>
  );
}
