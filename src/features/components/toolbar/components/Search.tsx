import { useChannelStore } from '../../../../store/channelStore';

export default function Search() {
  const searchTerm = useChannelStore((state) => state.searchTerm);
  const setSearchTerm = useChannelStore((state) => state.setSearchTerm);

  return (
    <div className='  border-b border-black/20'>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Buscar canal'
        className='w-full p-2 rounded bg-[#1c2534] text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
      />
    </div>
  );
}
