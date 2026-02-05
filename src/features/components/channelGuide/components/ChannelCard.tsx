import vibrateDevice from '../utils/vibrateDevice';
import { useChannelStore } from '../../../../store/channelStore';
import type { ChannelType } from '../../../../types/channelTypes';
import ChannelBrand from './ChannelBrand';

const COLORS = {
  selected: 'bg-[#3a6280] ',
  unselected: 'bg-[#1c2534] hover:bg-[#2a374a]',
};

type ChannelCardProps = {
  channel: ChannelType;
  isActive: boolean;
};

export default function ChannelCard({ channel, isActive }: ChannelCardProps) {
  const setActivePlayer = useChannelStore((state) => state.setActivePlayer);
  const setActiveChannel = useChannelStore((state) => state.setActiveChannel);

  const handleClickChannel = () => {
    if (isActive) return;
    vibrateDevice();
    setActiveChannel(channel.url);
    setActivePlayer(channel.player);
  };

  return (
    <button
      className={`w-full  p-2 flex channel__button channel__play items-center h-full border-t-1 border-t-[#29374d]  border-b-2 border-b-[#0e121a] channel ${isActive ? COLORS.selected : COLORS.unselected}`}
      onClick={handleClickChannel}
    >
      <ChannelBrand tvgLogo={channel.tvgLogo} name={channel.name} />
    </button>
  );
}
