const configInfiniteScroll = ({
  channelsContainer,
  control,
  addChannelsSections,
  buildChannelSection,
  channels,
}) => {
  channelsContainer.addEventListener('scroll', () => {
    const scrollTop = channelsContainer.scrollTop;
    const scrollHeight = channelsContainer.scrollHeight;
    const clientHeight = channelsContainer.clientHeight;

    if (
      scrollTop + clientHeight >= scrollHeight - 20 &&
      !control.isCompleteList
    ) {
      control.isLoading = true;
      control.loadedChannelsCount = addChannelsSections(
        control.loadedChannelsCount,
        control.loadMoreCount,
        channels,
        buildChannelSection,
        channelsContainer,
      );
    }
  });
};

export default configInfiniteScroll;
