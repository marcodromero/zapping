type ChannelTitleType = {
  name: string;
};

export default function ChannelTitle({ name }: ChannelTitleType) {
  return <p className='text-[#c0c6c9] ml-4 text-xs truncate'>{name}</p>;
}
