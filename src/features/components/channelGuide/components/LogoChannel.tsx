type LogoChannel = {
  tvgLogo: string;
};

export default function LogoChannel({ tvgLogo }: LogoChannel) {
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
