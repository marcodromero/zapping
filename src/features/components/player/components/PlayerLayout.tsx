import imageStatic from '../../../../assets/images/bg-tv.jpg';

export default function PlayerLayout({ children }: React.PropsWithChildren) {
  return (
    <div
      className='flex justify-center w-full h-3/10 bg-no-repeat bg-center '
      style={{
        backgroundImage: `url(${imageStatic})`,
        backgroundSize: 'contain',
      }}
    >
      {children}
    </div>
  );
}
