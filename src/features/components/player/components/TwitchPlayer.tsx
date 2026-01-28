type TwitchPlayerProps = {
  activeChannel: string;
};

export default function TwitchPlayer({ activeChannel }: TwitchPlayerProps) {
  return (
    <iframe
      src={activeChannel}
      allowFullScreen
      className='h-full w-full'
    ></iframe>
  );
}
