import { useChannelStore } from '../../../../store/channelStore';
import type { playerType } from '../../../../types/channelTypes';
import vibrateDevice from '../utils/vibrateDevice';

export default function usePlayer() {
  const setActivePlayer = useChannelStore((state) => state.setActivePlayer);
  const setActiveChannel = useChannelStore((state) => state.setActiveChannel);

  const handleClickChannel = (url: string, player: playerType) => {
    vibrateDevice();
    setActiveChannel(url);
    setActivePlayer(player);
  };

  return {
    handleClickChannel,
  };
}
