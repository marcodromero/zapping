import { useChannelStore } from '../../../store/channelStore';
import HlsPlayer from './components/HlsPlayer';
import YoutubePlayer from './components/YoutubePlayer';
import TwitchPlayer from './components/TwitchPlayer';

type PLAYER_COMPONENTS_TYPE = Record<
  string,
  React.ComponentType<{ activeChannel: string }>
>;

//Diccionario de componentes
const PLAYER_COMPONENTS: PLAYER_COMPONENTS_TYPE = {
  youtube: YoutubePlayer,
  twitch: TwitchPlayer,
  hls: HlsPlayer,
};

export default function Player() {
  const activeChannel = useChannelStore((state) => state.activeChannel);
  const activePlayer = useChannelStore((state) => state.activePlayer);

  const SelectedPlayer = PLAYER_COMPONENTS[activePlayer] || HlsPlayer;

  return <SelectedPlayer activeChannel={activeChannel} />;
}
