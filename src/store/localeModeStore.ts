import { defineStore } from 'pinia'
import i18n from '@/i18n'
import { setSetting } from '@/store/index'

export const useLocaleModeStore = defineStore('localMode', {
  state: () => ({
    localeMode: ''
  }),
  getters: {},
  actions: {
    changeLocaleMode(mode: string) {
      i18n.global.locale.value = mode
      this.localeMode = mode
      setSetting({ localeMode: mode })
    }
  }
})
