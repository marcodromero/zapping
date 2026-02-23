import type { ChannelType } from '../../../../types/channelTypes';
import type { ReactNode } from 'react';
import usePlayer from '../hooks/usePlayer';

const colors = {
  selected: 'bg-[#3a6280] ',
  unselected: 'bg-[#1c2534] hover:bg-[#2a374a]',
};

type ChannelCardProps = {
  channel: ChannelType;
  isActive: boolean;
  children?: ReactNode;
};

export default function ChannelCard({
  channel,
  isActive,
  children,
}: ChannelCardProps) {
  const { handleClickChannel } = usePlayer();

  return (
    <div
      className={`w-full  p-2 flex channel__button channel__play items-center h-full border-t-1 border-t-[#29374d]  border-b-2 border-b-[#0e121a] channel ${isActive ? colors.selected : colors.unselected}`}
      onClick={() =>
        !isActive && handleClickChannel(channel.url, channel.player)
      }
    >
      {children}
    </div>
  );
}
