<template>
  <a :href="'#' + props.to">
    <slot></slot>
  </a>
</template>

<script setup>
let props = defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
</style>