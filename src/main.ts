import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'highlight.js/styles/github-dark.css'
import './styles/index.scss'
import hljs from 'highlight.js'
import i18n from './i18n'
import { generateCopyButton } from '@/utils/commonUtil'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.directive('marked', function (el) {
  el.className = `${el.className ? el.className + ' ' : ''}marked-panel`
  const codeElements = el.querySelectorAll('pre code')
  codeElements.forEach((codeElement: any) => {
    codeElement.parentNode.style.position = 'relative'
    codeElement.parentNode.insertBefore(generateCopyButton(codeElement.textContent), codeElement.nextSibling)
    hljs.highlightElement(codeElement)
  })
})

app.use(router).use(createPinia()).use(ElementPlus).use(i18n).mount('#app')
