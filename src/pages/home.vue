<template>
  <div>
    <h1>这是首页</h1>
    <div @click="toggle">进入全屏</div>
    <TodoList />
    <Rate v-model="score">Rate组件的子组件</Rate>
    <learnTransition></learnTransition>
    <Count></Count>
    <Todo></Todo>
  </div>
</template>

<script setup>
import { ref } from "@vue/runtime-core";
import TodoList from "../components/TodoList.vue";
import Rate from "../components/Rate.vue";
import { useFullscreen } from "@vueuse/core";
import learnTransition from "../components/learnTransition.vue";
import Count from "../components/Count.vue";
import Todo from "../components/Todo.jsx";

let score = ref(3.5);
// function update(num) {
//   score.value = num;
// }

const { toggle } = useFullscreen();
</script>