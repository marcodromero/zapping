import { useChannelStore } from '../../../store/channelStore';
import HlsPlayer from './components/HlsPlayer';
import YoutubePlayer from './components/YoutubePlayer';
import TwitchPlayer from './components/TwitchPlayer';

export default function Player() {
  const currentChannelUrl = useChannelStore((state) => state.currentChannelUrl);
  const playerType = useChannelStore((state) => state.playerType);
  if (playerType === 'youtube') {
    return <YoutubePlayer url={currentChannelUrl} />;
  } else if (playerType === 'twitch') {
    return <TwitchPlayer url={currentChannelUrl} />;
  } else {
    return <HlsPlayer url={currentChannelUrl} />;
  }
}
