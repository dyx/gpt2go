import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'highlight.js/styles/github-dark.css'
import './styles/index.scss'
import hljs from 'highlight.js'
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

app
  .use(router)
  .use(ElementPlus, {
    locale: zhCn
  })
  .mount('#app')
