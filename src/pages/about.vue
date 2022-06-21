<template>
  <Heading :level="1">
    <span>标题12</span>
    <template v-slot:header> 
      <span>1234</span>
    </template>
  </Heading>
</template>

<script setup>
import Heading from '../components/Heading.jsx'
</script>

<style scoped>

</style>