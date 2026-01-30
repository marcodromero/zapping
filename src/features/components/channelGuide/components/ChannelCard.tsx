import vibrateDevice from '../utils/vibrateDevice';
import { useChannelStore } from '../../../../store/channelStore';

type ChannelCardProps = {
  url: string;
  tvgLogo: string;
  name: string;
  player: 'twitch' | 'youtube' | 'hls';
};

export default function ChannelCard({
  url,
  player,
  tvgLogo,
  name,
}: ChannelCardProps) {
  console.log('Renderizando canal:', name);
  const isActive = useChannelStore((state) => state.activeChannel === url);
  const setActivePlayer = useChannelStore((state) => state.setActivePlayer);
  const setActiveChannel = useChannelStore((state) => state.setActiveChannel);

  return (
    <button
      className={`w-full  p-2 flex channel__button channel__play items-center h-full border-t-1 border-t-[#29374d]  border-b-2 border-b-[#0e121a] channel 
        ${isActive ? 'bg-[#3a6280] ' : 'bg-[#1c2534] hover:bg-[#2a374a]'}
        `}
      onClick={() => {
        if (isActive) return;
        vibrateDevice();
        setActiveChannel(url);
        setActivePlayer(player);
      }}
    >
      <img
        className='w-15 h-full object-contain'
        src={tvgLogo}
        loading='lazy'
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            'https://placehold.co/60x40?text=TV';
        }}
      />
      <p className='text-[#c0c6c9] ml-4 text-xs truncate'>{name}</p>
    </button>
  );
}
