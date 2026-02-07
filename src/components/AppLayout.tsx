export default function AppLayout({ children }: React.PropsWithChildren) {
  return (
    <div className='bg-black flex items-center flex-col h-dvh'>{children}</div>
  );
}
