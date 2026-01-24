import { useEffect, useRef } from 'react';
import Alert from './components/Alert';
import updateM3UURL from './utils/updateM3UURL';
import { useModalStore } from '../../../store/modalStore';

export default function Modal() {
  const isOpen = useModalStore((state) => state.isModalOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      id='modal'
      className='bg-[#252a2b] h-screen w-screen max-w-none max-h-none'
      ref={dialogRef}
    >
      <div className='flex flex-col w-full h-full items-center justify-center'>
        <p className='text-white'>Pegá el enlace en la siguiente casilla:</p>
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
              inputRef.current && updateM3UURL(inputRef.current.value);
            }}
          >
            Aceptar
          </button>
          <button
            id='cancelLoadButton'
            className='m-2 p-1 bg-[#444646] text-[#acaead] border-2 border-[#565958] rounded-lg'
            onClick={closeModal}
          >
            Cerrar
          </button>
        </div>
        <Alert id={'successNotification'} color={'#40f401'} message='¡Listo!' />
        <Alert
          id={'errorNotification'}
          color={'#ff0000'}
          message='¡Hubo un problema! Revisá que el enlace que pegaste sea correcto.'
        />
      </div>
    </dialog>
  );
}
