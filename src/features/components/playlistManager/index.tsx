import { useEffect, useRef } from 'react';
import Alert from './components/Alert';
import { usePlaylistManagerStore } from '../../../store/playlistManagerStore';
import Playlists from './components/Playlists';
import PlaylistForm from './components/PlaylistForm';

export default function PlaylistManager() {
  const isActive = usePlaylistManagerStore((state) => state.isActive);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const alertStyle = usePlaylistManagerStore((state) => state.alertStyle);
  const message = usePlaylistManagerStore((state) => state.message);
  const closePlaylistManager = usePlaylistManagerStore(
    (state) => state.closePlaylistManager,
  );

  useEffect(() => {
    if (isActive && dialogRef.current) {
      dialogRef.current.showModal();
    }
    if (!isActive && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isActive]);

  return (
    <dialog
      id='PlaylistManager'
      className='bg-[#252a2b] h-screen w-screen max-w-none max-h-none'
      ref={dialogRef}
    >
      <section>
        <button
          id='cancelLoadButton'
          className='m-2 p-1 bg-[#444646] text-[#acaead] border-2 border-[#565958] rounded-lg'
          onClick={closePlaylistManager}
        >
          Volver
        </button>
      </section>
      <PlaylistForm />
      {alertStyle && (
        <Alert alertStyle={alertStyle} color={'#ff0000'} message={message} />
      )}
      <Playlists />
    </dialog>
  );
}
