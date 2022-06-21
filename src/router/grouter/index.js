// 1 实现使用createWebHashHistory来返回hash模式相关的监听代码，返回url和监听
// hashchange事件的方法
// 2 通过Router类类的install方法注册Router的实例
// 3 对外暴露createRouter方法去创建Router实例
// 4 暴露useRouter方法去获取路由实例

import { ref, inject } from 'vue'
import RouterView  from './RouterView.vue'
import  RouterLink  from './RouterLink.vue'
const ROUTER_KEY = '__router__'

class Router {
  constructor(options) {
    this.history = options.history
    this.routes = options.routes
    this.current = ref(this.history.url)

    this.history.bindEvents(() => { //每次hash改变时this.current都变为最新的hash值
      this.current.value = window.location.hash.slice(1)
    })
  }

  install(app) {
    app.provide(ROUTER_KEY, this)
    app.component("router-link", RouterLink)
    app.component("router-view", RouterView)
  }
}

function createWebHashHistory() {
  function bindEvents(fn) {
    window.addEventListener('hashchange', fn)
  }

  return {
    bindEvents,
    url: window.location.hash.slice(1) || '/'
  }
}

function createRouter(options) {
  return new Router(options)
}

function useRouter() {
  return inject(ROUTER_KEY)
}

export { createRouter, createWebHashHistory, useRouter }