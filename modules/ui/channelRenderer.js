import getChannels from '../../src/utils/getChannels';

// Configuración por defecto
const DEFAULT_CONFIG = {
  loadedChannelsCount: 0,
  initialLoadCount: 15,
  loadMoreCount: 15,
  isCompleteList: false,
};

const getLastIndex = (initialIndex, amount, totalLength) => {
  const lastIndex = initialIndex + amount;
  return lastIndex >= totalLength ? totalLength : lastIndex;
};

const renderChannels = ({
  channels,
  container,
  buildChannelSection,
  favoriteChannels,
  control = { ...DEFAULT_CONFIG },
}) => {
  if (!channels?.length) {
    console.warn('No hay canales para renderizar');
    return control;
  }

  container.innerHTML = '';
  const lastIndex = getLastIndex(
    control.loadedChannelsCount,
    control.initialLoadCount,
    channels.length,
  );

  for (let i = control.loadedChannelsCount; i < lastIndex; i++) {
    const newChannelSection = buildChannelSection(
      channels[i],
      favoriteChannels,
    );
    container.appendChild(newChannelSection);
  }

  return {
    ...control,
    loadedChannelsCount: lastIndex,
    isCompleteList: lastIndex >= channels.length,
  };
};

const renderM3UChannels = async ({
  urlM3U,
  container,
  buildChannelSection,
  favoriteChannels,
  onComplete,
}) => {
  if (!urlM3U) return;

  try {
    const channels = getChannels(urlM3U);
    const control = renderChannels({
      channels,
      container,
      buildChannelSection,
      favoriteChannels,
    });

    if (onComplete) {
      onComplete(control, channels);
    }

    return control;
  } catch (error) {
    console.error('Error al cargar los canales M3U:', error);
    return null;
  }
};

export { DEFAULT_CONFIG, renderChannels, renderM3UChannels };
