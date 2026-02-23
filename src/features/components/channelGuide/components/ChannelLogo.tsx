type ChannelLogoType = {
  tvgLogo: string;
};

export default function ChannelLogo({ tvgLogo }: ChannelLogoType) {
  return (
    <img
      className='w-15 h-full object-contain'
      src={tvgLogo}
      loading='lazy'
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          'https://placehold.co/60x40?text=TV';
      }}
    />
  );
}
