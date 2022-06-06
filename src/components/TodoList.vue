<template>
  <div>
    <input type="text" v-model="title" @keypress.enter="addTodo" />
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <li v-for="todo in todos" :key="todo.title">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }">{{ todo.title }}</span>
      </li>
    </ul>
    <div v-else>暂无数据</div>
    <div>
      全选<input type="checkbox" v-model="allDone" />
      <span>{{ active }}/{{ all }}</span>
    </div>
    <!-- 鼠标位置 -->
    <div>{{x}}, {{y}}</div> 
    <!-- 通过css改变颜色   -->
    <h1 @click="add">{{ count}}</h1>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import {useMouse} from '../utils/mouse'

//鼠标位置
let {x,y}=useMouse()

//css
let count = ref(1)
let color=ref('red')
function add(){
  count.value++
  color.value=Math.random() > 0.5 ? 'blue': 'red'
}


//只需要获取所需的变量就行了，具体逻辑useTodos去实现
let { title, todos, addTodo, clear, active, all, allDone } = useTodos();

//一个组件有多段功能代码的话，可以把功能独立的模块封装成一个独立的函数
//如果是可以公用的，那么可以单独提取成一个js文件放在utils里
function useTodos() {
  let title = ref("");
  let todos = ref([{ title: "学习vue", done: false }]);

  function addTodo() {
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

  return { title, todos, addTodo, clear, active, all, allDone };
}
</script>

<style scoped>
h1 {
  color: v-bind(color);
  cursor: pointer;
}
</style>