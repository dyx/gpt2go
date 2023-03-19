<script setup lang="ts">
import { getChatSetting, setChatSetting } from '@/store'

const chatSettingModel = getChatSetting()
if (!chatSettingModel) {
  setChatSetting({ isIncludeContext: false, temperature: 1, model: 'gpt-3.5-turbo' })
}
</script>

<template>
  <router-view />
</template>

<style scoped></style>
