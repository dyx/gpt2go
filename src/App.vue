<script setup lang="ts">
import { getChatSetting, setChatSetting } from '@/store'

const chatSettingModel = getChatSetting()
if (!chatSettingModel) {
  setChatSetting({ isIncludeContext: false, temperature: 1 })
}
</script>

<template>
  <router-view />
</template>

<style scoped></style>
