type AlertProps = {
  id: string;
  color: string;
  message: string;
};

export default function Alert({ id, color, message }: AlertProps) {
  return (
    <p id={id} className={`text-[${color}]`}>
      {message}
    </p>
  );
}
