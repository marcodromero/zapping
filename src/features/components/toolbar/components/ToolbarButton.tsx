type ToolbarButtonType = {
  text: string;
  onClick: () => void;
};

export default function ToolbarButton({ text, onClick }: ToolbarButtonType) {
  return (
    <button
      className='bg-[#4d4c0d] text-[#acaead] border-2 border-[#565958] rounded-lg p-1 flex items-center h-8 font-bold text-[11px]'
      id='loadListButton'
      onClick={onClick}
    >
      {text}
    </button>
  );
}
