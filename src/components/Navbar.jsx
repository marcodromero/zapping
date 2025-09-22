export default function Navbar({ openModal }) {
	return (
		<nav className="w-full flex flex-col h-full">
			<div className="flex justify-around items-center p-4 bg-[#1d1e22] text-sm border-b-1 border-b-[#121414] border-t border-t-[#222626] h-[100%] ">
				<button
					className="bg-[#4d4c0d] text-[#acaead] border-2 border-[#565958] rounded-lg p-1 flex items-center h-8 font-bold text-[11px]"
					id="loadListButton"
					onClick={openModal}
				>
					CARGAR LISTA DE CANALES
				</button>
			</div>
		</nav>
	);
}
