async function getFileM3U(url) {
	const dataM3U = await fetch(url);
	return await dataM3U.text();
}

function getChannels(textM3U) {
	let arrayLinesOfText = textM3U.split('\n');
	let channels = [];
	let actualChannelData = null;
	const regexMetadata =
		/#EXTINF:(-?\d+)\s+tvg-id="([^"]*)"\s+tvg-logo="([^"]*)"\s+group-title="([^"]*)",(.*)/;
	const regexURL = /(https?:\/\/[^\s]+)/g;

	arrayLinesOfText.forEach((line) => {
		const channelData = line.match(regexMetadata);
		let channelURL = line.match(regexURL);

		if (channelData) {
			actualChannelData = {
				duration: parseInt(channelData[1]),
				tvgId: channelData[2],
				tvgLogo: channelData[3],
				group: channelData[4],
				name: channelData[5].trim(),
			};
		} else if (actualChannelData && channelURL) {
			channels.push({
				...actualChannelData,
				url: channelURL[0],
			});

			actualChannelData = null;
		}
	});

	return channels;
}

const getFavoritesChannels = () => {
	return JSON.parse(localStorage.getItem('favoriteChannels'));
};

const buildChannelSection = (channel) => {
	const channelSection = document.createElement('div');
	channelSection.classList.add('flex');
	channelSection.classList.add('w-full');
	channelSection.classList.add('min-h-1/7');
	channelSection.classList.add('border-t-1');
	channelSection.classList.add('border-t-[#29374d]');
	channelSection.classList.add('border-b-2');
	channelSection.classList.add('border-b-[#0e121a]');
	channelSection.classList.add('bg-[#1c2534]');
	channelSection.classList.add('hover:bg-[#3a6280]');
	channelSection.classList.add('channel');

	const channelBtnLike = document.createElement('button');
	channelBtnLike.innerText = '♥';
	channelBtnLike.classList.add('text-[#c0c6c9]');
	channelBtnLike.dataset.info = JSON.stringify(channel);
	channelBtnLike.classList.add('text-lg');
	channelBtnLike.classList.add('w-1/6');
	channelBtnLike.classList.add('sm:max-w-16');
	channelBtnLike.classList.add('h-full');
	channelBtnLike.classList.add('channel__btnLike');
	channelSection.appendChild(channelBtnLike);

	const channelButtonPlay = document.createElement('button');
	channelButtonPlay.classList.add('w-5/6');
	channelButtonPlay.classList.add('h-full');
	channelButtonPlay.classList.add('p-2');
	channelButtonPlay.classList.add('flex');
	channelButtonPlay.classList.add('channel__play');
	channelButtonPlay.classList.add('items-center');
	channelButtonPlay.dataset.url = channel.url;

	const channelLogo = document.createElement('img');
	channelLogo.classList.add('lazy');
	channelLogo.classList.add('w-10');
	channelLogo.classList.add('h-full');
	channelLogo.src = channel.tvgLogo;
	channelButtonPlay.appendChild(channelLogo);

	const channelName = document.createElement('p');
	channelName.classList.add('text-[#c0c6c9]');
	channelName.classList.add('ml-4');
	channelName.classList.add('text-xs');
	channelName.innerText = channel.name.trim();
	channelButtonPlay.appendChild(channelName);

	channelSection.appendChild(channelButtonPlay);

	return channelSection;
};

const loadPlaylistM3U = (url, videoElement) => {
	hls.loadSource(url);
	hls.attachMedia(videoElement);
};

