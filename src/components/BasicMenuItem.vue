<script setup lang="ts">
import BasicMenuItem from './BasicMenuItem.vue'
import type { MenuItemModel } from '@/model/commonModel'

defineProps<{
  data: MenuItemModel
}>()
</script>

<template>
  <el-sub-menu v-if="data.children && data.children.length > 0" :index="data.code">
    <template #title>
      <el-icon v-if="data.icon">
        <Component :is="data.icon" />
      </el-icon>
      <span>{{ data.name }}</span>
    </template>
    <basic-menu-item v-for="item in data.children" :key="item.code" :data="item" />
  </el-sub-menu>

  <el-menu-item v-else :key="data.code" :index="data.path">
    <el-icon>
      <component :is="data.icon" />
    </el-icon>
    <template #title>{{ data.name }}</template>
  </el-menu-item>
</template>

<style scoped></style>
