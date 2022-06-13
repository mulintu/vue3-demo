<template>
  <div :style="fontStyle">
    <slot></slot>
    <div class="rate" @mouseout="mouseOut">
      <span @mouseover="mouseOver(num)" v-for="num in 5" :key="num">☆</span>
      <span class="hollow" :style="fontwidth">
        <span
          @click="onRate(num)"
          @mouseover="mouseOver(num)"
          v-for="num in 5"
          :key="num"
          >★</span
        >
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, ref } from "@vue/runtime-core";

//定义props
let props = defineProps({
  modelValue: Number,
  theme: { type: String, default: "orange" },
});

//定义emits
// let emits=defineEmits(['update-rate'])
let emits = defineEmits(["update:modelValue"]);
function onRate(num) {
  emits("update:modelValue", num);
}

//1 (4,9)
// let rate = computed(() =>
//   "★★★★★☆☆☆☆☆".slice(5 - props.modelValue, 10 - props.modelValue)
// );
const themeObj = {
  black: "#000",
  white: "#fff",
  red: "#f5222d",
  orange: "#fa541c",
  yellow: "#fadb14",
  white: "#fff",
  blue: "#40a9ff",
};
let fontStyle = computed(() => `color:${themeObj[props.theme]}`);

//评分宽度
let width = ref(props.modelValue);
function mouseOver(num) {
  width.value = num;
}
function mouseOut() {
  width.value = props.modelValue;
}
const fontwidth = computed(() => `width:${width.value}em`);
</script>

<style  scoped>
.rate {
  position: relative;
  display: inline-block;
}

.rate > span.hollow {
  position: absolute;

  top: 0;
  left: 0;
  width: 0;
  overflow: hidden;
}
</style>