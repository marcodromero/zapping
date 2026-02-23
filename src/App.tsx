import Player from './features/components/player';
import ChannelGuide from './features/components/channelGuide';
import Toolbar from './features/components/toolbar';
import Modal from './features/components/playlistManager';
import useInitialization from './hooks/useInitialization';
import Loading from './components/Loading';
import AppLayout from './components/AppLayout';
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
    <AppLayout>
      <Player />
      <Toolbar>
        <Search />
        <ToolbarButton text='PLAYLISTS' onClick={openPlaylistManager} />
      </Toolbar>
      <ChannelGuide />
      <Modal />
    </AppLayout>
  );
}

export default App;
