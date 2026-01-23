export default function vibrateDevice(): void {
  if ('vibrate' in navigator) {
    navigator.vibrate(50);
  }
}
