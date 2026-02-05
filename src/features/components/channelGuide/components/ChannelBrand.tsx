type ChannelBrandType = {
  tvgLogo: string;
  name: string;
};

export default function ChannelBrand({ tvgLogo, name }: ChannelBrandType) {
  return (
    <>
      <img
        className='w-15 h-full object-contain'
        src={tvgLogo}
        loading='lazy'
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            'https://placehold.co/60x40?text=TV';
        }}
      />
      <p className='text-[#c0c6c9] ml-4 text-xs truncate'>{name}</p>
    </>
  );
}
