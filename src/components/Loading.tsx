export default function Loading() {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center bg-[#1c2534] text-white'>
      <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500'></div>
      <p className='mt-4 text-gray-400'>Preparando tus canales...</p>
    </div>
  );
}
