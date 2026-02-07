import Player from './features/components/player';
import ChannelGuide from './features/components/channelGuide';
import Toolbar from './features/components/toolbar';
import Modal from './features/components/playlistManager';
import useInitialization from './hooks/useInitialization';
import Loading from './components/Loading';
import AppLayout from './components/AppLayout';

function App() {
  const isReady = useInitialization();

  if (!isReady) <Loading />;

  return (
    <AppLayout>
      <Player />
      <Toolbar />
      <ChannelGuide />
      <Modal />
    </AppLayout>
  );
}

export default App;
