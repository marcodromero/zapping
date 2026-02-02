import { useEffect, useMemo, useRef } from 'react';
import ChannelCard from './components/ChannelCard';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useChannelStore } from '../../../store/channelStore';

export default function ChannelGuide() {
  const channels = useChannelStore((state) => state.channels);
  const searchTerm = useChannelStore((state) => state.searchTerm);

  const parentRef = useRef<HTMLDivElement>(null);

  const filteredChannels = useMemo(() => {
    if (!channels) return [];
    if (!searchTerm) return channels;

    const lowSearch = searchTerm.toLowerCase();
    return channels.filter((channel) =>
      channel.name.toLowerCase().includes(lowSearch),
    );
  }, [channels, searchTerm]);

  const rowVirtualizer = useVirtualizer({
    count: filteredChannels?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 55,
    overscan: 5,
  });

  useEffect(() => {
    rowVirtualizer.scrollToOffset(0);
  }, [searchTerm, rowVirtualizer]);

  return (
    <section
      ref={parentRef}
      className='relative overflow-auto bg-[#3c4248] w-full h-6/10'
    >
      {!filteredChannels && (
        <div className='absolute inset-0 flex items-center justify-center text-white animate-pulse'>
          Cargando canales...
        </div>
      )}

      {filteredChannels && filteredChannels.length === 0 && (
        <div className='p-4 text-white'>No se encontraron canales.</div>
      )}

      {filteredChannels && filteredChannels.length > 0 && (
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const channel = filteredChannels[virtualItem.index];
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
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
