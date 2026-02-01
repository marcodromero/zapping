import { useState } from 'react';

export default function PlaylistRow({
  name,
  deletePlaylist,
}: {
  name: string;
  deletePlaylist: (name: string) => void;
}) {
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <div className='flex justify-between items-center p-2 border-b border-gray-700 min-h-[50px]'>
      {!isConfirming ? (
        <>
          <p className='text-white truncate flex-1'>{name}</p>
          <button
            onClick={() => setIsConfirming(true)}
            className='ml-4 px-2 py-1 bg-red-900/30 text-red-400 border border-red-800 rounded hover:bg-red-800 hover:text-white transition-all text-xs'
          >
            Eliminar
          </button>
        </>
      ) : (
        <div className='flex items-center justify-between w-full bg-red-950/20 p-1 rounded animate-pulse'>
          <p className='text-red-200 text-xs font-medium'>
            ¿Confirmas borrar esta Playlist?
          </p>
          <div className='flex gap-2'>
            <button
              onClick={() => {
                deletePlaylist(name);
                setIsConfirming(false);
              }}
              className='px-2 py-1 bg-red-600 text-white text-xs rounded font-bold'
            >
              SÍ, BORRAR
            </button>
            <button
              onClick={() => setIsConfirming(false)}
              className='px-2 py-1 bg-gray-600 text-white text-xs rounded'
            >
              NO
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