const loadVideoYoutube = (url, iframeYoutube) => {
	hls.loadSource('');
	hls.attachMedia(video);
	iframeYoutube.src = url + '?autoplay=1';
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
	const result = url.match(regexYoutube);
	result ? true : false;
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

const closeModal = (dialog) => {
	dialog.close();
};

const buildChannelsList = (channels, section) => {
	section.innerHTML = '';
	channels.forEach((channel) => {
		const channelSection = buildChannelSection(channel);
		section.appendChild(channelSection);
	});
};

//Main
if (Hls.isSupported()) {
	var hls = new Hls();
	const sectionFavorites = document.getElementById('favorites');
	const sectionAllChannels = document.getElementById('allChannels');
	const favoriteChannels = getFavoritesChannels();
	const urlM3U = localStorage.getItem('urlM3U');
	const btnToggleList = document.getElementById('btnToggleList');
	const videoElement = document.getElementById('video');
	const iframeYoutube = document.getElementById('playerYoutube');
	const btnLoadList = document.getElementById('btnLoadList');
	const btnCancel = document.getElementById('btnCancelLoad');
	const addListDialog = document.getElementById('addListDialog');
	const btnConfirmLoad = document.getElementById('btnConfirmLoad');
	let isSectionFavoritesVisible = false;
	let channelSection = null;
	let counterElements = 0;
	const initialElements = 15;
	const elementsToAdd = 15;
	let isLoading = false;

	btnLoadList.addEventListener('click', showModal(addListDialog));
	btnCancel.addEventListener('click', closeModal(addListDialog));

	btnConfirmLoad.addEventListener('click', async () => {
		const urlM3U = document.getElementById('inputAddURLM3U').value;
		try {
			const response = await fetch(urlM3U);
			if (response.status === 200) {
				localStorage.setItem('urlM3U', urlM3U);
				addListDialog.close();
				renderChannels(localStorage.getItem('urlM3U'));
			}
		} catch (error) {
			console.log('La url no responde.', error);
		}
	});

	const addChannelsSections = (initialIndex, amount, channels) => {
		for (let i = initialIndex; i < initialIndex + amount; i++) {
			const newChannelSection = buildChannelSection(channels[i]);
			sectionAllChannels.appendChild(newChannelSection);
		}
		return (initialIndex += amount);
	};

	if (urlM3U) {
		getFileM3U(urlM3U).then((fileM3U) => {
			const channels = getChannels(fileM3U);
			counterElements = addChannelsSections(
				counterElements,
				initialElements,
				channels
			);

			if (favoriteChannels) {
				buildChannelsList(favoriteChannels, sectionFavorites);
			}

			sectionAllChannels.addEventListener('click', (event) => {
				const buttonLoadChannel = event.target.closest('.channel__play');
				if (buttonLoadChannel) {
					const previousChannelSection = channelSection;
					previousChannelSection &&
						unpaintChannelSection(previousChannelSection);
					const channelSectionActive = buttonLoadChannel.parentElement;
					paintChannelSection(channelSectionActive);
					channelSection = channelSectionActive;
					const channelUrl = buttonLoadChannel.dataset.url;
					if (isYoutubeUrl(channelUrl)) {
						hideElement(videoElement);
						showElement(iframeYoutube);
						loadVideoYoutube(channelUrl, iframeYoutube);
					} else {
						hideElement(iframeYoutube);
						clearSrcElement(iframeYoutube);
						showElement(videoElement);
						loadPlaylistM3U(channelUrl, videoElement);
					}
				}
			});

			sectionFavorites.addEventListener('click', (event) => {
				const buttonLoadChannel = event.target.closest('.channel__play');
				if (buttonLoadChannel) {
					const previousChannelSection = channelSection;
					previousChannelSection &&
						unpaintChannelSection(previousChannelSection);
					const channelSectionActive = buttonLoadChannel.parentElement;
					paintChannelSection(channelSectionActive);
					channelSection = channelSectionActive;
					const channelUrl = buttonLoadChannel.dataset.url;
					if (isYoutubeUrl(channelUrl)) {
						hideElement(videoElement);
						showElement(iframeYoutube);
						loadVideoYoutube(channelUrl, iframeYoutube);
					} else {
						hideElement(iframeYoutube);
						clearSrcElement(iframeYoutube);
						showElement(videoElement);
						loadPlaylistM3U(channelUrl, videoElement);
					}
				}
			});

			sectionAllChannels.addEventListener('scroll', () => {
				const scrollTop = sectionAllChannels.scrollTop;
				const scrollHeight = sectionAllChannels.scrollHeight;
				const clientHeight = sectionAllChannels.clientHeight;

				if (scrollTop + clientHeight >= scrollHeight - 20 && !isLoading) {
					isLoading = true;
					counterElements = addChannelsSections(
						counterElements,
						elementsToAdd,
						channels
					);
					isLoading = false;
				}
			});

			const likeButtons = [...document.querySelectorAll('.channel__btnLike')];
			likeButtons.forEach((likeButton) => {
				setupButtonFav(likeButton);
			});
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

	video.addEventListener('loadeddata', () => {
		if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
			video.play();
		}
	});
} else {
	console.log('El navegador no soporta Hls');
}
