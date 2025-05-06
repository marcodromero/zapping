async function fetchM3UFile(url) {
	const response = await fetch(url);
	return await response.text();
}

function getChannels(M3UTextContent) {
	let M3ULines = M3UTextContent.split('\n');
	let channels = [];
	let currentChannel = null;
	const regexMetadata =
		/#EXTINF:(-?\d+)\s+tvg-id="([^"]*)"\s+tvg-logo="([^"]*)"\s+group-title="([^"]*)",(.*)/;
	const regexURL = /(https?:\/\/[^\s]+)/g;

	M3ULines.forEach((line) => {
		const metadataMatch = line.match(regexMetadata);
		let urlMatch = line.match(regexURL);

		if (metadataMatch) {
			currentChannel = {
				duration: parseInt(metadataMatch[1]),
				tvgId: metadataMatch[2],
				tvgLogo: metadataMatch[3],
				group: metadataMatch[4],
				name: metadataMatch[5].trim(),
			};
		} else if (currentChannel && urlMatch) {
			channels.push({
				...currentChannel,
				url: urlMatch[0],
			});

			currentChannel = null;
		}
	});

	return channels;
}

const buildChannelContainer = () => {
	const channelContainer = document.createElement('div');
	channelContainer.classList.add('flex');
	channelContainer.classList.add('w-full');
	channelContainer.classList.add('min-h-1/7');
	channelContainer.classList.add('border-t-1');
	channelContainer.classList.add('border-t-[#29374d]');
	channelContainer.classList.add('border-b-2');
	channelContainer.classList.add('border-b-[#0e121a]');
	channelContainer.classList.add('bg-[#1c2534]');
	channelContainer.classList.add('hover:bg-[#3a6280]');
	channelContainer.classList.add('channel');
	return channelContainer;
};

const buildFavoriteButton = (channel, favoriteChannels) => {
	const favoriteButton = document.createElement('button');
	const isCurrentlyFavorite = favoriteChannels
		? favoriteChannels.some(
				(favoriteChannel) => favoriteChannel.tvgId === channel.tvgId
			)
		: null;
	if (isCurrentlyFavorite) {
		favoriteButton.innerText = '♥';
	} else {
		favoriteButton.innerText = '♡';
	}

	favoriteButton.classList.add('text-[#c0c6c9]');
	favoriteButton.dataset.info = JSON.stringify(channel);
	favoriteButton.classList.add('text-lg');
	favoriteButton.classList.add('w-1/6');
	favoriteButton.classList.add('sm:max-w-16');
	favoriteButton.classList.add('h-full');
	favoriteButton.classList.add('channel__button');
	favoriteButton.classList.add('channel__favorite');
	favoriteButton.id = 'fb_' + channel.tvgId;
	return favoriteButton;
};

const buildLoadChannelButton = (channel) => {
	const loadChannelButton = document.createElement('button');
	loadChannelButton.classList.add('w-5/6');
	loadChannelButton.classList.add('h-full');
	loadChannelButton.classList.add('p-2');
	loadChannelButton.classList.add('flex');
	loadChannelButton.classList.add('channel__button');
	loadChannelButton.classList.add('channel__play');
	loadChannelButton.classList.add('items-center');
	loadChannelButton.dataset.url = channel.url;
	return loadChannelButton;
};

const buildChannelLogo = (channel) => {
	const channelLogo = document.createElement('img');
	channelLogo.classList.add('lazy');
	channelLogo.classList.add('w-10');
	channelLogo.classList.add('h-full');
	channelLogo.src = channel.tvgLogo;
	return channelLogo;
};

const buildChannelName = (channel) => {
	const channelName = document.createElement('p');
	channelName.classList.add('text-[#c0c6c9]');
	channelName.classList.add('ml-4');
	channelName.classList.add('text-xs');
	channelName.innerText = channel.name.trim();
	return channelName;
};

const loadPlaylistM3U = (url, video) => {
	hls.loadSource(url);
	hls.attachMedia(video);
};

