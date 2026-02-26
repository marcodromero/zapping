import type { Virtualizer } from '@tanstack/react-virtual';
import ChannelCard from './ChannelCard';
import ChannelLogo from './ChannelLogo';
import ChannelTitle from './ChannelTitle';
import type { ChannelType } from '../../../../types/channelTypes';

type ChannelListType = {
  activeChannel: string;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  channels: ChannelType[];
  parentRef: React.RefObject<HTMLDivElement | null>;
};

export default function ChannelList({
  activeChannel,
  virtualizer,
  channels = [],
  parentRef,
}: ChannelListType) {
  if (channels.length === 0)
    return <div className='p-4 text-white'>No se encontraron canales.</div>;

  return (
    <div ref={parentRef} className='relative '>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const channel = channels[virtualItem.index];
          const isActive = activeChannel === channel.url;
          return (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <ChannelCard channel={channel} isActive={isActive}>
                <ChannelLogo tvgLogo={channel.tvgLogo} />
                <ChannelTitle name={channel.name} />
              </ChannelCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
