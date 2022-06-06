<template>
  <h1>这是首页</h1>
  <TodoList />
  <Rate :value="score"></Rate>
</template>

<script setup>
import { ref } from "@vue/runtime-core";
import TodoList from "../components/TodoList.vue";
import Rate from "../components/Rate.vue";

let score = ref(3);
</script>