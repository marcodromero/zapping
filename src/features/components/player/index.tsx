import { useChannelStore } from '../../../store/channelStore';
import HlsPlayer from './components/HlsPlayer';
import YoutubePlayer from './components/YoutubePlayer';
import TwitchPlayer from './components/TwitchPlayer';
import PlayerLayout from './components/PlayerLayout';

type playersComponentsType = Record<
  string,
  React.ComponentType<{ activeChannel: string }>
>;

const playersComponents: playersComponentsType = {
  youtube: YoutubePlayer,
  twitch: TwitchPlayer,
  hls: HlsPlayer,
};

export default function Player() {
  const activeChannel = useChannelStore((state) => state.activeChannel);
  const activePlayer = useChannelStore((state) => state.activePlayer);
  const SelectedPlayer = playersComponents[activePlayer] || HlsPlayer;

  return (
    <PlayerLayout>
      <SelectedPlayer activeChannel={activeChannel} />
    </PlayerLayout>
  );
}
