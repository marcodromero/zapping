type AlertProps = {
  alertStyle: string;
  color: string;
  message: string;
};

export default function Alert({ alertStyle, message }: AlertProps) {
  if (alertStyle === 'error') {
    return <p className={`text-[#ff0000]`}>{message}</p>;
  }
  if (alertStyle === 'success') {
    return <p className={`text-[#ff0]`}>{message}</p>;
  }
}
