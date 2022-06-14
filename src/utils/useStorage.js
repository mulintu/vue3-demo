import { ref, watchEffect, watch } from 'vue';

// 存储响应式数据
export function useStorage(name, value = []) {
	let data = ref(JSON.parse(localStorage.getItem(name)) || value);
	//理论上watcheffect性能更好
	watchEffect(() => {
	  localStorage.setItem(name, JSON.stringify(data.value))
	})
	//data是一个具有value属性的对象，所以要加上deep: true
	// watch(
	// 	data,
	// 	() => {
	// 		console.log(2);
	// 	},
	// 	{ deep: true }
	// );

	//data是响应式的，所以在外面修改data时也会被watch监听到。可以把useStorage想象成是mixin
	return data;
}
