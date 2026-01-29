import Player from './features/components/player';
import ChannelGuide from './features/components/channelGuide';
import Toolbar from './features/components/toolbar';
import Modal from './features/components/modal';
import imageStatic from './assets/images/bg-tv.jpg';
import useInitialization from './hooks/useInitialization';

function App() {
  const isReady = useInitialization();

  if (!isReady) {
    return (
      <div className='h-screen w-screen flex flex-col items-center justify-center bg-[#1c2534] text-white'>
        <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500'></div>
        <p className='mt-4 text-gray-400'>Preparando tus canales...</p>
      </div>
    );
  }

  return (
    <div className='bg-black flex items-center flex-col h-dvh'>
      <div
        className='flex justify-center w-full h-3/10 bg-no-repeat bg-center '
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
