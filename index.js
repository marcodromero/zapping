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

const getFavoritesChannels = () => {
	return JSON.parse(localStorage.getItem('favoriteChannels'));
};

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

const buildFavoriteButton = (channel) => {
	const favoriteButton = document.createElement('button');
	favoriteButton.innerText = '♥';
	favoriteButton.classList.add('text-[#c0c6c9]');
	favoriteButton.dataset.info = JSON.stringify(channel);
	favoriteButton.classList.add('text-lg');
	favoriteButton.classList.add('w-1/6');
	favoriteButton.classList.add('sm:max-w-16');
	favoriteButton.classList.add('h-full');
	favoriteButton.classList.add('channel__btnLike');
	return favoriteButton;
};

const buildLoadChannelButton = (channel) => {
	const loadChannelButton = document.createElement('button');
	loadChannelButton.classList.add('w-5/6');
	loadChannelButton.classList.add('h-full');
	loadChannelButton.classList.add('p-2');
	loadChannelButton.classList.add('flex');
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

const setupButtonFav = (button) => {
	button.addEventListener('click', async () => {
		let favoriteChannels = [];
		const channelData = JSON.parse(button.dataset.info);
		if (localStorage.getItem('favoriteChannels')) {
			favoriteChannels = JSON.parse(localStorage.getItem('favoriteChannels'));
			let exist = 0;
			let channelIndex;
			favoriteChannels.forEach((favoriteChannel, index) => {
				if (favoriteChannel.tvgId === channelData.tvgId) {
					exist = 1;
					channelIndex = index;
				}
			});
			if (exist) {
				favoriteChannels.splice(channelIndex, 1);
				localStorage.setItem(
					'favoriteChannels',
					JSON.stringify(favoriteChannels)
				);
				button.classList.red('text-[#ff0000]');
				button.classList.add('text-[#c0c6c9]');
			} else {
				favoriteChannels.push(channelData);
				localStorage.setItem(
					'favoriteChannels',
					JSON.stringify(favoriteChannels)
				);
				button.classList.remove('text-[#c0c6c9]');
				button.classList.add('text-[#ff0000]');
			}
		} else {
			favoriteChannels.push(channelData);
			localStorage.setItem(
				'favoriteChannels',
				JSON.stringify(favoriteChannels)
			);
			button.classList.remove('text-[#c0c6c9]');
			button.classList.add('text-[#ff0000]');
		}
	});
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

const buildChannelSection = (channel) => {
	const channelSection = buildChannelContainer();
	const favoriteButton = buildFavoriteButton(channel);
	const loadChannelButton = buildLoadChannelButton(channel);
	const channelLogo = buildChannelLogo(channel);
	const channelName = buildChannelName(channel);
	loadChannelButton.appendChild(channelLogo);
	loadChannelButton.appendChild(channelName);
	channelSection.appendChild(favoriteButton);
	channelSection.appendChild(loadChannelButton);
	return channelSection;
};

const handlePlayChannel = (
	event,
	currentlyPlayingChannelSection,
	unpaintChannelSection,
	paintChannelSection,
	isYoutubeUrl,
	hideElement,
	showElement,
	loadVideoYoutube,
	clearSrcElement,
	loadPlaylistM3U,
	video,
	youtubePlayer
) => {
	const buttonLoadChannel = event.target.closest('.channel__play');
	if (buttonLoadChannel) {
		const previousChannelSection = currentlyPlayingChannelSection;
		previousChannelSection && unpaintChannelSection(previousChannelSection);
		currentlyPlayingChannelSection = buttonLoadChannel.parentElement;
		paintChannelSection(currentlyPlayingChannelSection);

		const channelUrl = buttonLoadChannel.dataset.url;
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
	}
	return currentlyPlayingChannelSection;
};

//Main
if (Hls.isSupported()) {
	var hls = new Hls();
	const sectionFavorites = document.getElementById('favorites');
	const sectionAllChannels = document.getElementById('allChannels');
	const favoriteChannels = getFavoritesChannels();
	const urlM3U = localStorage.getItem('urlM3U');
	const btnToggleList = document.getElementById('btnToggleList');
	const video = document.getElementById('video');
	const youtubePlayer = document.getElementById('youtubePlayer');
	const loadListButton = document.getElementById('loadListButton');
	const cancelLoadButton = document.getElementById('cancelLoadButton');
	const loadListDialog = document.getElementById('loadListDialog');
	const confirmLoadButton = document.getElementById('confirmLoadButton');
	const msgError = document.getElementById('loadListDialog__error');
	const msgSuccess = document.getElementById('loadListDialog__success');
	let isSectionFavoritesVisible = false;
	let currentlyPlayingChannelSection = null;
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

	loadListButton.addEventListener('click', () => {
		hideMessaggesModal();
		showModal(loadListDialog);
	});
	cancelLoadButton.addEventListener('click', () => closeModal(loadListDialog));

	confirmLoadButton.addEventListener('click', async () => {
		const urlM3U = document.getElementById('inputAddURLM3U').value;
		try {
			const response = await fetch(urlM3U);
			if (response.status === 200) {
				localStorage.setItem('urlM3U', urlM3U);
				msgSuccess.classList.remove('hidden');
			}
		} catch (error) {
			msgError.classList.remove('hidden');
		}
	});

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
			lastIndex = arraylength - 1;
		}
		for (let i = initialIndex; i < lastIndex; i++) {
			const newChannelSection = buildChannelSection(channels[i]);
			channelsContainer.appendChild(newChannelSection);
		}
		return (initialIndex += amount);
	};

	if (urlM3U) {
		fetchM3UFile(urlM3U).then((fileM3U) => {
			const channels = getChannels(fileM3U);
			allChannelsControl.loadedChannelsCount = addChannelsSections(
				allChannelsControl.loadedChannelsCount,
				allChannelsControl.initialLoadCount,
				channels,
				buildChannelSection,
				sectionAllChannels
			);

			sectionAllChannels.addEventListener('click', (event) => {
				currentlyPlayingChannelSection = handlePlayChannel(
					event,
					currentlyPlayingChannelSection,
					unpaintChannelSection,
					paintChannelSection,
					isYoutubeUrl,
					hideElement,
					showElement,
					loadVideoYoutube,
					clearSrcElement,
					loadPlaylistM3U,
					video,
					youtubePlayer
				);
			});

			sectionAllChannels.addEventListener('scroll', () => {
				const scrollTop = sectionAllChannels.scrollTop;
				const scrollHeight = sectionAllChannels.scrollHeight;
				const clientHeight = sectionAllChannels.clientHeight;

				if (
					scrollTop + clientHeight >= scrollHeight - 20 &&
					!allChannelsControl.isLoading &&
					!allChannelsControl.isCompleteList
				) {
					allChannelsControl.isLoading = true;
					allChannelsControl.loadedChannelsCount = addChannelsSections(
						allChannelsControl.loadedChannelsCount,
						allChannelsControl.loadMoreCount,
						channels,
						buildChannelSection,
						sectionAllChannels
					);
					allChannelsControl.isLoading = false;
				}
			});
		});
	}

	if (favoriteChannels) {
		favoritesControl.loadedChannelsCount = addChannelsSections(
			favoritesControl.loadedChannelsCount,
			favoritesControl.initialLoadCount,
			favoriteChannels,
			buildChannelSection,
			sectionFavorites
		);

		sectionFavorites.addEventListener('click', (event) => {
			currentlyPlayingChannelSection = handlePlayChannel(
				event,
				currentlyPlayingChannelSection,
				unpaintChannelSection,
				paintChannelSection,
				isYoutubeUrl,
				hideElement,
				showElement,
				loadVideoYoutube,
				clearSrcElement,
				loadPlaylistM3U,
				video,
				youtubePlayer
			);
		});

		sectionFavorites.addEventListener('scroll', () => {
			const scrollTop = sectionFavorites.scrollTop;
			const scrollHeight = sectionFavorites.scrollHeight;
			const clientHeight = sectionFavorites.clientHeight;

			if (
				scrollTop + clientHeight >= scrollHeight - 20 &&
				!favoritesControl.isLoading &&
				!favoritesControl.isCompleteList
			) {
				favoritesControl.isLoading = true;
				favoritesControl.loadedChannelsCount = addChannelsSections(
					favoritesControl.loadedChannelsCount,
					favoritesControl.loadMoreCount,
					favoriteChannels,
					buildChannelSection,
					sectionFavorites
				);
				favoritesControl.isLoading = false;
			}
		});
	}

	btnToggleList.addEventListener('click', () => {
		isSectionFavoritesVisible = !isSectionFavoritesVisible;
		if (isSectionFavoritesVisible) {
			hideElement(sectionAllChannels);
			showElement(sectionFavorites);
			setTextButton(btnToggleList, 'Todos los canales');
		} else {
			hideElement(sectionFavorites);
			showElement(sectionAllChannels);
			setTextButton(btnToggleList, 'Favoritos');
		}
	});

	const likeButtons = [...document.querySelectorAll('.channel__btnLike')];
	likeButtons.forEach((likeButton) => {
		setupButtonFav(likeButton);
	});

	video.addEventListener('loadeddata', () => {
		if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
			video.play();
		}
	});
} else {
	console.log('El navegador no soporta Hls');
}
