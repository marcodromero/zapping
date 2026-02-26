import type { PropsWithChildren } from 'react';

export default function Toolbar({ children }: PropsWithChildren) {
  return (
    <div className='flex justify-around items-center p-4 bg-[#1d1e22] text-sm border-b-1 border-b-[#121414] border-t border-t-[#222626] h-[100%] '>
      {children}
    </div>
  );
}
