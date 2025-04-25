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
	channelSection.classList.add('border-t-[#6a7580]');
	channelSection.classList.add('border-b-2');
	channelSection.classList.add('border-b-[#2a2f33]');
	channelSection.classList.add('bg-[#3c4248]');
	channelSection.classList.add('hover:bg-[#1d4f85]');
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

	const imageObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const img = entry.target;
				img.src = img.dataset.src;
				img.classList.remove('lazy');
				observer.unobserve(img);
			}
		});
	});

	const channelLogo = document.createElement('img');
	channelLogo.classList.add('lazy');
	channelLogo.classList.add('w-10');
	channelLogo.classList.add('h-full');
	channelLogo.dataset.src = channel.tvgLogo;
	imageObserver.observe(channelLogo);
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

const setupButtonLoadChannel = (channelSection, channelSections) => {
	const video = document.getElementById('video');
	const playerYoutube = document.getElementById('playerYoutube');
	const channelPlay = channelSection.querySelector('.channel__play');

	channelPlay.addEventListener('click', async () => {
		channelSections.forEach((cs) => {
			cs.classList.remove('bg-[#1d4f85]');
			channelSection.classList.add('bg-[#3c4248]');
		});
		channelSection.classList.remove('bg-[#3c4248]');
		channelSection.classList.add('bg-[#1d4f85]');

		try {
			await fetch(channelPlay.dataset.url);
			const regexYoutube =
				/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\b/;
			const youtubeURL = channelPlay.dataset.url.match(regexYoutube);

			if (youtubeURL) {
				hls.loadSource('');
				hls.attachMedia(video);
				playerYoutube.src = channelPlay.dataset.url + '?autoplay=1';
				video.classList.add('hidden');
				playerYoutube.classList.remove('hidden');
			} else {
				playerYoutube.src = '';
				playerYoutube.classList.add('hidden');
				video.classList.remove('hidden');
				hls.loadSource(channelPlay.dataset.url);
				hls.attachMedia(video);
			}
		} catch (error) {
			if (error) {
				channelSection.classList.remove('bg-[#3c4248]');
				channelSection.classList.add('bg-red-950');
			}
		}
	});
};

const setupButtonFav = (button) => {
	button.addEventListener('click', async () => {
		let favoriteChannels = [];
		const channelData = JSON.parse(button.dataset.info);
		if (localStorage.getItem('favoriteChannels')) {
			favoriteChannels = JSON.parse(localStorage.getItem('favoriteChannels'));
			let existe = 0;
			let channelIndex;
			favoriteChannels.forEach((favoriteChannel, index) => {
				if (favoriteChannel.tvgId === channelData.tvgId) {
					existe = 1;
					channelIndex = index;
				}
			});
			if (existe) {
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

const showChannelsSection = (isSectionFavoritesVisible) => {
	const sectionFavorites = document.getElementById('favorites');
	const sectionAllChannels = document.getElementById('allChannels');
	if (isSectionFavoritesVisible) {
		sectionAllChannels.classList.add('hidden');
		sectionFavorites.classList.remove('hidden');
		btnToggleList.innerText = 'Todos los canales';
	} else {
		sectionAllChannels.classList.remove('hidden');
		sectionFavorites.classList.add('hidden');
		btnToggleList.innerText = 'Favoritos';
	}
};

const btnLoadList = document.getElementById('btnLoadList');
const btnCancel = document.getElementById('btnCancelLoad');
const addListDialog = document.getElementById('addListDialog');
const btnConfirmLoad = document.getElementById('btnConfirmLoad');
btnLoadList.addEventListener('click', () => {
	addListDialog.showModal();
});
btnCancel.addEventListener('click', () => {
	addListDialog.close();
});
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

const buildChannelsList = (channels, section) => {
	section.innerHTML = '';
	channels.forEach((channel) => {
		const channelSection = buildChannelSection(channel);
		section.appendChild(channelSection);
	});

	const channelSections = [...document.querySelectorAll('.channel')];
	channelSections.forEach((channelSection) => {
		setupButtonLoadChannel(channelSection, channelSections);
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
};

//Main
if (Hls.isSupported()) {
	var hls = new Hls();
	let isSectionFavoritesVisible = false;
	const sectionFavorites = document.getElementById('favorites');
	const sectionAllChannels = document.getElementById('allChannels');
	const favoriteChannels = getFavoritesChannels();
	const urlM3U = localStorage.getItem('urlM3U');

	if (urlM3U) {
		getFileM3U(urlM3U).then((fileM3U) => {
			const allChannels = getChannels(fileM3U);
			buildChannelsList(allChannels, sectionAllChannels);
		});
	}

	favoriteChannels && buildChannelsList(favoriteChannels, sectionFavorites);

	const btnToggleList = document.getElementById('btnToggleList');
	btnToggleList.addEventListener('click', () => {
		isSectionFavoritesVisible = !isSectionFavoritesVisible;
		showChannelsSection(isSectionFavoritesVisible);
	});
} else {
	console.log('El navegador no soporta Hls');
}
