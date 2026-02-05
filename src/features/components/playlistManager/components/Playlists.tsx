import { usePlaylistManagerStore } from '../../../../store/playlistManagerStore';
import PlaylistRow from './PlaylistRow';

export default function Playlists() {
  const playlists = usePlaylistManagerStore((state) => state.playlists);
  const deletePlaylist = usePlaylistManagerStore(
    (state) => state.deletePlaylist,
  );

  return (
    <section className='flex flex-col  overflow-auto '>
      {playlists.map((playlist, index) => (
        <PlaylistRow
          name={playlist.name}
          deletePlaylist={deletePlaylist}
          key={index}
        />
      ))}
    </section>
  );
}
