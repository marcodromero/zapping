import { useEffect, useRef } from 'react';
import { usePlaylistManagerStore } from '../../../../store/playlistManagerStore';
import type { playlistType } from '../../../../types/channelTypes';

export default function PlaylistForm() {
  const inputUrlRef = useRef<HTMLInputElement | null>(null);
  const inputPlaylistNameRef = useRef<HTMLInputElement | null>(null);
  const savePlaylist = usePlaylistManagerStore((state) => state.savePlaylist);
  const validateUrl = usePlaylistManagerStore((state) => state.validateUrl);

  async function handleClickSave({ url, name }: playlistType) {
    const isValidUrl = await validateUrl(url);
    if (!isValidUrl) return;
    savePlaylist({ url, name });
  }

  useEffect(() => {
    if (inputUrlRef.current) {
      inputUrlRef.current.value = '';
    }
    if (inputPlaylistNameRef.current) {
      inputPlaylistNameRef.current.value = '';
    }
  }, []);

  return (
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
              if (inputUrlRef.current && inputPlaylistNameRef.current) {
                handleClickSave({
                  url: inputUrlRef.current.value,
                  name: inputPlaylistNameRef.current.value,
                });
              }
            }}
          >
            Agregar
          </button>
        </div>
      </div>
    </section>
  );
}
