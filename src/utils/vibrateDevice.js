export default function vibrateDevice() {
	if ('vibrate' in navigator) {
		navigator.vibrate(50);
	}
}