const loadVideoYoutube = (url, youtubePlayer) => {
	hls.loadSource('');
	hls.attachMedia(video);
	youtubePlayer.src = url + '?autoplay=1';
};

const showElement = (element) => {
	element.classList.remove('hidden');
};

const hideElement = (element) => {
	element.classList.add('hidden');
};

const clearSrcElement = (element) => {
	element.src = '';
};

const isYoutubeUrl = (url) => {
	const regexYoutube = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\b/;
	return regexYoutube.test(url);
};

const setTextButton = (button, text) => {
	button.innerText = text;
};

const setupChannelClickListener = (
	channelsContainer,
	video,
	youtubePlayer,
	currentlyPlayingChannelSection,
	unpaintChannelSection,
	paintChannelSection,
	renderFavorites
) => {
	channelsContainer.addEventListener('click', (event) => {
		const clickedButton = event.target.closest('.channel__button');
		if (clickedButton) {
			currentlyPlayingChannelSection &&
				unpaintChannelSection(currentlyPlayingChannelSection);
			currentlyPlayingChannelSection = clickedButton.parentElement;
			paintChannelSection(currentlyPlayingChannelSection);
			if (clickedButton.classList.contains('channel__play')) {
				setupLoadChannelButton(clickedButton, video, youtubePlayer);
			}
			if (clickedButton.classList.contains('channel__favorite')) {
				setupFavoriteButton(
					clickedButton,
					JSON.parse(clickedButton.dataset.info),
					renderFavorites
				);
			}
		}
	});
};

const setupLoadChannelButton = (clickedButton, video, youtubePlayer) => {
	const channelUrl = clickedButton.dataset.url;
	if (isYoutubeUrl(channelUrl)) {
		hideElement(video);
		showElement(youtubePlayer);
		loadVideoYoutube(channelUrl, youtubePlayer);
	} else {
		hideElement(youtubePlayer);
		clearSrcElement(youtubePlayer);
		showElement(video);
		loadPlaylistM3U(channelUrl, video);
	}
};

const setupFavoriteButton = (favoriteButton, channelData, renderFavorites) => {
	let favoriteChannels = JSON.parse(localStorage.getItem('favoriteChannels'));
	if (favoriteChannels) {
		const isCurrentlyFavorite = favoriteChannels.some(
			(favoriteChannel) => favoriteChannel.tvgId === channelData.tvgId
		);
		if (isCurrentlyFavorite) {
			favoriteChannels = favoriteChannels.filter(
				(favoriteChannel) => favoriteChannel.tvgId !== channelData.tvgId
			);
			localStorage.setItem(
				'favoriteChannels',
				JSON.stringify(favoriteChannels)
			);
			const allChannelsSection = favoriteButton.closest('#allChannels');
			const favoritesSection = favoriteButton.closest('#favorites');
			if (allChannelsSection) {
				favoriteButton.innerText = '♡';
				renderFavorites();
			} else if (favoritesSection) {
				favoriteButton.parentElement.remove();
				const existInAllChannels = document.getElementById(
					'fb_' + channelData.tvgId
				);
				if (existInAllChannels) {
					existInAllChannels.innerText = '♡';
				}
			}
		} else {
			favoriteChannels.push(channelData);
			favoriteButton.innerText = '♥';

			localStorage.setItem(
				'favoriteChannels',
				JSON.stringify(favoriteChannels)
			);
			renderFavorites();
		}
	} else {
		favoriteChannels = [];
		favoriteChannels.push(channelData);
		localStorage.setItem('favoriteChannels', JSON.stringify(favoriteChannels));
	}
};

const unpaintChannelSection = (channelSection) => {
	channelSection.classList.remove('bg-[#3a6280]');
	channelSection.classList.add('bg-[#1c2534]');
};

const paintChannelSection = (channelSection) => {
	channelSection.classList.remove('bg-[#1c2534]');
	channelSection.classList.add('bg-[#3a6280]');
};

