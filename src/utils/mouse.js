import { ref, onMounted, onUnmounted } from 'vue';

export function useMouse() {
	const x = ref(0);
	const y = ref(0);

	function update(e) {
		console.log(e);
		x.value = e.pageX;
		y.value = e.pageY;
	}

	onMounted(() => {
		window.addEventListener('mouseover', update);
	});

	onUnmounted(() => {
		window.removeEventListener('mouseover', update);
	});
	return { x, y };
}
