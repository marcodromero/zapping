import { useEffect, useRef } from 'react';
import Alert from './components/Alert';
import { useModalStore } from '../../../store/modalStore';
import { useAlertStore } from '../../../store/alertStore';
import savePlaylist from './utils/savePlaylist';

export default function Modal() {
  const isActive = useModalStore((state) => state.isActive);
  const closeModal = useModalStore((state) => state.closeModal);
  const alertType = useAlertStore((state) => state.type);
  const alertMessage = useAlertStore((state) => state.message);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    isActive ? dialogRef.current?.showModal() : dialogRef.current?.close();
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }, [isActive]);

  return (
    <dialog
      id='modal'
      className='bg-[#252a2b] h-screen w-screen max-w-none max-h-none'
      ref={dialogRef}
    >
      <div className='flex flex-col w-full h-full items-center justify-center'>
        <p className='text-white'>
          Introduce el enlace de tu playlist en la siguiente casilla:
        </p>
        <input
          ref={inputRef}
          type='text'
          id='inputURL'
          className='bg-white m-2'
        />
        <div className='flex'>
          <button
            id='confirmLoadButton'
            className='m-2 p-1 bg-[#444646] text-[#acaead] border-2 border-[#565958] rounded-lg'
            onClick={() => {
              inputRef.current && savePlaylist(inputRef.current.value);
            }}
          >
            Mostrar canales
          </button>
          <button
            id='cancelLoadButton'
            className='m-2 p-1 bg-[#444646] text-[#acaead] border-2 border-[#565958] rounded-lg'
            onClick={closeModal}
          >
            Cancelar
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
    </dialog>
  );
}
