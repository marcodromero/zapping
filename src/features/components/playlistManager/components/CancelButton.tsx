type CancelButtonType = {
  onClick: () => void;
  text: string;
};

export default function CancelButton({ onClick, text }: CancelButtonType) {
  return (
    <button
      id='cancelLoadButton'
      className='m-2 p-1 bg-[#444646] text-[#acaead] border-2 border-[#565958] rounded-lg'
      onClick={onClick}
    >
      {text}
    </button>
  );
}
