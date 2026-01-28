import { useChannelStore } from '../../../store/channelStore';
import HlsPlayer from './components/HlsPlayer';
import YoutubePlayer from './components/YoutubePlayer';
import TwitchPlayer from './components/TwitchPlayer';

export default function Player() {
  const activeChannel = useChannelStore((state) => state.activeChannel);
  const activePlayer = useChannelStore((state) => state.activePlayer);
  if (activePlayer === 'youtube') {
    return <YoutubePlayer activeChannel={activeChannel} />;
  } else if (activePlayer === 'twitch') {
    return <TwitchPlayer activeChannel={activeChannel} />;
  } else {
    return <HlsPlayer activeChannel={activeChannel} />;
  }
}
