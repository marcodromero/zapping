const configAutoplay = (videoPlayer) => {
	if (!videoPlayer) return;
	videoPlayer.addEventListener('loadeddata', () => {
		if (videoPlayer.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
			videoPlayer.play();
		}
	});
};

const initVideoPlayer = () => {
	const videoPlayer = document.getElementById('video');
	if (!videoPlayer) {
		console.warn('No se encontró el elemento de video');
		return;
	}
	configAutoplay(videoPlayer);
};

export default initVideoPlayer;
