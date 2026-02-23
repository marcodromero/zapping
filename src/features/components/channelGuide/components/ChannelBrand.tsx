import ChannelLogo from './ChannelLogo';
import ChannelTitle from './ChannelTitle';

type ChannelBrandType = {
  tvgLogo: string;
  name: string;
};

export default function ChannelBrand({ tvgLogo, name }: ChannelBrandType) {
  return (
    <>
      <ChannelLogo tvgLogo={tvgLogo} />
      <ChannelTitle name={name} />
    </>
  );
}
