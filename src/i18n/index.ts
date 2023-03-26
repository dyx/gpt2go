import { createI18n, I18nOptions } from 'vue-i18n'
import { zhCn, zhHk, enUs } from './i18nResources'
import { I18nLanguage } from '@/model/commonConstant'
export const DEFAULT_LANG = I18nLanguage.ZHCN
export const locales = [
  {
    value: I18nLanguage.ZHCN,
    label: '简体中文'
  },
  {
    value: I18nLanguage.ZHHK,
    label: '繁體中文'
  },
  {
    value: I18nLanguage.ENUS,
    label: 'English'
  }
]

const messages = (<{ [key: string]: any }>{}) as I18nOptions['messages']
// @ts-ignore
messages[I18nLanguage.ZHCN] = zhCn
// @ts-ignore
messages[I18nLanguage.ZHHK] = zhHk
// @ts-ignore
messages[I18nLanguage.ENUS] = enUs

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LANG,
  globalInjection: true,
  messages
})

export default i18n
