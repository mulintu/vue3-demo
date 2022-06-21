<template>
  <component :is='comp'></component>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "../grouter/index";

let router = useRouter();

//通过hash找到当前想要渲染的组件
const comp = computed(() => {
  const route = router.routes.find(
    (route) => route.path === router.current.value
  );
  return route ? route.component : null;
});
</script>

<style scoped>
</style>