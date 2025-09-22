export default function validateM3U(content) {
	if (content.trim().startsWith('#EXTM3U')) return true;
	return false;
}
