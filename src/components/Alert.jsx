export default function Alert({ id, color, message }) {
	return (
		<p id={id} className={`text-[${color}]`}>
			{message}
		</p>
	);
}
