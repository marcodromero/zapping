import { useRef } from 'react';

import { useChannelStore } from '../../../store/channelStore';
import ChannelList from './components/ChannelList';
import Loading from '../../../components/Loading';
import useChannels from './hooks/useChannels';

export default function ChannelGuide() {
  const parentRef = useRef<HTMLDivElement>(null);
  const activeChannel = useChannelStore((state) => state.activeChannel);
  const { filteredChannels, virtualizer } = useChannels(parentRef);

  if (!filteredChannels) return <Loading />;

  if (filteredChannels && filteredChannels.length > 0)
    return (
      <ChannelList
        activeChannel={activeChannel}
        virtualizer={virtualizer}
        channels={filteredChannels}
        parentRef={parentRef}
      />
    );
}
