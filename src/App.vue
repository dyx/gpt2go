<script setup lang="ts">
import { getChatSetting, getSetting, setChatSetting, setSetting } from '@/store'
import { changeThemeMode, isObjectEmpty, navigatorLang2i18nLang } from '@/utils/commonUtil'
import { GptModelEnum, ThemeModeEnum } from '@/model/commonConstant'
import I18nConfigProvider from '@/components/I18nConfigProvider.vue'
import { useLocaleModeStore } from '@/store/localeModeStore'

const initStorage = () => {
  const chatSettingModel = getChatSetting()
  if (isObjectEmpty(chatSettingModel)) {
    setChatSetting({ isIncludeContext: false, temperature: 1, model: GptModelEnum.GPT_35_TURBO })
  } else {
    // Compatibility v1.1.0 add model
    if (!chatSettingModel.model) {
      setChatSetting({
        isIncludeContext: chatSettingModel.isIncludeContext,
        temperature: chatSettingModel.temperature,
        model: GptModelEnum.GPT_35_TURBO
      })
    }
  }

  const settingModel = getSetting()
  if (isObjectEmpty(settingModel)) {
    const navigatorLang = navigator.languages ? navigator.languages[0] : navigator.language
    setSetting({ themeMode: ThemeModeEnum.SYSTEM, localeMode: navigatorLang2i18nLang(navigatorLang) })
  }
}
const handleThemeModeChange = (e: any) => {
  if (settingModel.themeMode === ThemeModeEnum.SYSTEM) {
    const element = document.documentElement
    element.setAttribute('class', (e as MediaQueryList).matches ? ThemeModeEnum.DARK : '')
  }
}

initStorage()

const settingModel = getSetting()
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
if (mediaQuery.addEventListener) {
  mediaQuery.addEventListener('change', handleThemeModeChange)
} else {
  // Compatible with Safari browser
  mediaQuery.addListener(handleThemeModeChange)
}
changeThemeMode(settingModel.themeMode as string)
useLocaleModeStore().changeLocaleMode(settingModel.localeMode as string)
</script>

<template>
  <I18nConfigProvider>
    <template #default>
      <router-view />
    </template>
  </I18nConfigProvider>
</template>

<style scoped></style>
