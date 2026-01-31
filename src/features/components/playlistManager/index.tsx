import { useEffect, useRef } from 'react';
import Alert from './components/Alert';
import { useAlertStore } from '../../../store/alertStore';
import savePlaylist from './utils/savePlaylist';
import { usePlaylistManagerStore } from '../../../store/playlistManagerStore';

export default function PlaylistManager() {
  const isActive = usePlaylistManagerStore((state) => state.isActive);
  const closePlaylistManager = usePlaylistManagerStore(
    (state) => state.closePlaylistManager,
  );
  const alertType = useAlertStore((state) => state.type);
  const alertMessage = useAlertStore((state) => state.message);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const inputUrlRef = useRef<HTMLInputElement | null>(null);
  const inputPlaylistNameRef = useRef<HTMLInputElement | null>(null);

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
                  savePlaylist({
                    url: inputUrlRef.current.value,
                    playlistName: inputPlaylistNameRef.current.value,
                  });
              }}
            >
              Agregar
            </button>
          </div>
          {alertType === 'error' && (
            <Alert
              id={'errorNotification'}
              color={'#ff0000'}
              message={alertMessage}
            />
          )}
        </div>
      </section>
      <section className='flex flex-col  overflow-auto '>
        <div className='flex justify-around'>
          <p>Playlist 1</p>
          <button>Eliminar</button>
        </div>
        <div className='flex justify-around'>
          <p>Playlist 1</p>
          <button>Eliminar</button>
        </div>
        <div className='flex justify-around'>
          <p>Playlist 1</p>
          <button>Eliminar</button>
        </div>
        <div className='flex justify-around'>
          <p>Playlist 1</p>
          <button>Eliminar</button>
        </div>
      </section>
    </dialog>
  );
}
