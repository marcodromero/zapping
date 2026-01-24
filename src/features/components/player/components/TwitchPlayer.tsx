type TwitchPlayerProps = {
  url: string;
};

export default function TwitchPlayer({ url }: TwitchPlayerProps) {
  return <iframe src={url} allowFullScreen className='h-full w-full'></iframe>;
}
