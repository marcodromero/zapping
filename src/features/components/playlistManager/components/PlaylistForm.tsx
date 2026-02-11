import { useEffect } from 'react';
import { usePlaylistManagerStore } from '../../../../store/playlistManagerStore';
import { useForm } from 'react-hook-form';

type PlaylistFormType = {
  isVisible: boolean;
};

type formInputsType = {
  inputUrl: string;
  inputPlaylistName: string;
};

export default function PlaylistForm({ isVisible }: PlaylistFormType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formInputsType>();
  const savePlaylist = usePlaylistManagerStore((state) => state.savePlaylist);
  const validateUrl = usePlaylistManagerStore((state) => state.validateUrl);

  const onSubmit = handleSubmit(async (data) => {
    const isValidUrl = await validateUrl(data.inputUrl);
    if (!isValidUrl) return;
    savePlaylist({ url: data.inputUrl, name: data.inputPlaylistName });
    reset();
  });

  useEffect(() => {
    if (isVisible) reset();
  }, [isVisible, reset]);

  return (
    <form
      className='flex flex-col w-full h-auto items-center justify-center'
      onSubmit={onSubmit}
    >
      <label className='text-white'>
        Enlace de la Playlist:
        <input
          type='text'
          className='bg-white m-2'
          {...register('inputUrl', {
            required: { value: true, message: 'Este campo es requerido' },
          })}
        />
      </label>
      {errors.inputUrl && <span>{errors.inputUrl.message}</span>}
      <label className='text-white'>
        Nombre para la Playlist:
        <input
          type='text'
          className='bg-white m-2'
          {...register('inputPlaylistName', { required: true })}
        />
      </label>
      {errors.inputPlaylistName && (
        <span>{errors.inputPlaylistName.message}</span>
      )}

      <div className='flex'>
        <button
          id='confirmLoadButton'
          className='m-2 p-1 bg-[#444646] text-[#acaead] border-2 border-[#565958] rounded-lg'
          type='submit'
        >
          Agregar
        </button>
      </div>
    </form>
  );
}
