import Player from './features/components/player';
import ChannelGuide from './features/components/channelGuide';
import Toolbar from './features/components/toolbar';
import Modal from './features/components/modal';
import imageStatic from './assets/images/bg-tv.jpg';

function App() {
  return (
    <div className='bg-black flex items-center flex-col h-dvh'>
      <div
        className='flex justify-center w-full min-h-3/10 max-h-3/10 bg-no-repeat bg-center '
        style={{
          backgroundImage: `url(${imageStatic})`,
          backgroundSize: 'contain',
        }}
      >
        <Player />
      </div>
      <Toolbar />
      <ChannelGuide />
      <Modal />
    </div>
  );
}

export default App;
