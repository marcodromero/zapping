import { useEffect, useRef } from 'react';
import ChannelCard from './components/ChannelCard';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useChannelStore } from '../../../store/channelStore';
import { useAlertStore } from '../../../store/alertStore';

export default function ChannelGuide() {
  const channels = useChannelStore((state) => state.channels);
  const fetchChannels = useChannelStore((state) => state.fetchChannels);
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: channels?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 55,
    overscan: 5,
  });

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  return (
    <section
      ref={parentRef}
      className='relative overflow-auto bg-[#3c4248] w-full h-6/10'
    >
      {!channels && (
        <div className='absolute inset-0 flex items-center justify-center text-white animate-pulse'>
          Cargando canales...
        </div>
      )}

      {channels && channels.length === 0 && (
        <div className='p-4 text-white'>No se encontraron canales.</div>
      )}

      {channels && channels.length > 0 && (
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem, index) => {
            const channel = channels[virtualItem.index];
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
                <ChannelCard
                  name={channel.name}
                  url={channel.url}
                  player={channel.player}
                  tvgLogo={channel.tvgLogo}
                  key={index}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
