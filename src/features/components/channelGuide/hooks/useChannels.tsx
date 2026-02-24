import { useEffect, useMemo } from 'react';
import { useChannelStore } from '../../../../store/channelStore';
import { useVirtualizer } from '@tanstack/react-virtual';

export default function useChannels(
  containerRef: React.RefObject<HTMLDivElement | null>,
) {
  const channels = useChannelStore((state) => state.channels);
  const searchTerm = useChannelStore((state) => state.searchTerm);

  const filteredChannels = useMemo(() => {
    if (!channels) return [];
    if (!searchTerm) return channels;

    const lowSearch = searchTerm.toLowerCase();
    return channels.filter((channel) =>
      channel.name.toLowerCase().includes(lowSearch),
    );
  }, [channels, searchTerm]);

  const virtualizer = useVirtualizer({
    count: filteredChannels.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 55,
    overscan: 5,
  });

  useEffect(() => {
    virtualizer.scrollToOffset(0);
  }, [searchTerm, virtualizer]);

  return { filteredChannels, virtualizer };
}
