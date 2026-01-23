type TwitchPlayerProps = {
  channel: string | null;
};

export default function TwitchPlayer({ channel }: TwitchPlayerProps) {
  return (
    <iframe
      src={`https://player.twitch.tv/?channel=${channel}&parent=zapping-sooty.vercel.app&muted=false`}
      allowFullScreen
      className='h-full w-full'
    ></iframe>
  );
}
