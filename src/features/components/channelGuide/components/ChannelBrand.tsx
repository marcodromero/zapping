import LogoChannel from './LogoChannel';

type ChannelBrandType = {
  tvgLogo: string;
  name: string;
};

export default function ChannelBrand({ tvgLogo, name }: ChannelBrandType) {
  return (
    <>
      <LogoChannel tvgLogo={tvgLogo} />
      <p className='text-[#c0c6c9] ml-4 text-xs truncate'>{name}</p>
    </>
  );
}
