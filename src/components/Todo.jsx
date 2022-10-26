//实现清单应用
//1，jsx相比较template的优势：可以支持更动态的需求，可以在一个文件内返回多个组件。
//2，template相比较jsx的优势：在编译层面做了比较多的优化。

import { useTitle } from '@vueuse/core';
import { defineComponent, ref } from 'vue';

export default defineComponent({
	setup() {
		let title = ref('');
		let todos = ref([ { title: '学习 Vue 3', done: true }, { title: '睡觉', done: false } ]);

		function addTodo() {
			todos.value.push({
				title: title.value
			});
			title.value = '';
		}

		return () => (
			<div>
				<input type="text" vModel={title.value} />
				<button onClick={addTodo}>click</button>
				<ul>
					{todos.value.length ? (
						todos.value.map((todo) => {
							return <li>{todo.title}</li>;
						})
					) : (
						<li>no data</li>
					)}
				</ul>
			</div>
		);
	}
});
