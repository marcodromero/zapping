import vibrateDevice from '../utils/vibrateDevice';
import { useChannelStore } from '../../../../store/channelStore';

type ChannelCardProps = {
  url: string;
  tvgLogo: string;
  channelName: string;
  playerType: 'twitch' | 'youtube' | 'hls' | '';
};

type ChannelStore = {
  currentChannelUrl: string;
  setCurrentChannelUrl: (url: string) => void;
  setPlayerType: (type: 'twitch' | 'youtube' | 'hls' | '') => void;
};

export default function ChannelCard({
  url,
  playerType,
  tvgLogo,
  channelName,
}: ChannelCardProps) {
  const setCurrentChannelUrl = useChannelStore(
    (state: ChannelStore) => state.setCurrentChannelUrl,
  );
  const setPlayerType = useChannelStore(
    (state: ChannelStore) => state.setPlayerType,
  );

  return (
    <button
      className='w-full  p-2 flex channel__button channel__play items-center h-1/7 border-t-1 border-t-[#29374d]  border-b-2 border-b-[#0e121a] bg-[#1c2534] hover:bg-[#3a6280] channel'
      onClick={() => {
        vibrateDevice();
        setCurrentChannelUrl(url);
        setPlayerType(playerType);
      }}
    >
      <img className='lazy w-15 h-full object-contain' src={tvgLogo} />
      <p className='text-[#c0c6c9] ml-4 text-xs truncate'>{channelName}</p>
    </button>
  );
}
