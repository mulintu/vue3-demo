<script setup>
import { ref } from "vue";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

function fib(n) {
  let arr = [1, 1];
  let i = 2;
  while (i <= n) {
    arr[i] = arr[i - 1] + arr[i - 2];
    i++;
  }
  return arr[n];
}
</script>

<template>
  <div>
    <router-link to="/">首页</router-link>|
    <router-link to="/about">关于</router-link>
  </div>
  <!-- <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is='Component'></component>
    </transition>
  </router-view> -->
  <router-view></router-view>
</template>

<style>
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.route-enter-from,
.route-leave-to {
  opacity: 0;
}
.route-enter-active,
.route-leave-active {
  transition: opacity 1s;
}
</style>
