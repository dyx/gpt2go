<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import BasicMenuItem from '@/components/BasicMenuItem.vue'
import { getMenus } from '@/config'

const router = useRouter()
const currentRoutePath = ref(router.currentRoute.value.path)
const menuDataRef = ref(getMenus())

watch(
  () => router.currentRoute.value.path,
  routePath => {
    currentRoutePath.value = routePath
  }
)

menuDataRef.value = getMenus()
</script>

<template>
  <el-container class="layout">
    <el-aside class="aside-panel" width="var(--aside-width)">
      <el-menu router unique-opened :collapse-transition="false" :default-active="currentRoutePath" class="menu">
        <basic-menu-item v-for="item in menuDataRef" :key="item.code" :data="item"></basic-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="main-panel">
      <router-view />
    </el-main>
  </el-container>
</template>

<style scoped>
.layout {
  --el-menu-hover-bg-color: rgb(42, 43, 50);
  --el-menu-text-color: #ffffff;
  --el-menu-active-color: #ffffff;
  --menu-bg-color: rgb(32, 33, 35);
  --menu-active-bg-color: rgb(52, 53, 65);
}
.aside-panel {
}
.menu {
  height: calc(100vh);
  border: 0;
  background: var(--menu-bg-color);
}
:deep(.el-menu-item.is-active) {
  background-color: var(--menu-active-bg-color);
}
.menu:not(.el-menu--collapse) {
  width: var(--aside-width);
}
.main-panel {
  --el-main-padding: 0;
}
</style>