const showModal = (dialog) => {
	dialog.showModal();
};

const hideMessaggesModal = (msgError, msgSuccess) => {
	msgError.classList.add('hidden');
	msgSuccess.classList.add('hidden');
};

const closeModal = (dialog) => {
	dialog.close();
};

const buildChannelSection = (channel, favoriteChannels) => {
	const channelSection = buildChannelContainer();
	const favoriteButton = buildFavoriteButton(channel, favoriteChannels);
	const loadChannelButton = buildLoadChannelButton(channel);
	const channelLogo = buildChannelLogo(channel);
	const channelName = buildChannelName(channel);
	loadChannelButton.appendChild(channelLogo);
	loadChannelButton.appendChild(channelName);
	channelSection.appendChild(favoriteButton);
	channelSection.appendChild(loadChannelButton);
	return channelSection;
};

const setupAutoplay = (video) => {
	video.addEventListener('loadeddata', () => {
		if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
			video.play();
		}
	});
};

const setupOpenModal = (loadListButton, msgError, msgSuccess) => {
	loadListButton.addEventListener('click', () => {
		hideMessaggesModal(msgError, msgSuccess);
		showModal(loadListDialog);
	});
};

const setupCloseModal = () => {
	cancelLoadButton.addEventListener('click', () => closeModal(loadListDialog));
};

const setupConfirmLoadButton = (
	confirmLoadButton,
	inputURLM3U,
	msgSuccess,
	msgError,
	renderAllChannels
) => {
	confirmLoadButton.addEventListener('click', async () => {
		try {
			const response = await fetch(inputURLM3U.value);
			if (response.status === 200) {
				localStorage.setItem('urlM3U', inputURLM3U.value);
				renderAllChannels();
				msgSuccess.classList.remove('hidden');
			}
		} catch (error) {
			msgError.classList.remove('hidden');
		}
	});
};

const setupToggleChannelsList = (
	isSectionFavoritesVisible,
	toggleListButton,
	sectionAllChannels,
	sectionFavorites,
	hideElement,
	showElement,
	setTextButton
) => {
	toggleListButton.addEventListener('click', () => {
		isSectionFavoritesVisible = !isSectionFavoritesVisible;
		if (isSectionFavoritesVisible) {
			hideElement(sectionAllChannels);
			showElement(sectionFavorites);
			setTextButton(toggleListButton, 'Todos los canales');
		} else {
			hideElement(sectionFavorites);
			showElement(sectionAllChannels);
			setTextButton(toggleListButton, 'Favoritos');
		}
	});
};

const setupInfiniteScroll = (
	channelsContainer,
	control,
	addChannelsSections,
	buildChannelSection,
	channels
) => {
	channelsContainer.addEventListener('scroll', () => {
		const scrollTop = channelsContainer.scrollTop;
		const scrollHeight = channelsContainer.scrollHeight;
		const clientHeight = channelsContainer.clientHeight;

		if (
			scrollTop + clientHeight >= scrollHeight - 20 &&
			!control.isLoading &&
			!control.isCompleteList
		) {
			control.isLoading = true;
			control.loadedChannelsCount = addChannelsSections(
				control.loadedChannelsCount,
				control.loadMoreCount,
				channels,
				buildChannelSection,
				channelsContainer
			);
			control.isLoading = false;
		}
	});
};

