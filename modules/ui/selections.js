const selectChannel = (channelSection, select = true) => {
	if (!channelSection) {
		console.warn('No se encontró el contenedor de la sección del canal');
		return;
	}

	const COLORS = {
		SELECTED: 'bg-[#1c2534]',
		UNSELECTED: 'bg-[#3a6280]',
	};

	if (select) {
		channelSection.classList.remove(COLORS.UNSELECTED);
		channelSection.classList.add(COLORS.SELECTED);
	} else {
		channelSection.classList.remove(COLORS.SELECTED);
		channelSection.classList.add(COLORS.UNSELECTED);
	}
};

const initSelections = (channelsContainer) => {
	if (!channelsContainer) {
		console.warn('No se encontró el contenedor de la lista de canales');
		return;
	}

	let currentlyPlayingChannelSection = null;

	channelsContainer.addEventListener('click', (event) => {
		const channelClicked = event.target.closest('.channel__button');
		if (channelClicked && currentlyPlayingChannelSection) {
			selectChannel(currentlyPlayingChannelSection, false);
		} else if (channelClicked) {
			currentlyPlayingChannelSection = channelClicked.parentElement;
			selectChannel(currentlyPlayingChannelSection);
		}
	});
};

export default initSelections;
