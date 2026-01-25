import vibrateDevice from '../utils/vibrateDevice';
import { useChannelStore } from '../../../../store/channelStore';

type ChannelCardProps = {
  url: string;
  tvgLogo: string;
  name: string;
  player: 'twitch' | 'youtube' | 'hls' | undefined;
};

export default function ChannelCard({
  url,
  player,
  tvgLogo,
  name,
}: ChannelCardProps) {
  const setCurrentChannelUrl = useChannelStore(
    (state) => state.setCurrentChannelUrl,
  );
  const setPlayer = useChannelStore((state) => state.setPlayer);

  return (
    <button
      className='w-full  p-2 flex channel__button channel__play items-center h-full border-t-1 border-t-[#29374d]  border-b-2 border-b-[#0e121a] bg-[#1c2534] hover:bg-[#3a6280] channel'
      onClick={() => {
        vibrateDevice();
        setCurrentChannelUrl(url);
        setPlayer(player);
      }}
    >
      <img className='lazy w-15 h-full object-contain' src={tvgLogo} />
      <p className='text-[#c0c6c9] ml-4 text-xs truncate'>{name}</p>
    </button>
  );
}
