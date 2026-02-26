import Player from './features/components/player';
import ChannelGuide from './features/components/channelGuide';
import Toolbar from './features/components/toolbar';
import Modal from './features/components/playlistManager';
import useInitialization from './hooks/useInitialization';
import Loading from './components/Loading';
import imageStatic from './assets/images/bg-tv.jpg';
import Search from './features/components/toolbar/components/Search';
import ToolbarButton from './features/components/toolbar/components/ToolbarButton';
import { usePlaylistManagerStore } from './store/playlistManagerStore';

function App() {
  const isReady = useInitialization();
  const openPlaylistManager = usePlaylistManagerStore(
    (state) => state.openPlaylistManager,
  );

  if (!isReady) <Loading />;

  return (
    <div className='bg-black flex items-center flex-col h-dvh'>
      <section
        className='flex justify-center w-full h-3/10 bg-no-repeat bg-center '
        style={{
          backgroundImage: `url(${imageStatic})`,
          backgroundSize: 'contain',
        }}
      >
        <Player />
      </section>
      <section className='w-full flex-1 flex-col min-h-1/10'>
        <Toolbar>
          <Search />
          <ToolbarButton text='PLAYLISTS' onClick={openPlaylistManager} />
        </Toolbar>
      </section>
      <section className=' bg-[#3c4248] w-full h-6/10 overflow-auto'>
        <ChannelGuide />
      </section>
      <Modal />
    </div>
  );
}

export default App;