//Main
if (Hls.isSupported()) {
	var hls = new Hls();
	const sectionFavorites = document.getElementById('favorites');
	const sectionAllChannels = document.getElementById('allChannels');
	let favoriteChannels = JSON.parse(localStorage.getItem('favoriteChannels'));
	const urlM3U = localStorage.getItem('urlM3U');
	const toggleListButton = document.getElementById('toggleListButton');
	const video = document.getElementById('video');
	const youtubePlayer = document.getElementById('youtubePlayer');
	const loadListButton = document.getElementById('loadListButton');
	const cancelLoadButton = document.getElementById('cancelLoadButton');
	const loadListDialog = document.getElementById('loadListDialog');
	const confirmLoadButton = document.getElementById('confirmLoadButton');
	const msgError = document.getElementById('loadListDialog__error');
	const msgSuccess = document.getElementById('loadListDialog__success');
	const inputURLM3U = document.getElementById('inputAddURLM3U');
	let isSectionFavoritesVisible = false;
	let currentlyPlayingChannelSection = null;
	const defaultControl = {
		loadedChannelsCount: 0,
		initialLoadCount: 15,
		loadMoreCount: 15,
		isLoading: false,
		isCompleteList: false,
	};
	let allChannelsControl = {
		loadedChannelsCount: 0,
		initialLoadCount: 15,
		loadMoreCount: 15,
		isLoading: false,
		isCompleteList: false,
	};
	let favoritesControl = {
		loadedChannelsCount: 0,
		initialLoadCount: 15,
		loadMoreCount: 15,
		isLoading: false,
		isCompleteList: false,
	};

	setupOpenModal(loadListButton, msgError, msgSuccess);
	setupCloseModal(cancelLoadButton, loadListDialog);
	setupConfirmLoadButton(
		confirmLoadButton,
		inputURLM3U,
		msgSuccess,
		msgError,
		renderAllChannels,
		sectionAllChannels
	);

	const addChannelsSections = (
		initialIndex,
		amount,
		channels,
		buildChannelSection,
		channelsContainer
	) => {
		const arraylength = channels.length;
		let lastIndex = initialIndex + amount;
		if (lastIndex >= arraylength) {
			lastIndex = arraylength;
		}
		for (let i = initialIndex; i < lastIndex; i++) {
			const newChannelSection = buildChannelSection(
				channels[i],
				favoriteChannels
			);
			channelsContainer.appendChild(newChannelSection);
		}
		return (initialIndex += amount);
	};

	function renderAllChannels() {
		if (urlM3U) {
			allChannelsControl = { ...defaultControl };
			sectionAllChannels.innerHTML = '';
			fetchM3UFile(urlM3U).then((fileM3U) => {
				const channels = getChannels(fileM3U);
				allChannelsControl.loadedChannelsCount = addChannelsSections(
					allChannelsControl.loadedChannelsCount,
					allChannelsControl.initialLoadCount,
					channels,
					buildChannelSection,
					sectionAllChannels
				);

				setupInfiniteScroll(
					sectionAllChannels,
					allChannelsControl,
					addChannelsSections,
					buildChannelSection,
					channels
				);
			});
		}
	}

	renderAllChannels();

	function renderFavorites() {
		favoritesControl = { ...defaultControl };
		sectionFavorites.innerHTML = '';
		favoriteChannels = favoriteChannels = JSON.parse(
			localStorage.getItem('favoriteChannels')
		);
		if (favoriteChannels) {
			favoritesControl.loadedChannelsCount = addChannelsSections(
				favoritesControl.loadedChannelsCount,
				favoritesControl.initialLoadCount,
				favoriteChannels,
				buildChannelSection,
				sectionFavorites
			);

			setupInfiniteScroll(
				sectionFavorites,
				favoritesControl,
				addChannelsSections,
				buildChannelSection,
				favoriteChannels
			);
		}
	}

	renderFavorites();

	setupToggleChannelsList(
		isSectionFavoritesVisible,
		toggleListButton,
		sectionAllChannels,
		sectionFavorites,
		hideElement,
		showElement,
		setTextButton
	);

	setupChannelClickListener(
		sectionAllChannels,
		video,
		youtubePlayer,
		currentlyPlayingChannelSection,
		unpaintChannelSection,
		paintChannelSection,
		renderFavorites
	);

	setupChannelClickListener(
		sectionFavorites,
		video,
		youtubePlayer,
		currentlyPlayingChannelSection,
		unpaintChannelSection,
		paintChannelSection,
		renderFavorites
	);

	setupAutoplay(video);
} else {
	console.log('El navegador no soporta Hls');
}
