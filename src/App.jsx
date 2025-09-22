import { useState } from 'react';
import ChannelsList from './components/ChannelsList';
import Modal from './components/Modal';
import YoutubePlayer from './components/YoutubePlayer';
import isYoutubeURL from './utils/isYoutubeURL';
import Navbar from './components/Navbar';
import HlsPlayer from './components/HlsPlayer';
import imageStatic from '../public/bg-tv.jpg';

function App() {
	const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
	const [showYoutubePlayer, setShowYoutubePlayer] = useState(false);
	const [showHLSPlayer, setShowHLSPlayer] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handlePlayerSelect = (url) => {
		setCurrentVideoUrl(url);

		if (isYoutubeURL(url)) {
			setShowYoutubePlayer(true);
			setShowHLSPlayer(false);
		} else {
			setShowYoutubePlayer(false);
			setShowHLSPlayer(true);
		}
	};

	return (
		<div className="bg-black flex items-center flex-col h-dvh">
			<div
				className="flex justify-center w-full min-h-3/10 max-h-3/10 bg-no-repeat bg-center "
				style={{
					backgroundImage: `url(${imageStatic})`,
					backgroundSize: 'contain',
				}}
			>
				{showYoutubePlayer && currentVideoUrl && (
					<YoutubePlayer url={currentVideoUrl} />
				)}
				{showHLSPlayer && currentVideoUrl && (
					<HlsPlayer url={currentVideoUrl} />
				)}
			</div>
			<Navbar openModal={openModal} />

			<ChannelsList handlePlayerSelect={handlePlayerSelect} />

			<Modal isOpen={isModalOpen} closeModal={closeModal} />
		</div>
	);
}

export default App;
