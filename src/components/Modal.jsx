import { useEffect, useRef } from 'react';
import Alert from './Alert';
import Navbar from './Navbar';
import updateM3UURL from '../utils/updateM3UUrl';

export default function Modal({ isOpen, closeModal }) {
	const dialogRef = useRef(null);

	useEffect(() => {
		if (isOpen) {
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [isOpen]);

	return (
		<dialog
			id="modal"
			className="bg-[#252a2b] h-screen w-screen max-w-none max-h-none"
			ref={dialogRef}
		>
			<div className="flex flex-col w-full h-full items-center justify-center">
				<p className="text-white">Pegá el enlace en la siguiente casilla:</p>
				<input type="text" id="inputURL" className="bg-white m-2" />
				<div className="flex">
					<button
						id="confirmLoadButton"
						className="m-2 p-1 bg-[#444646] text-[#acaead] border-2 border-[#565958] rounded-lg"
						onClick={updateM3UURL}
					>
						Aceptar
					</button>
					<button
						id="cancelLoadButton"
						className="m-2 p-1 bg-[#444646] text-[#acaead] border-2 border-[#565958] rounded-lg"
						onClick={closeModal}
					>
						Cerrar
					</button>
				</div>
				<Alert id={'successNotification'} color={'#40f401'} message="¡Listo!" />
				<Alert
					id={'errorNotification'}
					color={'#ff0000'}
					message="¡Hubo un problema! Revisá que el enlace que pegaste sea correcto."
				/>
			</div>
		</dialog>
	);
}
