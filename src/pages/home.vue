<template>
  <h1>这是首页</h1>
  <div @click="toggle">进入全屏</div>
  <TodoList ref="todo" />
  <Rate v-model="score">Rate组件的子组件</Rate>
</template>

<script setup>
import { ref } from "@vue/runtime-core";
import TodoList from "../components/TodoList.vue";
import Rate from "../components/Rate.vue";
import { useFullscreen } from "@vueuse/core";

let score = ref(3.5);
// function update(num) {
//   score.value = num;
// }

const todo = ref(null);
const { toggle } = useFullscreen(todo);
</script>