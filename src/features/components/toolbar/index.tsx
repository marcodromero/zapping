import { usePlaylistManagerStore } from '../../../store/playlistManagerStore';
import Search from './components/search';
import ToolbarButton from './components/toolbarButton';

export default function Toolbar() {
  const openPlaylistManager = usePlaylistManagerStore(
    (state) => state.openPlaylistManager,
  );
  return (
    <section className='w-full flex-1 flex-col min-h-1/10'>
      <div className='flex justify-around items-center p-4 bg-[#1d1e22] text-sm border-b-1 border-b-[#121414] border-t border-t-[#222626] h-[100%] '>
        <Search />
        <ToolbarButton text='PLAYLISTS' onClick={openPlaylistManager} />
      </div>
    </section>
  );
}
