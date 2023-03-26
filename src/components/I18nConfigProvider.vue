<script setup lang="ts">
import { computed } from 'vue'
import { elementZhCn, elementZhTw, elementEn } from '@/i18n/i18nResources'
import { I18nLanguage } from '@/model/commonConstant'
import { getSetting } from '@/store'

const settingModel = getSetting()
const elementPlusLocale = computed(() => {
  let value
  if (settingModel.localeMode === I18nLanguage.ZHCN) {
    value = elementZhCn
  } else if (settingModel.localeMode === I18nLanguage.ZHHK) {
    value = elementZhTw
  } else if (settingModel.localeMode === I18nLanguage.ENUS) {
    value = elementEn
  }
  return value
})
</script>

<template>
  <el-config-provider :locale="elementPlusLocale">
    <slot></slot>
  </el-config-provider>
</template>

<style scoped></style>
