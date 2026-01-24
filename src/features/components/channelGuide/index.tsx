import { useEffect, useState } from 'react';
import getChannels from '../../../utils/getChannels';
import ChannelCard from './components/ChannelCard';

type ChannelType = {
  duration: number;
  tvgId: string;
  tvgLogo: string;
  group: string;
  name: string;
  url: string;
};

export default function ChannelGuide() {
  const [channels, setChannels] = useState<ChannelType[]>([]);

  async function getChannelsData() {
    const data = await getChannels();
    if (data) {
      console.log('Channels fetched:', data);
      setChannels(data);
    }
  }

  useEffect(() => {
    getChannelsData();
  }, []);

  return (
    <section
      className={
        channels.length !== 0
          ? 'flex flex-wrap content-start overflow-auto bg-[#3c4248] min-h-6/10 max-h-6/10'
          : 'flex flex-wrap content-start overflow-auto bg-[#3c4248] h-0/10'
      }
    >
      {channels.map((channel, index) => (
        <ChannelCard
          channelName={channel.name}
          url={channel.url}
          tvgLogo={channel.tvgLogo}
          key={index}
        />
      ))}
    </section>
  );
}
