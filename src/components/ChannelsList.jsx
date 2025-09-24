import React, { useEffect, useState } from 'react';
import getChannels from '../utils/getChannels';
import Channel from './Channel';

export default function ChannelsList({ handlePlayerSelect }) {
	const [channels, setChannels] = useState([]);

	async function getChannelsData() {
		const data = await getChannels();
		if (data) {
			setChannels(data);
		}
	}

	useEffect(() => {
		getChannelsData();
	}, []);

	return (
		<section
			className={
				channels.length !== 0
					? 'flex flex-wrap content-start overflow-auto bg-[#3c4248] min-h-6/10 max-h-6/10'
					: 'flex flex-wrap content-start overflow-auto bg-[#3c4248] h-0/10'
			}
		>
			{channels.map((channel, index) => (
				<Channel
					channelData={channel}
					key={index}
					handlePlayerSelect={handlePlayerSelect}
				/>
			))}
		</section>
	);
}
