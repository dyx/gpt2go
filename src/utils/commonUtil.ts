import { ChatCompletionRequestMessageRoleEnum } from 'openai/api'
import { setSetting } from '@/store'
import { I18nLanguage, ThemeModeEnum } from '@/model/commonConstant'
import i18n, { DEFAULT_LANG } from '@/i18n'

export function downloadFile(url: string, filename: string) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function str2ChatCompletionRequestMessageRoleEnum(str: string) {
  if (str === 'system') {
    return ChatCompletionRequestMessageRoleEnum.System
  } else if (str === 'user') {
    return ChatCompletionRequestMessageRoleEnum.User
  } else if (str === 'assistant') {
    return ChatCompletionRequestMessageRoleEnum.Assistant
  }
  return ChatCompletionRequestMessageRoleEnum.User
}

export function generateCopyButton(codeContent: string) {
  const panelElement = document.createElement('div')
  panelElement.className = 'button-panel'

  const copyButtonElement = document.createElement('div')
  copyButtonElement.innerText = 'copy'
  copyButtonElement.className = 'copy-button'
  panelElement.append(copyButtonElement)

  const copiedButtonElement = document.createElement('div')
  copiedButtonElement.innerText = 'copied'
  copiedButtonElement.className = 'copied-button'
  copiedButtonElement.style.display = 'none'
  panelElement.append(copiedButtonElement)

  copyButtonElement.addEventListener('click', function (e) {
    const copiedButton = (e.target as HTMLDivElement).nextElementSibling as HTMLDivElement
    copiedButton.style.display = ''
    navigator.clipboard.writeText(codeContent)
    setTimeout(() => {
      copiedButton.style.display = 'none'
    }, 2500)
  })
  return panelElement
}

export function changeThemeMode(value: string) {
  let themeClassName = value === ThemeModeEnum.DARK ? ThemeModeEnum.DARK : ''
  if (value === ThemeModeEnum.SYSTEM) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    themeClassName = mediaQuery.matches ? ThemeModeEnum.DARK : ''
  }
  const element = document.documentElement
  element.setAttribute('class', themeClassName)
  setSetting({ themeMode: value })
}

export function navigatorLang2i18nLang(value: string) {
  let locale = DEFAULT_LANG
  if (value) {
    value = value.toLowerCase()
    if (value.indexOf('en') >= 0) {
      locale = I18nLanguage.ENUS
    } else if (value.indexOf('zh') >= 0) {
      if (value === 'zh' || value.indexOf(I18nLanguage.ZHCN) >= 0) {
        locale = I18nLanguage.ZHCN
      } else {
        locale = I18nLanguage.ZHHK
      }
    }
  }
  return locale
}

export function isArrayEmpty<T>(arr: T[] | null | undefined): boolean {
  return !arr || arr.length === 0
}

export function isObjectEmpty(obj: Record<string, any> | null | undefined): boolean {
  return !obj || Object.keys(obj).length === 0
}
