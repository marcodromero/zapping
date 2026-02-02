import { useEffect, useRef } from 'react';
import Alert from './components/Alert';
import { usePlaylistManagerStore } from '../../../store/playlistManagerStore';
import type { playlistType } from '../../../types/channelTypes';
import PlaylistRow from './components/PlaylistRow';

export default function PlaylistManager() {
  const isActive = usePlaylistManagerStore((state) => state.isActive);
  const closePlaylistManager = usePlaylistManagerStore(
    (state) => state.closePlaylistManager,
  );
  const deletePlaylist = usePlaylistManagerStore(
    (state) => state.deletePlaylist,
  );

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const inputUrlRef = useRef<HTMLInputElement | null>(null);
  const inputPlaylistNameRef = useRef<HTMLInputElement | null>(null);
  const savePlaylist = usePlaylistManagerStore((state) => state.savePlaylist);
  const playlists = usePlaylistManagerStore((state) => state.playlists);
  const validateUrl = usePlaylistManagerStore((state) => state.validateUrl);
  const alertStyle = usePlaylistManagerStore((state) => state.alertStyle);
  const message = usePlaylistManagerStore((state) => state.message);

  async function handleClickSave({ url, name }: playlistType) {
    const isValidUrl = await validateUrl(url);
    if (!isValidUrl) return;
    savePlaylist({ url, name });
  }

  useEffect(() => {
    isActive ? dialogRef.current?.showModal() : dialogRef.current?.close();
    if (inputUrlRef.current) {
      inputUrlRef.current.value = '';
    }
    if (inputPlaylistNameRef.current) {
      inputPlaylistNameRef.current.value = '';
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
      <section>
        <div className='flex flex-col w-full h-full items-center justify-center'>
          <p className='text-white'>Enlace de la Playlist:</p>
          <input ref={inputUrlRef} type='text' className='bg-white m-2' />
          <p className='text-white'>Nombre para la Playlist:</p>
          <input
            ref={inputPlaylistNameRef}
            type='text'
            className='bg-white m-2'
          />

          <div className='flex'>
            <button
              id='confirmLoadButton'
              className='m-2 p-1 bg-[#444646] text-[#acaead] border-2 border-[#565958] rounded-lg'
              onClick={() => {
                inputUrlRef.current &&
                  inputPlaylistNameRef.current &&
                  handleClickSave({
                    url: inputUrlRef.current.value,
                    name: inputPlaylistNameRef.current.value,
                  });
              }}
            >
              Agregar
            </button>
          </div>
          {alertStyle === 'error' && (
            <Alert
              id={'errorNotification'}
              color={'#ff0000'}
              message={message}
            />
          )}
          {alertStyle === 'success' && (
            <Alert
              id={'successNotification'}
              color={'#ff0'}
              message={message}
            />
          )}
        </div>
      </section>
      <section className='flex flex-col  overflow-auto '>
        {playlists.map((playlist, index) => (
          <PlaylistRow
            name={playlist.name}
            deletePlaylist={deletePlaylist}
            key={index}
          />
        ))}
      </section>
    </dialog>
  );
}
