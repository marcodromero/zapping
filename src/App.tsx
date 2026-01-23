import { useState } from 'react';
import ChannelGuide from './features/components/channelGuide';
import Modal from './features/components/modal';
import YoutubePlayer from './features/components/youtubePlayer';
import { isYoutubeURL, isTwitchURL } from './utils/validators';
import Toolbar from './features/components/toolbar';
import HlsPlayer from './features/components/hlsPlayer';
import imageStatic from './assets/images/bg-tv.jpg';
import TwitchPlayer from './features/components/twitchPlayer';
import getYoutubeChannelId from './utils/getYoutubeID';
import getTwitchChannelName from './utils/getTwitchChannelName';

function App() {
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [showYoutubePlayer, setShowYoutubePlayer] = useState<boolean>(false);
  const [showHLSPlayer, setShowHLSPlayer] = useState<boolean>(false);
  const [showTwitchPlayer, setShowTwitchPlayer] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePlayerSelect = (url: string) => {
    setCurrentVideoUrl(url);
    if (isYoutubeURL(url)) {
      setShowHLSPlayer(false);
      setShowTwitchPlayer(false);
      setShowYoutubePlayer(true);
    } else if (isTwitchURL(url)) {
      setShowYoutubePlayer(false);
      setShowHLSPlayer(false);
      setShowTwitchPlayer(true);
    } else {
      setShowYoutubePlayer(false);
      setShowTwitchPlayer(false);
      setShowHLSPlayer(true);
    }
  };

  return (
    <div className='bg-black flex items-center flex-col h-dvh'>
      <div
        className='flex justify-center w-full min-h-3/10 max-h-3/10 bg-no-repeat bg-center '
        style={{
          backgroundImage: `url(${imageStatic})`,
          backgroundSize: 'contain',
        }}
      >
        {showYoutubePlayer && currentVideoUrl && (
          <YoutubePlayer channel={getYoutubeChannelId(currentVideoUrl)} />
        )}
        {showHLSPlayer && currentVideoUrl && (
          <HlsPlayer url={currentVideoUrl} />
        )}
        {showTwitchPlayer && currentVideoUrl && (
          <TwitchPlayer channel={getTwitchChannelName(currentVideoUrl)} />
        )}
      </div>
      <Toolbar openModal={openModal} />
      <ChannelGuide handlePlayerSelect={handlePlayerSelect} />

      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default App;
