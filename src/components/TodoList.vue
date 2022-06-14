<template>
  <div style="background: #fff">
    <input type="text" v-model="title" @keypress.enter="addTodo" />
    <button v-if="active < all" @click="clear">清理</button>
    <div v-if="todos.length">
      <transition-group tag="ul" name="flip-list">
        <li v-for="todo in todos" :key="todo.title">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }">{{ todo.title }}</span>
        </li>
      </transition-group>
    </div>

    <div v-else>暂无数据</div>
    <div>
      全选<input type="checkbox" v-model="allDone" />
      <span>{{ active }}/{{ all }}</span>
    </div>
    <!-- 鼠标位置 -->
    <div>{{ x }}, {{ y }}</div>
    <!-- 通过css改变颜色   -->
    <h1 @click="add">{{ count }}</h1>
    <button @click="loading">更改favicon</button>
  </div>
  <transition name="modal">
    <div v-if="showModal">
      <div class="info">你啥也没输入</div>
    </div>
  </transition>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";
import { useMouse } from "../utils/mouse";
import { useStorage } from "../utils/useStorage";
import useFavicon from "../utils/useFavicon";

//获取鼠标位置
let { x, y } = useMouse();

//css使用js变量
let count = ref(1);
let color = ref("red");
function add() {
  count.value++;
  color.value = Math.random() > 0.5 ? "blue" : "red";
}

//更改网站图标
let { favicon } = useFavicon();
function loading() {
  favicon.value = "./assets/logo.png";
}

//只需要获取所需的变量就行了，具体逻辑useTodos去实现
let { title, todos, addTodo, clear, active, all, allDone, showModal } =
  useTodos();

//一个组件有多段功能代码的话，可以把功能独立的模块封装成一个独立的函数
//如果是可以公用的，那么可以单独提取成一个js文件放在utils里
function useTodos() {
  let title = ref("");

  //解决状态在刷新后就没有了的问题，将存储过程提取未工具函数
  //在外面对todos进行操作，在useStorage里面监听todos的变化
  let todos = useStorage("todos", []);

  //显示提示框
  let showModal = ref(false);

  function addTodo() {
    if (!title.value.trim()) {
      showModal.value = true;

      setTimeout(() => {
        showModal.value = false;
      }, 1500);
      return;
    }
    todos.value.push({
      title: title.value,
      done: false,
    });
    title.value = "";
  }
  function clear() {
    todos.value = todos.value.filter((v) => !v.done);
  }

  let active = computed(() => {
    return todos.value.filter((v) => !v.done).length;
  });
  let all = computed(() => todos.value.length);
  let allDone = computed({
    get: function () {
      return active.value === 0;
    },
    set: function (val) {
      todos.value.forEach((v) => (v.done = val));
    },
  });

  return { title, todos, addTodo, clear, active, all, allDone, showModal };
}
</script>

<style scoped>
h1 {
  color: v-bind(color);
  cursor: pointer;
}
.info-wrapper {
  position: fixed;
  top: 20px;
  width: 200px;
}
.info {
  padding: 20px;
  color: white;
  background: #d88986;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 1s;
}

.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 2s;
}
.flip-list-move {
  transition: all 0.8s ease;
}
</style>