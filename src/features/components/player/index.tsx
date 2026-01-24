import { useChannelStore } from '../../../store/channelStore';
import { isYoutubeURL, isTwitchURL } from './../../../utils/validators';
import HlsPlayer from './components/HlsPlayer';
import YoutubePlayer from './components/YoutubePlayer';
import TwitchPlayer from './components/TwitchPlayer';
import getYoutubeChannelId from './../../../utils/getYoutubeID';
import getTwitchChannelName from './../../..//utils/getTwitchChannelName';

export default function Player() {
  const currentChannelUrl = useChannelStore((state) => state.currentChannelUrl);
  if (isYoutubeURL(currentChannelUrl)) {
    return <YoutubePlayer channel={getYoutubeChannelId(currentChannelUrl)} />;
  } else if (isTwitchURL(currentChannelUrl)) {
    return <TwitchPlayer channel={getTwitchChannelName(currentChannelUrl)} />;
  } else {
    return <HlsPlayer url={currentChannelUrl} />;
  }
}
