import { useRef } from 'react';

import { useChannelStore } from '../../../store/channelStore';
import ChannelList from './components/ChannelList';
import Loading from '../../../components/Loading';
import useChannels from './hooks/useChannels';

export default function ChannelGuide() {
  const parentRef = useRef<HTMLDivElement>(null);
  const activeChannel = useChannelStore((state) => state.activeChannel);
  const { filteredChannels, virtualizer } = useChannels(parentRef);

  return (
    <div
      ref={parentRef}
      className='relative overflow-auto bg-[#3c4248] w-full h-6/10'
    >
      {!filteredChannels && <Loading />}

      {filteredChannels && filteredChannels.length > 0 && (
        <ChannelList
          activeChannel={activeChannel}
          virtualizer={virtualizer}
          channels={filteredChannels}
        />
      )}
    </div>
  );
}
