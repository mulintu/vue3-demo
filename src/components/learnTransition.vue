<template>
  <transition name="showTitle">
    <h1 v-if="showTitle">你好</h1>
  </transition>
  <button @click="changeTitleStatus">显示/隐藏</button>
</template>

<script setup>
import { ref } from "@vue/runtime-core";

let showTitle = ref(true);
function changeTitleStatus() {
  showTitle.value = !showTitle.value;
}
</script>

<style scoped>
.showTitle-enter-from,
.showTitle-leave-to {
  opacity: 0;
}
.showTitle-enter-active,
.showTitle-leave-active {
  transition: opacity 1s;
}
</style>