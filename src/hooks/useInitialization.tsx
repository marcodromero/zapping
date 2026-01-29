import { useEffect, useState } from 'react';
import { useChannelStore } from '../store/channelStore';
import { migrateStorage } from '../utils/storageMigration';

export function useInitialization() {
  const [isReady, setIsReady] = useState(false);
  const fetchChannels = useChannelStore((state) => state.fetchChannels);

  useEffect(() => {
    const init = async () => {
      migrateStorage();
      await fetchChannels();
      setIsReady(true);
    };
    init();
  }, [fetchChannels]);

  return isReady;
}

export default useInitialization;
