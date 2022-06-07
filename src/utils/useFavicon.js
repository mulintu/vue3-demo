import { ref, watch } from 'vue'

//在loading状态下修改浏览器的小图标
export default function useFavicon(newIcon) {
  const favicon = ref(newIcon)
  const updateIcon = (icon) => {
    document.head.querySelectorAll(`link[rel*="icon"]`)
    .forEach(el=>el.href=`${icon}`)
  }

  const reset = ()=>favicon.value='/favicon.ico'

  watch(favicon, (i) => {
    updateIcon(i)
  })

  return {favicon, reset}

}