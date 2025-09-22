export default function Channel({ channelData, handlePlayerSelect }) {
	function handleClick() {
		handlePlayerSelect(channelData.url);
	}
	return (
		<div className="flex w-full h-1/7 border-t-1 border-t-[#29374d]  border-b-2 border-b-[#0e121a] bg-[#1c2534] hover:bg-[#3a6280] channel">
			<button
				className="w-full h-full p-2 flex channel__button channel__play items-center"
				onClick={handleClick}
			>
				<img
					className="lazy w-15 h-full object-contain"
					src={channelData.tvgLogo}
				/>
				<p className="text-[#c0c6c9] ml-4 text-xs truncate">
					{channelData.name}
				</p>
			</button>
		</div>
	);
}
